import { FC } from "react";
import { TableProvider } from "@contexts/TableProvider";
import { ErrorProvider } from "@contexts/ErrorProvider";
import { CSVSchema } from "dsl-validator";


export interface RootProviderProps {
  schema: CSVSchema;
  data?: string[][]
  onUploadClick: (rows: string[][]) => void;
  children: React.ReactNode
}

const RootProvider: FC<RootProviderProps> = ({ children, schema, onUploadClick, data = []}) => {

  return (
    <TableProvider schema={schema} data={data} onUploadClick={onUploadClick} >
      <ErrorProvider>
        {children}
      </ErrorProvider>
    </TableProvider>
  );
};

export default RootProvider;