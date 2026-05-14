import "./File.css";

type FileVariant = "cream" | "yellow";

interface FileProps {
  label: string;
  fileNumber: number;
  backgroundColor?: FileVariant;
  className: string;
}

const backgroundClass: Record<FileVariant, string> = {
  cream: "bg-cream",
  yellow: "bg-yellow",
};

export function File({
  label,
  fileNumber,
  backgroundColor = "cream",
  className,
}: FileProps) {
  const classes = `file ${backgroundClass[backgroundColor]} ${className}`;

  return (
    <div className={classes}>
      <span className="file-label">{label}</span>
      <span className="file-number">{"№ " + fileNumber}</span>
    </div>
  );
}
