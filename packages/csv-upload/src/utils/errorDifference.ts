import { CSVCellCoords, CSVError } from "types";
import coordsAreEqual from "./coordsAreEqual";

const isEqual = (a: CSVError, b: CSVError): boolean => {
  return a.msg == b.msg && coordsAreEqual(a.coords as CSVCellCoords, b.coords);
};

const errorDifference = (
  A: CSVError[],
  B: CSVError[]
): Record<string, any>[] => {
  return A.filter(a => !B.some(b => isEqual(a, b)));
};

export default errorDifference;