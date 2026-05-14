import type { ComponentProps } from "react";
import { File } from "./File";
import "./FileStack.css";

const files: ComponentProps<typeof File>[] = [
  {
    label: "~ monday ~",
    fileNumber: 45,
    backgroundColor: "cream",
    className: "file-3",
  },
  {
    label: "~ tuesday ~",
    fileNumber: 46,
    backgroundColor: "yellow",
    className: "file-2",
  },
  {
    label: "~ wednesday ~ today~",
    fileNumber: 47,
    backgroundColor: "cream",
    className: "file-1",
  },
];

export function FileStack() {
  return (
    <div className="file-stack">
      {files.map((file) => (
        <File key={file.fileNumber} {...file} />
      ))}
    </div>
  );
}
