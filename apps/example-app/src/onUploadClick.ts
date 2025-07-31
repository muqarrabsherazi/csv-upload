import { useEffect, useRef, useState } from "react"
import { io, type Socket} from "socket.io-client"
import { CSVError, CSVSocketError } from "types";

const useUploadData = (
  socket: Socket, 
  batchNum: number, 
  setErrors: (error: CSVError[]) => void

) => {
  const [rows, setRows] = useState<string[][]>([]);
  const rowsLengthRef = useRef<number>(0);
  const uploadIndexRef = useRef<number>(0);
  const [uploadNextBatch, setUploadNextBatch] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    socket.on("error", (data: CSVSocketError) => {

      const batchSize = Math.ceil(rowsLengthRef.current / batchNum)
      if (data.startIndex < uploadIndexRef.current * batchSize) return; 

      const nextStartIndex = (uploadIndexRef.current + 1) * batchSize
      if (data.errors.length == 0 && nextStartIndex < rowsLengthRef.current)
      {
        uploadIndexRef.current += 1;
        setUploadNextBatch(true);
      }
      else
      {
        setUploading(false);
      }
      setErrors(data.errors);
    })
  }, [])

  useEffect(() => {
    if (!uploadNextBatch) return; 
    setUploadNextBatch(false);
    const batchSize = Math.ceil(rows.length / batchNum)
    const startIndex = uploadIndexRef.current * batchSize; 
    const endIndex = Math.min((uploadIndexRef.current + 1) * batchSize, rows.length);
    const data = {
      batchSize: batchSize, 
      startIndex: startIndex, 
      rows: rows.slice(startIndex, endIndex)
    }
    console.log(data)
    socket.emit("csv", data);
    if (endIndex == rows.length) setUploading(false);

  }, [uploadNextBatch])

  
  const onUploadClick = (rows: string[][], lastChangedRow: number) => {
    console.log(lastChangedRow);
    if (uploading) return;
    const batchSize = Math.ceil(rows.length / batchNum)
    setUploading(true);
    setRows(rows);
    rowsLengthRef.current = rows.length;
    uploadIndexRef.current = Math.floor(lastChangedRow / batchSize);
    console.log(uploadIndexRef.current);
    setUploadNextBatch(true);

  }
  return {onUploadClick}
   
}

export default useUploadData;