import { useTable } from "../contexts/TableProvider";


//file oject is built in browser class that takes in file 
export const parseCSV = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.trim().split("\n");

      if (lines.length === 0) return resolve([]);

      const parsed = lines.map(line =>
        line.split(";").map(cell => cell.trim())
      );

      resolve(parsed); // ✅ Return the parsed array
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};