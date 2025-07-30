import { Coords } from "types"

const deserializeCoords = (key: string): Coords =>
{
  const keys = key.split(":")
  return {
    row: Number(keys[0]), 
    col: Number(keys[1])
  }

} 
export default deserializeCoords; 