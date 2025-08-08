import { FC} from "react";

// Components
import Table, { type TableProps } from "@components/Table";
import AddCSVButton, { type AddCSVButtonProps } from "@components/AddCSVButton";
import ErrorCount, { type ErrorCountProps } from "@components/ErrorCount";
import Cell, {type CellProps} from "@components/Cell";
import DisplayCell, { type DisplayCellProps } from "@components/DisplayCell";
import InputCell, { type InputCellProps } from "@components/InputCell";
import Header, { type HeaderProps } from "@components/Header";
import ErrorMessage, { ErrorMessageProps } from "@components/ErrorMessage";
import RootProvider, {RootProviderProps} from "@components/RootProvider";
import JumpToFirstError, { JumpToFirstErrorProps } from "@components/JumpToFirstError";
import { CellContextInterface } from "@contexts/CellProvider";
import useCell from "@hooks/useCell";
import UploadButton, { type UploadButtonProps } from "@components/UploadButton";
import { TableContextInterface } from "@contexts/TableProvider";
import useTable from "@hooks/useTable";


export interface CsvUploadComponent {
  Provider: FC<RootProviderProps> 
  Table: FC<TableProps>
  AddCSVButton: FC<AddCSVButtonProps>
  ErrorCount: FC<ErrorCountProps>
  ErrorMessage: FC<ErrorMessageProps>
  JumpToFirstError: FC<JumpToFirstErrorProps>
  Cell: FC<CellProps>
  Header: FC<HeaderProps>
  DisplayCell: FC<DisplayCellProps>
  InputCell: FC<InputCellProps>
  UploadButton: FC<UploadButtonProps>
  useCell: () => CellContextInterface
  useTable: () => TableContextInterface

}

const CsvUpload: CsvUploadComponent = {
  Provider: RootProvider,  
  Table: Table,
  AddCSVButton: AddCSVButton,
  ErrorCount: ErrorCount,
  ErrorMessage: ErrorMessage,
  JumpToFirstError: JumpToFirstError, 
  Cell: Cell,
  DisplayCell: DisplayCell,
  InputCell: InputCell,
  UploadButton: UploadButton, 
  Header: Header,
  useCell: useCell, 
  useTable: useTable
}

export default CsvUpload;
export {
  RootProvider as Provider,  
  Table,
  AddCSVButton,
  ErrorCount,
  ErrorMessage,
  JumpToFirstError, 
  Cell,
  DisplayCell,
  InputCell,
  UploadButton, 
  Header,
  useCell, 
  useTable
}
