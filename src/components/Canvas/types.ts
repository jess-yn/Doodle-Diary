import type { ButtonIconProps } from "../Button/ButtonIcon";
import type { PenType } from "./Canvas";

export type ToolItem = Pick<ButtonIconProps, "icon" | "tooltip" | "onClick">;
export type PenItem = { icon: ButtonIconProps["icon"]; tooltip: PenType };
