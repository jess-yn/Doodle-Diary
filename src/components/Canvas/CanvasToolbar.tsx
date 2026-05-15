import { EraserIcon } from "../icons/EraserIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { GpenIcon } from "../icons/GpenIcon";
import { MarkerIcon } from "../icons/MarkerIcon";
import { FinelinerIcon } from "../icons/FinelinerIcon";
import { UndoIcon } from "../icons/UndoIcon";
import { RedoIcon } from "../icons/RedoIcon";
import { ClearIcon } from "../icons/ClearIcon";
import { ButtonIcon } from "../Button/ButtonIcon";
import type { PenItem, ToolItem } from "./types";
import type { PenType } from "./Canvas";
import type { ColorType } from "./Canvas";
import { useState } from "react";

interface CanvasToolbarProps {
  onPenChange: (pen: PenType) => void;
  onColorChange: (color: ColorType) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

const pens: PenItem[] = [
  { icon: <PencilIcon />, tooltip: "pencil" },
  { icon: <MarkerIcon />, tooltip: "marker" },
  { icon: <GpenIcon />, tooltip: "gpen" },
  { icon: <FinelinerIcon />, tooltip: "fineliner" },
  { icon: <EraserIcon />, tooltip: "eraser" },
];

export function CanvasToolbar({
  onPenChange,
  onColorChange,
  onUndo,
  onRedo,
  onClear,
}: CanvasToolbarProps) {
  const [activePen, setActivePen] = useState<PenType>("pencil");
  const [activeColor, setActiveColor] = useState<ColorType>("black");

  const controls: ToolItem[] = [
    { icon: <UndoIcon />, tooltip: "undo", onClick: onUndo },
    { icon: <RedoIcon />, tooltip: "redo", onClick: onRedo },
    { icon: <ClearIcon />, tooltip: "clear", onClick: onClear },
  ];

  const handleActivePen = (pen: PenType) => {
    setActivePen(pen);
    onPenChange(pen);
  };

  const handleActiveColor = (color: ColorType) => {
    setActiveColor(color);
    onColorChange(color);
  };

  return (
    <div className="canvas-toolbar">
      <div className="pens">
        {pens.map((pen) => (
          <ButtonIcon
            key={pen.tooltip}
            {...pen}
            active={activePen == pen.tooltip}
            onClick={() => handleActivePen(pen.tooltip)}
          ></ButtonIcon>
        ))}
      </div>
      <div className="color-palette">
        <button
          className={`color color-black ${activeColor == "black" ? "active" : ""}`}
          onClick={() => handleActiveColor("black")}
        ></button>
        <button
          className={`color color-pink ${activeColor == "pink" ? "active" : ""}`}
          onClick={() => handleActiveColor("pink")}
        ></button>
        <button
          className={`color color-blue ${activeColor == "blue" ? "active" : ""}`}
          onClick={() => handleActiveColor("blue")}
        ></button>
        <button
          className={`color color-purple ${activeColor == "purple" ? "active" : ""}`}
          onClick={() => handleActiveColor("purple")}
        ></button>
      </div>
      <div className="strokeWidth"></div>
      <div className="controls">
        {controls.map((control: ToolItem) => (
          <ButtonIcon key={control.tooltip} {...control}></ButtonIcon>
        ))}
      </div>
    </div>
  );
}
