  
import { FC } from "react"
import makeHeaderKey from "@utils/makeHeaderKey";
import useTable from "@hooks/useTable";



export interface HeaderProps {
  classNames?: {
    row?: string
    cell?: string
  }
}

const Header: FC<HeaderProps> = ({classNames}) => {
  const {headers} = useTable(); 
  return (
    <tr className={classNames?.row?? ""}>
      {
        headers.map((header, headerIndex) => (
          <th className={classNames?.cell?? ""} key={makeHeaderKey(headerIndex)}>
            {header}
          </th>
        ))
      }
    </tr>
  )
}

export default Header;
