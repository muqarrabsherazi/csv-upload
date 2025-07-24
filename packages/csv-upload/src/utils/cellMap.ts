import InputCell from "@components/InputCell"
import type { FC } from "react"
import { CSVCellType } from "types"
import DisplayCell from "@components/DisplayCell"
import { CellProps } from "@components/Cell"


const cellMap: Record<CSVCellType, FC<CellProps>> = {
  "display": DisplayCell,
  "input": InputCell
}

export default cellMap; 