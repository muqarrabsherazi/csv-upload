import { FC } from "react"
import makeHeaderKey from "@utils/makeHeaderKey";
import useHeader from "@hooks/useHeader";

export interface HeaderProps {
  className?: string
}

const Header: FC<HeaderProps> = ({ className }) => {
  const { header, headerIndex } = useHeader();
  return (
    <th className={className ?? ""} key={makeHeaderKey(headerIndex)}>
      {header}
    </th>
  )
}

export default Header;
