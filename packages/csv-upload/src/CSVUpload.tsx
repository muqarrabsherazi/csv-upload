import React, {FC, useState } from "react";
import { CSVSchema } from "types";
import Table, {type TableProps} from "./components/table";
import Header, { HeaderProps } from "./components/header";
import { TableProvider, useTable } from "./context/tableContext";
import AddCSVButton, {type AddCSVButtonProps} from "./components/addCSVButton";

export interface CsvUploadProps {
  schema: CSVSchema;
  onDataAccepted?: (rows: Record<string, unknown>[]) => void;
  children: React.ReactNode
}

interface CsvUploadComponent extends FC<CsvUploadProps> {
  Table: FC<TableProps>,
  AddCSVButton: FC<AddCSVButtonProps>
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
      {children}
    </TableProvider>
  );
};


CsvUpload.Table = Table

CsvUpload.AddCSVButton = AddCSVButton

export default CsvUpload;
