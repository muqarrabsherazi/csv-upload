import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import http from "http"

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (_req, res) => {
  res.json({ message: 'API is up!' });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL
    methods: ["GET", "POST"]
  }
})


io.on("connection",(socket) =>  {

  socket.on("csv", (data) => {
    console.log(data)
  })
})


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 