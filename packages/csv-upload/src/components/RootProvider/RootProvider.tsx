import { FC } from "react";
import { TableProvider } from "@contexts/TableProvider";
import { ErrorProvider } from "@contexts/ErrorProvider";
import { CSVSchema } from "types";


export interface RootProviderProps {
  schema: CSVSchema;
  data?: string[][]
  onDataAccepted?: (rows: Record<string, unknown>[]) => void;
  children: React.ReactNode
}

const RootProvider = ({ children, schema, onDataAccepted, data = []}: RootProviderProps) => {

  return (
    <TableProvider schema={schema} data={data}>
      <ErrorProvider>
        {children}
      </ErrorProvider>
    </TableProvider>
  );
};

export default RootProvider;