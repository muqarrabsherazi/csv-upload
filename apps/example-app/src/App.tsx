import CsvUpload from "csv-upload";
import { CSVSchema } from "dsl-validator";
import useUploadData from "./onUploadClick";
import { io } from "socket.io-client";
import { CSVError } from "types"
import { useEffect, useState } from "react";
const socket = io("http://localhost:4000");
import "./App.css"

function App() {
  const schema: CSVSchema = {
    fields: [
      { name: "Countries", type: "string" },
      { name: "Currency", type: "string"},
      { name: "Price", type: "number", allowWhiteSpaces: true },
      { name: "Adjust", type: "string", options: ["Y", "N"], required: true }
    ],
    headers: true
  };

  const [errors, setErrors] = useState<CSVError[]>([])


  const { uploadSuccess, onUploadClick } = useUploadData(socket, 10, setErrors)

  useEffect(() => { if (uploadSuccess) alert("csv uploaded successfully") }, [uploadSuccess])

  const {
    Provider,
    AddCSVButton,
    UploadButton,
    ErrorCount,
    JumpToFirstError,
    Table,
    Header,
    Row,
    Cell,
    ErrorMessage
  } = CsvUpload;

  return (
    <Provider schema={schema} errors={errors} onUploadClick={onUploadClick}>
      <div className="p-6 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold">CSV Upload</h1>
        {/* Buttons */}
        <div className="flex gap-4">
          <AddCSVButton
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded cursor-pointer"
          >
            Add CSV
          </AddCSVButton>

          <UploadButton
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-20 cursor-pointer"
          >
            Upload
          </UploadButton>
        </div>

        {/* Error count & jump */}
        <div className="flex items-center gap-4">

          <ErrorCount className="text-red-600" />
          <JumpToFirstError
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded cursor-pointer"
          >
            Jump to error
          </JumpToFirstError>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-lg border border-gray-300 shadow">
          <Table
            classNames={{ table: "w-full" }}
            headers={

              <Header
                classNames={{
                  row: "bg-gray-100",
                  cell: "px-4 py-2 font-semibold text-left border-b border-gray-300 text-sm"
                }}
              />
            }
          >
            <Row className="hover:bg-gray-50">
              <Cell
                classNames={{
                  cell: "border-b border-gray-200 text-sm max-w-1",
                  errorCell: "bg-red-200",
                  text: "mx-4 my-2",
                  input: "w-full h-full px-4 py-2",
                }}
              >
                <ErrorMessage
                  className="absolute bg-red-600 text-white text-xs px-2 py-1 rounded z-10"
                />
              </Cell>
            </Row>
          </Table>
        </div>
      </div>
    </Provider>


  );
}

export default App;