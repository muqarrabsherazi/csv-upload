import CsvUpload from "csv-upload";
import { CSVSchema } from "dsl-validator";
import useUploadData from "./onUploadClick";
import { io } from "socket.io-client";
import { CSVError } from "types"
import { useState } from "react";
const socket = io("http://localhost:4000");
import "./App.css"
import { Components } from "csv-upload/src/components/Table";
import Header from "csv-upload/src/components/Header";
import ErrorMessage from "csv-upload/src/components/ErrorMessage";

function App() {
  const schema: CSVSchema = {
    fields: [
      { name: "Countries", type: "string" },
      { name: "Currency", type: "string" },
      { name: "Price", type: "number" },
      { name: "Adjust", type: "string", options: ["Y", "N"] }
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
  } = CsvUpload;

  const components: Components = {
    cell: <Cell/>,
    header: <Header/>,
    errorBox: <ErrorMessage/>
  }

  return (
    <Provider schema={schema} errors={errors} onUploadClick={onUploadClick}>
      <AddCSVButton> Add CSV </AddCSVButton>
      <UploadButton> Upload </UploadButton>
      <ErrorCount />
      <JumpToFirstError> Jump to error </JumpToFirstError>

      <Table components={components}/>
    </Provider>


  );
}

export default App;