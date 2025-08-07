import CsvUpload from "csv-upload";
import { CSVSchema } from "dsl-validator";
import useUploadData from "./onUploadClick";
import { io } from "socket.io-client";
import { CSVError } from "types"
import { useState } from "react";
const socket = io("http://localhost:4000");
import "./App.css"
import { Column } from "csv-upload/src/components/Table";

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
    Header,
    ErrorMessage
  } = CsvUpload;

  const columns: Column[] = schema.fields.map((field) => ({
    name: field.name,
    renderHeader: <Header />,
    renderCell: <Cell/>,
    renderErrorBox: <ErrorMessage />
  }))

  return (
    <Provider schema={schema} errors={errors} onUploadClick={onUploadClick}>
      <AddCSVButton> Add CSV </AddCSVButton>
      <UploadButton> Upload </UploadButton>
      <ErrorCount />
      <JumpToFirstError> Jump to error </JumpToFirstError>

      <Table columns={columns}/>
    </Provider>


  );
}

export default App;