import { parseCSV } from "@utils/parse";
import useTable from "@hooks/useTable";
import useValidate from "@hooks/useValidate";



const useParser = () => {
  const { schema, clearRows, setHeaders, addRow } = useTable();
  const {checkFrontendError: checkValidationError} = useValidate(); 

  const upload = async (file: File) => {
    const data = await parseCSV(file);
    if (data.length === 0) return;

    clearRows();
    if (schema.headers)
      setHeaders(data[0]);

    data.slice(schema.headers ? 1 : 0).forEach((row, rowIndex) => {
      row
        .slice(0, schema.fields.length)
        .forEach((cell, colIndex) => checkValidationError({row:rowIndex, col:colIndex}, cell)) 
      addRow(row.slice(0, schema.fields.length));
    });
  };

  return upload;
};


export default useParser; 