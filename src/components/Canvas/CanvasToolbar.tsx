import { EraserIcon } from "../icons/EraserIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { GpenIcon } from "../icons/GpenIcon";
import { MarkerIcon } from "../icons/MarkerIcon";
import { FinelinerIcon } from "../icons/FinelinerIcon";
import { UndoIcon } from "../icons/UndoIcon";
import { RedoIcon } from "../icons/RedoIcon";
import { ClearIcon } from "../icons/ClearIcon";
import { ButtonIcon } from "../Button/ButtonIcon";

import { useState } from "react";

interface CanvasToolbarProps {
  handleClear: () => void;
}

const pens = [
  { icon: <PencilIcon />, tooltip: "pencil" },
  { icon: <MarkerIcon />, tooltip: "marker" },
  { icon: <GpenIcon />, tooltip: "gpen" },
  { icon: <FinelinerIcon />, tooltip: "fineliner" },
  { icon: <EraserIcon />, tooltip: "eraser" },
];

const controls = [
  { icon: <UndoIcon />, tooltip: "undo" },
  { icon: <RedoIcon />, tooltip: "redo" },
  { icon: <ClearIcon />, tooltip: "clear" },
];

export function CanvasToolbar({ handleClear }: CanvasToolbarProps) {
  const [activePen, setActivePen] = useState("pencil");

  const handleActivePen = (pen: string) => {
    setActivePen(pen);
  };

  const handleControl = () => {};

  return (
    <div className="canvas-toolbar">
      <div className="pens">
        {pens.map((pen) => (
          <ButtonIcon
            key={pen.tooltip}
            {...pen}
            active={activePen == pen.tooltip}
            onClick={handleActivePen}
          ></ButtonIcon>
        ))}
      </div>
      <div className="color-palette"></div>
      <div className="stroke-width"></div>
      <div className="controls">
        {controls.map((control) => (
          <ButtonIcon
            key={control.tooltip}
            {...control}
            onClick={handleClear}
          ></ButtonIcon>
        ))}
      </div>
    </div>
  );
}
