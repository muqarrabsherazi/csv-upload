import { FC } from "react";
import { TableProvider } from "@contexts/TableProvider";
import { ErrorProvider } from "@contexts/ErrorProvider";
import { CSVSchema } from "dsl-validator";
import { CSVError } from "types";

export interface RootProviderProps {
  schema: CSVSchema;
  data?: string[][];
  errors?: CSVError[];
  onUploadClick: (rows: string[][], lastChangedRow: number) => void;
  children: React.ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children, schema, onUploadClick, errors = [], data = []}) => {
  return (
    <TableProvider schema={schema} data={data} onUploadClick={onUploadClick} >
      <ErrorProvider externalErrors={errors}>
        {children}
      </ErrorProvider>
    </TableProvider>
  );
};

export default RootProvider;