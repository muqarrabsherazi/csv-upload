import { FC } from "react";
import { TableProvider } from "@contexts/TableProvider";
import { ErrorProvider } from "@contexts/ErrorProvider";
import { CSVSchema } from "dsl-validator";
import { CSVError } from "types";

export interface RootProviderProps {
  schema: CSVSchema;
  data?: string[][];
  errors?: CSVError[];
  onUploadClick: (rows: string[][]) => void;
  onErrorResolve? : () => void
  children: React.ReactNode;
}

const RootProvider: FC<RootProviderProps> = ({ children, schema, onUploadClick, onErrorResolve, errors = [], data = []}) => {

  return (
    <TableProvider schema={schema} data={data} onUploadClick={onUploadClick} >
      <ErrorProvider externalErrors={errors} onErrorResolve={onErrorResolve}>
        {children}
      </ErrorProvider>
    </TableProvider>
  );
};

export default RootProvider;