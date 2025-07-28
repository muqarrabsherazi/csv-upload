import { FC } from "react";
import { useCell } from "@contexts/CellProvider";
import cellMap from "@utils/cellMap";

const Cell: FC = () => {
  const { coords, value, errorMsg, type } = useCell();
  const RenderCell = cellMap[type];

  return <RenderCell coords={coords} value={value} errorMsg={errorMsg} type={type} />;
};

export default Cell;
