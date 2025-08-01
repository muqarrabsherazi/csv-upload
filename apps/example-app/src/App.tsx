import CsvUpload from "csv-upload";
import { CSVSchema} from "types";
import "../src/App.css"


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
<CsvUpload.Provider schema={schema} onUploadClick={(rows) => {}}>
  <div className="p-6 space-y-6 bg-white rounded-lg shadow">
    <h1 className="text-4xl font-bold">CSV Upload</h1>
    {/* Buttons */}
    <div className="flex gap-4">
      <CsvUpload.AddCSVButton
        classNames={{
          button: "bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded",
          input: "hidden"
        }}
      >
        Add CSV
      </CsvUpload.AddCSVButton>

      <CsvUpload.UploadButton
        classNames={{
          button:
            "bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-20"
        }}
      >
        Upload
      </CsvUpload.UploadButton>
    </div>

    {/* Error count & jump */}
    <div className="flex items-center gap-4">

  <CsvUpload.ErrorCount className={{root:"text-red-600" }}/>
        <CsvUpload.JumpToFirstError
          classNames={{
            button:
              "bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded"
          }}
        >
          Jump to validation error
        </CsvUpload.JumpToFirstError>
    </div>

    {/* Table */}
    <div className="overflow-auto rounded-lg border border-gray-300 shadow">
      <CsvUpload.Table
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
              root: "px-4 py-2 border-b border-gray-200 text-sm",
              rootError: "bg-red-200"
            }}
          >
            <CsvUpload.ErrorMessage
              classNames={{ root: "text-red-500 text-xs mt-1" }}
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