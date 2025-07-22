import { useTable } from "@contexts/TableProvider";
import { parseCSV } from "@utils/parse";



const useCSVUpload = () => {
  const { clearRows, setHeaders, addRow } = useTable();

  const upload = async (file: File) => {
    const data = await parseCSV(file);
    if (data.length === 0) return;

    clearRows();
    setHeaders(data[0]);
    data.slice(1).forEach(addRow);
  };

  return upload;
};


export default useCSVUpload; 