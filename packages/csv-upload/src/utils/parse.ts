import Papa from "papaparse";

export const parseCSV = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    Papa.parse<string[]>(file, {
      skipEmptyLines: true,
      dynamicTyping: true,
      delimitersToGuess: [",", ";", "\t", "|"],
      // Removed delimiter: "" to enable proper auto-detection

      complete: (result) => {
        const rows = result.data.map(row => {
          // Handle single-column arrays safely
          if (Array.isArray(row)) {
            return row.map(cell => String(cell).trim());
          } else {
            // Fallback for object rows (if headers enabled)
            return Object.values(row).map(cell => String(cell).trim());
          }
        });
        resolve(rows);
      },
      error: (error) => reject(error),
    });
  });
};