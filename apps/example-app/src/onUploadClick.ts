import { io, type Socket} from "socket.io-client"

const onUploadClick = (rows: string[][], socket: Socket, chunkNum: number) => {
  const chunkLength = Math.ceil(rows.length / chunkNum)
  console.log(rows.length)

  Array.from({length: chunkNum}).forEach((_, chunk) => {
    const startIndex = chunk * chunkLength; 
    const endIndex = Math.min((chunk + 1) * chunkLength, rows.length);
    console.log(rows.slice(startIndex, endIndex))
    socket.emit("csv", rows.slice(startIndex, endIndex));
  })
}

export default onUploadClick;