import { Coords } from "types";

const serializeCoords = (coords: Coords): string => `${coords.row}:${coords.col}`;
export default serializeCoords;