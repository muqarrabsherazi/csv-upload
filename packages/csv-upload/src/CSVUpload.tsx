import React, { FC, ComponentType } from "react";

// Components
import Table, { type TableProps } from "@components/Table";
import AddCSVButton, { type AddCSVButtonProps } from "@components/AddCSVButton";
import ErrorCount, { type ErrorCountProps } from "@components/ErrorCount";
import Row, { type RowProps } from "@components/Row";
import Cell, {type CellProps} from "@components/Cell";
import DisplayCell, { type DisplayCellProps } from "@components/DisplayCell";
import InputCell, { type InputCellProps } from "@components/InputCell";
import Header, { type HeaderProps } from "@components/Header";
import ErrorMessage, { ErrorMessageProps } from "@components/ErrorMessage";
import RootProvider, {RootProviderProps} from "@components/RootProvider";
import JumpToFirstError, { JumpToFirstErrorProps } from "@components/JumpToError";


export interface CsvUploadComponent {
  Provider: FC<RootProviderProps> 
  Table: FC<TableProps>
  AddCSVButton: FC<AddCSVButtonProps>
  ErrorCount: FC<ErrorCountProps>
  ErrorMessage: FC<ErrorMessageProps>
  JumpToFirstError: FC<JumpToFirstErrorProps>
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
  JumpToFirstError: JumpToFirstError, 
  Row: Row,
  Cell: Cell,
  DisplayCell: DisplayCell,
  InputCell: InputCell,
  Header: Header,
}

export default CsvUpload;
