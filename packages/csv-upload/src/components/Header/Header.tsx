  
import { FC } from "react"
import makeHeaderKey from "@utils/makeHeaderKey";
import useTable from "@hooks/useTable";



export interface HeaderProps {
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
          <th className={className?.cell?? ""} key={makeHeaderKey(headerIndex)}>
            {header}
          </th>
        ))
      }
    </tr>
  )
}

export default Header;
