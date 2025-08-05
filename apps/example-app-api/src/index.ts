import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from "http"
import { CSVError, CSVSocketData } from 'types';
import { error } from 'console';

const app = express();
app.use(cors());
app.use(express.json());

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


io.on("connection", (socket) => {
  socket.on("csv", (data: CSVSocketData) => {
    console.log(data)
    socket.emit("error",
      {
        startIndex: data.startIndex,
        errors: backendErrors[0].coords.row < data.startIndex + data.batchSize ? backendErrors: []
        // errors: []
      })
  })

})


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 