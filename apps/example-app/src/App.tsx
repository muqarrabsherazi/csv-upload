import CsvUpload from "csv-upload";
import { CSVSchema } from "types";


function App() {
  const schema: CSVSchema = {
    fields: [
      { name: "name", type: "string"},
      { name: "age", type: "number", required: true },
      { name: "Date of Birth", type:"date", required: true}
    ],
  };
  return (
    <div>
      <h1>CSV Upload Example</h1>
      {/* <CsvUpload schema={schema} /> */}
      <CsvUpload schema={schema}>
        <CsvUpload.AddCSVButton/>
        <CsvUpload.Table/>
      </CsvUpload>

    </div>
  );
}

export default App;
