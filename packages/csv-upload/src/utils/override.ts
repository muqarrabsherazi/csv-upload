import { FC, ReactNode } from "react";
import { CSVCellCoords } from "types";


export interface Override {
  condition: (coords: CSVCellCoords) => boolean;
  node: ReactNode | null;
}

export interface OverrideParams {
  coords: CSVCellCoords;
  baseNode: ReactNode;
  overrides: Override[];
}

const override = ({ coords, baseNode, overrides}: OverrideParams) => {
  const node: ReactNode | null = overrides.reduce<ReactNode | null>(
    (acc, ov) => ov.condition(coords) ? ov.node : acc,
    null
  );
  return node ?? baseNode

}

export default override;