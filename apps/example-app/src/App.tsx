import CsvUpload from "csv-upload";
import { CSVSchema, CSVCellData } from "types";


function App() {
  const schema: CSVSchema = {
    fields: [
      { name: "name", type: "string" },
      // { name: "Date of Birth", type: "date", required: true },
      { name: "age", type: "number", required: true },

    ],
    // fields: [
    //   {name: "Countries", type: "string"}, 
    //   {name: "Currency", type: "string"}, 
    //   {name: "Price", type: "number"}, 
    //   {name: "Adjust", type: "boolean", required: true}
    // ]
  };

    return (
    <div>
      <h1>CSV Upload Example</h1>
      <CsvUpload.Provider schema={schema}>
        <CsvUpload.AddCSVButton>
        </CsvUpload.AddCSVButton>
        <CsvUpload.ErrorCount />
        <CsvUpload.Table renderHeaders={<CsvUpload.Header/>}>
          <CsvUpload.Row>
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