import { useTable } from "../contexts/TableProvider";

type Score = {delim: string, score: number}
const sum = (a: number, b: number) => a + b
const byScore = (a: Score, b: Score) => b.score - a.score

const getDelim = (lines: string[]): string => {
  const delimiters = [",", ";", "\t", "|"];
  const scores = delimiters.map(delim => ({
    delim, 
    score: lines.map(line => line.split(delim).length).reduce(sum, 0)
  }))

  return scores.sort(byScore)[0].delim
}


export const parseCSV = (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result as string;
      const lines = text.trim().split("\n");

      const delim = getDelim(lines.slice(0, 5))
      if (lines.length === 0) return resolve([]);

      const parsed = lines.map(line =>
        line.split(delim).map(cell => cell.trim())
      );

      resolve(parsed); 
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
};