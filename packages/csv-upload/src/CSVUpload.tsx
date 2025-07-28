import React, { FC, ProviderProps, useState } from "react";
import { CSVSchema } from "types";
import Table, { type TableProps } from "@components/Table";
import { TableProvider } from "@contexts/TableProvider";
import AddCSVButton, { type AddCSVButtonProps } from "@components/AddCSVButton";
import ErrorCount, { type ErrorCountProps } from "@components/ErrorCount";
import { ErrorProvider } from "@contexts/ErrorProvider";
import Row, { type RowProps } from "@components/Row";
import Cell, { type CellProps } from "@components/Cell";
import DisplayCell, { type DisplayCellProps } from "@components/DisplayCell";
import InputCell, { type InputCellProps } from "@components/InputCell";
import Header, { type HeaderProps } from "@components/Header";
import ErrorMessage, { ErrorMessageProps } from "@components/ErrorMessage";
import RootProvider, {RootProviderProps} from "@components/RootProvider";




interface CsvUploadComponent {
  Provider: FC<RootProviderProps>
  Table: FC<TableProps>
  AddCSVButton: FC<AddCSVButtonProps>
  ErrorCount: FC<ErrorCountProps>
  ErrorMessage: FC<ErrorMessageProps>
  Row: FC<RowProps>
  Cell: FC<CellProps>
  Header: FC<HeaderProps>
  DisplayCell: FC<DisplayCellProps>
  InputCell: FC<InputCellProps>

}

/**
 * CsvUpload is a headless (logic-only) React component that:
 * 1. Accepts a CSV file from the user.
 * 2. Parses it into rows.
 * 3. Validates each cell against the provided schema.
 * 4. Exposes the parsed/validated data via the provided callbacks.
 *
 * NOTE: This is just a starting point for interns to build on – the heavy lifting is still TODO.
 */


const CsvUpload: CsvUploadComponent = {
  Provider: RootProvider,  
  Table: Table,
  AddCSVButton: AddCSVButton,
  ErrorCount: ErrorCount,
  ErrorMessage: ErrorMessage,
  Row: Row,
  Cell: Cell,
  DisplayCell: DisplayCell,
  InputCell: InputCell,
  Header: Header,
}


CsvUpload.Table = Table
CsvUpload.AddCSVButton = AddCSVButton
CsvUpload.ErrorCount = ErrorCount
CsvUpload.ErrorMessage = ErrorMessage
CsvUpload.Row = Row
CsvUpload.Cell = Cell
CsvUpload.DisplayCell = DisplayCell
CsvUpload.InputCell = InputCell
CsvUpload.Header = Header

export default CsvUpload;
