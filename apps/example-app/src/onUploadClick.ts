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
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  useEffect(() => {
    socket.on("error", (data: CSVSocketError) => {

      const batchSize = Math.ceil(rowsLengthRef.current / batchNum)
      const currentStartIndex = uploadIndexRef.current * batchSize;
      if (data.startIndex < currentStartIndex) return; 

      const nextStartIndex = (uploadIndexRef.current + 1) * batchSize
      if (data.errors.length == 0 && nextStartIndex < rowsLengthRef.current)
      {
        uploadIndexRef.current += 1;
        setUploadNextBatch(true);
      }
      else
      {
        setUploading(false);
        setUploadSuccess(true);
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
    socket.emit("csv", data);
    if (endIndex == rows.length){
      setUploading(false);
      setUploadSuccess(true);
    } 

  }, [uploadNextBatch])

  
  const onUploadClick = (rows: string[][], lastChangedRow: number) => {
    if (uploading) return;
    setUploadSuccess(false);
    const batchSize = Math.ceil(rows.length / batchNum)
    setUploading(true);
    setRows(rows);
    rowsLengthRef.current = rows.length;
    uploadIndexRef.current = Math.floor(lastChangedRow / batchSize);
    setUploadNextBatch(true);

  }
  return {uploadSuccess, onUploadClick}
   
}

export default useUploadData;