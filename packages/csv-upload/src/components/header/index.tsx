import { FC } from "react"
import { CSVFieldSchema } from "types";
import makeHeaderKey from "../../utils/makeHeaderKey";


const testHeaders: CSVFieldSchema[] = [
  {
    name: "Test Header 1",
    type: "string",
  },
  {
    name: "Test Header 2",
    type: "string",
  },
  {
    name: "Test Header 3",
    type: "string",
  },
];

export interface HeaderProps {
}

const Header: FC<HeaderProps> = () => {
  return (
    <tr>
      {
        testHeaders.map((header, headerIndex) => (
          <th
            key={makeHeaderKey(headerIndex)}
            style={{
              border: "1px solid black",
              padding: "8px",
              textAlign: "left",
            }}
          >
            {header.name}
          </th>

        ))
      }
    </tr>
  )
}

export default Header;
