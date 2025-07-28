import { FC } from "react"
import { CSVFieldSchema } from "types";
import makeHeaderKey from "@utils/makeHeaderKey";
import { useTable } from "@contexts/TableProvider";



export interface HeaderProps {
  // headers: string[]
  className?: {
    root?: string
    cell?: string
  }
}

const Header: FC<HeaderProps> = ({className}) => {
  const {headers} = useTable(); 
  return (
    <tr className={className?.root?? ""}>
      {
        headers.map((header, headerIndex) => (
          <th className={className?.cell?? ""}
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
