import CsvUpload from "csv-upload";
import { CSVSchema } from "dsl-validator";
import useUploadData from "./onUploadClick";
import { io } from "socket.io-client";
import { CSVError } from "types"
import { useState } from "react";
const socket = io("http://localhost:4000");
import "./App.css"

function App() {
  const schema: CSVSchema = {
    fields: [
      { name: "Countries", type: "string" },
      { name: "Currency", type: "string" },
      { name: "Price", type: "number", allowWhiteSpaces: true, min: 10 },
      { name: "Adjust", type: "string", options: ["Y", "N"], required: true }
    ],
    headers: true
  };

  const [errors, setErrors] = useState<CSVError[]>([])
  const { onUploadClick } = useUploadData(socket, 10, setErrors)

  const {
    Provider,
    AddCSVButton,
    UploadButton,
    ErrorCount,
    JumpToFirstError,
    Table,
    Row,
    Cell,
    ErrorMessage
  } = CsvUpload;

  return (
    <Provider schema={schema} errors={errors} onUploadClick={onUploadClick}>
      <AddCSVButton> Add CSV </AddCSVButton>
      <UploadButton> Upload </UploadButton>
      <ErrorCount />
      <JumpToFirstError> Jump to error </JumpToFirstError>


      {/* <Table></Table> */}
      <Table>
        {
          (rows) => {
            <Row data={row}></Row>
          }

        }
      </Table>
    </Provider>


  );
}

export default App;