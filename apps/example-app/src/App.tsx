import CsvUpload from "csv-upload";
import { CSVSchema, CSVFieldSchema } from "dsl-validator";
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
      { name: "Price", type: "number"},
      { name: "Adjust", type: "string", options: ["Y", "N"] }
    ],
    headers: true
  };

  const [errors, setErrors] = useState<CSVError[]>([])


  const { onUploadClick } = useUploadData(socket, 10, setErrors)

  return (
    <CsvUpload.Provider schema={schema} errors={errors} onUploadClick={onUploadClick}>
      <div className="p-6 space-y-6 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold">CSV Upload</h1>
        {/* Buttons */}
        <div className="flex gap-4">
          <CsvUpload.AddCSVButton
            classNames={{
              button: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded",
            }}
          >
            Add CSV
          </CsvUpload.AddCSVButton>

          <CsvUpload.UploadButton
            classNames={{
              root:
                "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-20"
            }}
          >
            Upload
          </CsvUpload.UploadButton>
        </div>

        {/* Error count & jump */}
        <div className="flex items-center gap-4">

          <CsvUpload.ErrorCount className={{ root: "text-red-600" }} />
          <CsvUpload.JumpToFirstError
            classNames={{
              button:
                "bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded"
            }}
          >
            Jump to error
          </CsvUpload.JumpToFirstError>
        </div>

        {/* Table */}
        <div className="overflow-auto rounded-lg border border-gray-300 shadow">
          <CsvUpload.Table
            classNames={{root: "w-full"}}
            headers={
              <CsvUpload.Header
                className={{
                  root: "bg-gray-100",
                  cell:
                    "px-4 py-2 font-semibold text-left border-b border-gray-300 text-sm"
                }}
              />
            }
          >
            <CsvUpload.Row classNames={{ root: "hover:bg-gray-50" }}>
              <CsvUpload.Cell
                classNames={{
                  root: "px-4 py-2 border-b border-gray-200 text-sm max-w-1",
                  rootError: "bg-red-200", 
                  input: "w-full",
                }}
              >
                <CsvUpload.ErrorMessage
                  classNames={{ root: "absolute bg-red-600 text-white text-xs px-2 py-1 rounded z-10" }}
                />
              </CsvUpload.Cell>
            </CsvUpload.Row>
          </CsvUpload.Table>
        </div>
      </div>
    </CsvUpload.Provider>




  );
}

export default App;