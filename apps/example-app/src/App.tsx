import CsvUpload from "csv-upload";
import { CSVSchema } from "types";


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
    //   {name: "Adjust", type: "boolean"}
    // ]
  };

  return (
    <div>
      <h1>CSV Upload Example</h1>
      {/* <CsvUpload schema={schema} /> */}
      <CsvUpload schema={schema}>
        <CsvUpload.AddCSVButton>
          Add csv
        </CsvUpload.AddCSVButton>
        <CsvUpload.ErrorCount/>
        <CsvUpload.Table />
      </CsvUpload>

    </div>
  );
}

export default App;
