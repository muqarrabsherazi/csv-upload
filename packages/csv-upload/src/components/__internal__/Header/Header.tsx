import { FC } from "react"
import { CSVFieldSchema } from "types";
import makeHeaderKey from "@utils/makeHeaderKey";
import { useTable } from "@contexts/TableProvider";



export interface HeaderProps {
  headers: string[]
}

const Header: FC<HeaderProps> = ({headers}) => {
  // const {headers} = useTable(); 
  return (
    <tr>
      {
        headers.map((header, headerIndex) => (
          <th
            key={makeHeaderKey(headerIndex)}
            style={{
              border: "1px solid black",
              padding: "8px",
              textAlign: "left",
            }}
          >
            {header}
          </th>

        ))
      }
    </tr>
  )
}

export default Header;
