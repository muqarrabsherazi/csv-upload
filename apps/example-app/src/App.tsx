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
      {/* <CsvUpload schema={schema} /> */}
      <CsvUpload.Provider schema={schema}>
        <CsvUpload.AddCSVButton>
          Add csv
        </CsvUpload.AddCSVButton>
        <CsvUpload.ErrorCount />
        
        <CsvUpload.Table>
        {
          (row: string[], rowIndex: number) =>
            <CsvUpload.Row key={rowIndex} rowIndex={rowIndex} row={row}>
            {
              (cellData: CSVCellData) =>
                <CsvUpload.Cell key={cellData.key} {...cellData.props} >
                  <CsvUpload.ErrorMessage cellData={cellData}/>
                </CsvUpload.Cell>
                // <td key={cellData.key} 
                //   style={{background: cellData.props.coords.row % 2 === 0 ? "yellow": "white" }}
                // >{cellData.props.value}</td>
              // () => <td>hello world</td>
            }
            </CsvUpload.Row>
        }
        </CsvUpload.Table>
      </CsvUpload.Provider>



    </div>
  );
}

export default App;
