import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from "http"
import { CSVError } from 'types';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const csvFilePath = path.join(__dirname, 'full_dataset.csv');

// Ensures the file exists
if (!fs.existsSync(csvFilePath)) {
  fs.writeFileSync(csvFilePath, '', 'utf-8');
}

function loadExistingRows(): string[][] {
  const content = fs.readFileSync(csvFilePath, 'utf-8').trim();
  if (!content) return [];
  return content.split('\n').map(line => line.split(','));
}

function saveRows(rows: string[][]) {
  const content = rows.map(row => row.join(',')).join('\n');
  fs.writeFileSync(csvFilePath, content, 'utf-8');
}

function updateCSVFile(startIndex: number, incomingRows: string[][]) {
  const existing = loadExistingRows();

  const updated = existing.slice(0, startIndex);

  for (const row of incomingRows) {
    updated.push(row);
  }

  saveRows(updated);
}

const backendErrors: CSVError[] = [
  {
    coords: { row: 40, col: 2 },
    msg: "hi from backend",
    type: "backend"
  }
]

app.get('/', (req, res) => {
  res.json({ message: 'API is up!' });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"]
  }
})


io.on('connection', (socket) => {
  socket.on('csv', (data) => {
    const { startIndex, batchSize, rows } = data;

    const relevantErrors = backendErrors.filter(e =>
      e.coords.row >= startIndex &&
      e.coords.row < startIndex + batchSize
    );
    // const relevantErrors: CSVError[] = []; 
    if (relevantErrors.length == 0)
      updateCSVFile(startIndex, rows);

    socket.emit('error', {
      startIndex,
      errors: relevantErrors
    });
  });
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 