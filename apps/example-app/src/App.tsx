import CsvUpload from "csv-upload";
import { CSVSchema } from "types";

function App() {
  const schema: CSVSchema = {
    fields: [
      { name: "name", type: "string" },
      { name: "age", type: "number" },
    ],
  };
  return (
    <div>
      <h1>CSV Upload Example</h1>
      <CsvUpload schema={schema} />
    </div>
  );
}

export default App;
