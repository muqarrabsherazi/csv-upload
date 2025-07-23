import { FC } from "react"
import serializeCoords from "@utils/serializeCoords"
import isInputCell from "@utils/isInputCell";
import { useTable } from "@contexts/TableProvider";
import { useErrors } from "@contexts/ErrorProvider";
import type { CSVCellData } from "types";
import Cell from "@components/Cell";

export interface RowProps {
  rowIndex: number,
  row: string[]
  children?: (data: CSVCellData[]) => React.ReactNode;
}

const Row: FC<RowProps> = ({ rowIndex, row, children }) => {

  const { inputCellCoords } = useTable();
  const { errors } = useErrors();


  const data: CSVCellData[] = row.map((value, colIndex) => {
    const coords = { row: rowIndex, col: colIndex };
    const errorMsg = errors[serializeCoords(coords)] || null;
    const key = serializeCoords(coords);
    const type = isInputCell(inputCellCoords, coords) ? "input" : "display"

    return {
      props: {
        coords: coords,
        value: value,
        errorMsg: errorMsg,
        type: type
      },
      key: key,
    }
  })

  
  if (children)
    return (
      <tr>
        {children(data)}
      </tr>
    )

  return (
    <tr>
      {data.map((cellData) => <Cell key={cellData.key} {...cellData.props}/>)}
    </tr>
  )
}

export default Row;
