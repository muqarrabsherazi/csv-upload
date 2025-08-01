import { CSVCellCoords } from "types";

const serializeCoords = (coords: CSVCellCoords): string => `${coords.row}:${coords.col}`;
export default serializeCoords;