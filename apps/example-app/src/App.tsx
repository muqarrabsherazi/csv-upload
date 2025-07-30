import CsvUpload from "csv-upload";
import { CSVSchema} from "dsl-validator";
import onUploadClick from "./onUploadClick";
import { io } from "socket.io-client";
import { CSVError } from "types"
import { useEffect, useState } from "react";
const socket = io("http://localhost:4000");

function App() {
  const schema: CSVSchema = {
    fields: [
      {name: "Countries", type: "string"}, 
      {name: "Currency", type: "string"}, 
      {name: "Price", type: "number"}, 
      {name: "Adjust", type: "boolean", required : true}
    ]
  };
  const [errors, setErrors] = useState<CSVError[]>([])
  const [pauseStream, setPauseStream] = useState<boolean>(false);

  useEffect(() => {socket.on("error", 
    (error) => {
      setErrors(error)
      setPauseStream(true);
    })}, [])

  const onErrorResove = () => setPauseStream(false);
  

    return (
    <div>
      <h1>CSV Upload Example</h1>

      <CsvUpload.Provider 
        schema={schema} 
        errors={errors} 
        onUploadClick={(rows) => onUploadClick(rows, socket, 10, pauseStream)}
        onErrorResolve={onErrorResove} 
        >

        <CsvUpload.AddCSVButton>
          Add csv
        </CsvUpload.AddCSVButton >
        <CsvUpload.ErrorCount />
        <CsvUpload.JumpToFirstError>
          Jump to validation error 
        </CsvUpload.JumpToFirstError>


        <CsvUpload.UploadButton>
          Upload to server 
        </CsvUpload.UploadButton>

        <CsvUpload.Table headers={<CsvUpload.Header/>}>
          <CsvUpload.Row >
            <CsvUpload.Cell>
              <CsvUpload.ErrorMessage />
            </CsvUpload.Cell>
          </CsvUpload.Row>
        </CsvUpload.Table>

      </CsvUpload.Provider>



    </div>
  );
}

export default App;