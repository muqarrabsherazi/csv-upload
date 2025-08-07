import React, { FC, ComponentType } from "react";

// Components
import Table, { ColumnInterface, type TableProps } from "@components/Table";
import AddCSVButton, { type AddCSVButtonProps } from "@components/AddCSVButton";
import ErrorCount, { type ErrorCountProps } from "@components/ErrorCount";
import Row, { type RowProps } from "@components/__internal__/Row";
import Cell, {type CellProps} from "@components/Cell";
import DisplayCell, { type DisplayCellProps } from "@components/DisplayCell";
import InputCell, { type InputCellProps } from "@components/InputCell";
import Header, { type HeaderProps } from "@components/Header";
import ErrorMessage, { ErrorMessageProps } from "@components/ErrorMessage";
import RootProvider, {RootProviderProps} from "@components/RootProvider";
import JumpToFirstError, { JumpToFirstErrorProps } from "@components/JumpToFirstError";
import { CellContextInterface } from "@contexts/CellProvider";
import { RowContextInterface } from "@contexts/RowProvider";
import useCell from "@hooks/useCell";
import useRow from "@hooks/useRow";
import UploadButton, { type UploadButtonProps } from "@components/UploadButton";
import { TableContextInterface } from "@contexts/TableProvider";
import useTable from "@hooks/useTable";
import Column from "@components/Column/Column";


export interface CsvUploadComponent {
  Provider: FC<RootProviderProps> 
  Table: FC<TableProps>
  AddCSVButton: FC<AddCSVButtonProps>
  ErrorCount: FC<ErrorCountProps>
  ErrorMessage: FC<ErrorMessageProps>
  JumpToFirstError: FC<JumpToFirstErrorProps>
  Row: FC<RowProps>
  Column: FC<ColumnInterface>;
  Cell: FC<CellProps>
  Header: FC<HeaderProps>
  DisplayCell: FC<DisplayCellProps>
  InputCell: FC<InputCellProps>
  UploadButton: FC<UploadButtonProps>

  useCell: () => CellContextInterface
  useRow: () => RowContextInterface
  useTable: () => TableContextInterface

}

const CsvUpload: CsvUploadComponent = {
  Provider: RootProvider,  
  Table: Table,
  AddCSVButton: AddCSVButton,
  ErrorCount: ErrorCount,
  ErrorMessage: ErrorMessage,
  JumpToFirstError: JumpToFirstError, 
  Row: Row,
  Cell: Cell,
  Column: Column,
  DisplayCell: DisplayCell,
  InputCell: InputCell,
  UploadButton: UploadButton, 
  Header: Header,
  useCell: useCell, 
  useRow: useRow,
  useTable: useTable
}

export default CsvUpload;
