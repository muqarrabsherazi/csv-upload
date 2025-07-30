import CsvUpload from "csv-upload";
import { CSVSchema} from "dsl-validator";
import onUploadClick from "./onUploadClick";
import { io } from "socket.io-client";
import {} from "types"
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

  

    return (
    <div>
      <h1>CSV Upload Example</h1>

      <CsvUpload.Provider schema={schema} onUploadClick={(rows) => onUploadClick(rows, socket, 10)}>
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