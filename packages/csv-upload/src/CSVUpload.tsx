import React, {FC, useState } from "react";
import { CSVSchema } from "types";
import Table, {type TableProps} from "@components/Table";
import { TableProvider } from "@contexts/TableProvider";
import AddCSVButton, {type AddCSVButtonProps} from "@components/AddCSVButton";
import ErrorCount, {type ErrorCountProps} from "@components/ErrorCount";
import { ErrorProvider } from "@contexts/ErrorProvider";
import Row ,{type RowProps} from "@components/Row";
import Cell, { type CellProps } from "@components/Cell";
import DisplayCell, {type DisplayCellProps}  from "@components/DisplayCell";
import InputCell, { type InputCellProps } from "@components/InputCell";
import Header, { type HeaderProps } from "@components/Header";



export interface CsvUploadProps {
  schema: CSVSchema;
  onDataAccepted?: (rows: Record<string, unknown>[]) => void;
  children: React.ReactNode
}

interface CsvUploadComponent extends FC<CsvUploadProps> {
  Table: FC<TableProps>
  AddCSVButton: FC<AddCSVButtonProps>
  ErrorCount: FC<ErrorCountProps>
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


const CsvUpload: CsvUploadComponent = ({ children, schema, onDataAccepted}) => {

  // TODO: Implement CSV parsing, validation logic, and editable table UI.

  return (
    <TableProvider schema={schema}>
      <ErrorProvider>
        {children}
      </ErrorProvider>
    </TableProvider>
  );
};


CsvUpload.Table = Table 
CsvUpload.AddCSVButton = AddCSVButton
CsvUpload.ErrorCount = ErrorCount
CsvUpload.Row = Row
CsvUpload.Cell = Cell 
CsvUpload.DisplayCell = DisplayCell 
CsvUpload.InputCell = InputCell 
CsvUpload.Header = Header

export default CsvUpload;
