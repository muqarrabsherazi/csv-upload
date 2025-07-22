import Papa from "papaparse";

export const parseCSV = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      dynamicTyping: true,
      delimitersToGuess: [",", ";", "\t", "|"],
      complete: (result) => {
        if (result.errors.length > 0) {
          reject(result.errors);
        } else {
          const rows = result.data.map(row =>
            Object.values(row).map(cell => String(cell).trim())
          );
          resolve(rows);
        }
      },
      error: (error) => reject(error),
    });
  });
};
