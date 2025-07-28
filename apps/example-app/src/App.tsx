import CsvUpload from "csv-upload";
import { CSVSchema, CSVCellData } from "types";


function App() {
  const schema: CSVSchema = {
    // fields: [
    //   { name: "name", type: "string" },
    //   // { name: "Date of Birth", type: "date", required: true },
    //   { name: "age", type: "number", required: true },

    // ],
    fields: [
      {name: "Countries", type: "string"}, 
      {name: "Currency", type: "string"}, 
      {name: "Price", type: "number"}, 
      {name: "Adjust", type: "boolean", required: true}
    ]
  };

    return (
    <div>
      <h1>CSV Upload Example</h1>
<<<<<<< HEAD
      {/* <CsvUpload schema={schema} /> */}
      <CsvUpload.Provider schema={schema}>
        <CsvUpload.AddCSVButton>
          Add csv
        </CsvUpload.AddCSVButton>
=======

      <CsvUpload schema={schema}>
        <CsvUpload.AddCSVButton>Add CSV</CsvUpload.AddCSVButton>
>>>>>>> d5a7c30 (used context to refactor the code)
        <CsvUpload.ErrorCount />

        <CsvUpload.Table>
          <CsvUpload.Row>
            <CsvUpload.Cell>
              <CsvUpload.ErrorMessage />
            </CsvUpload.Cell>
          </CsvUpload.Row>
        </CsvUpload.Table>
<<<<<<< HEAD
      </CsvUpload.Provider>



=======
      </CsvUpload>
>>>>>>> d5a7c30 (used context to refactor the code)
    </div>
  );
}

export default App;