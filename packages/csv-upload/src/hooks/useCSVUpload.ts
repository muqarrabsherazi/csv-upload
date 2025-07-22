import { useTable } from "@contexts/TableProvider";
import { parseCSV } from "@utils/parse";
import useValidate from "./useValidate";



const useCSVUpload = () => {
  const { clearRows, setHeaders, addRow } = useTable();
  const {checkValidationError} = useValidate(); 

  const upload = async (file: File) => {
    const data = await parseCSV(file);
    if (data.length === 0) return;

    clearRows();
    setHeaders(data[0]);

    data.slice(1).forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => checkValidationError({row: rowIndex, col:colIndex}, cell)) 
      addRow(row);
    });
  };

  return upload;
};


export default useCSVUpload; 