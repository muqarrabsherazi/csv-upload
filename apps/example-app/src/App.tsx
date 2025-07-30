import CsvUpload from "csv-upload";
import { CSVSchema} from "types";


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

      <CsvUpload.Provider schema={schema} onUploadClick={(rows) => {}}>
        <CsvUpload.AddCSVButton>
          Add csv
        </CsvUpload.AddCSVButton >
        <CsvUpload.ErrorCount />
        <CsvUpload.JumpToFirstError>
          Jump to validation error 
        </CsvUpload.JumpToFirstError>

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