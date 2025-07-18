import React, {FC, useState } from "react";
import { CSVSchema } from "types";
import Table, {type TableProps} from "./components/table";
import Header, { HeaderProps } from "./components/header";

export interface CsvUploadProps {
  schema: CSVSchema;
  onDataAccepted?: (rows: Record<string, unknown>[]) => void;
  children: React.ReactNode
}

interface CsvUploadComponent extends FC<CsvUploadProps> {
  Table: FC<TableProps>,
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
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [errors, setErrors] = useState<Error[]>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  

  // TODO: Implement CSV parsing, validation logic, and editable table UI.

  return (
    <div>
      <p>CsvUpload component placeholder. Implement UI & validation logic.</p>
      <button disabled={!isValid} onClick={() => onDataAccepted?.(rows)}>
        Upload to backend
      </button>
    </div>
  );
};


CsvUpload.Table = Table


export default CsvUpload;
