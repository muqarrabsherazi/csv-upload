import { FC, useMemo } from "react"
import serializeCoords from "@utils/serializeCoords"
import coordsAreEqual from "@utils/isInputCell";
import { useTable } from "@contexts/TableProvider";
import { useErrors } from "@contexts/ErrorProvider";
import type { CSVCellData } from "types";
import Cell from "@components/Cell";
import { useRow } from "@contexts/RowProvider";

export interface RowProps {
  children?: (data: CSVCellData, colIndex: number) => React.ReactNode;
  className?: {
    root?: string
  }
}

const Row: FC<RowProps> = ({className,  children }) => {

  const { inputCellCoords } = useTable();
  const { errors } = useErrors();
  const {rowIndex, row} = useRow();


  const data: CSVCellData[] = row.map((value, colIndex) => {
    const coords = { row: rowIndex, col: colIndex };
    const errorMsg = errors[serializeCoords(coords)] || null;
    const key = serializeCoords(coords);
    const type = coordsAreEqual(inputCellCoords, coords) ? "input" : "display"

    return {
      props: {
        coords,
        value,
        errorMsg,
        type
      },
      key: key,
    }
  })

  
  if (children)
    return (
      <tr className={className?.root?? ""}>
        {data.map((cellData, colIndex) => children(cellData, colIndex))}
      </tr>
    )

  return (
    <tr>
      {data.map((cellData) => <Cell key={cellData.key} {...cellData.props}/>)}
    </tr>
  )
}

export default Row;
