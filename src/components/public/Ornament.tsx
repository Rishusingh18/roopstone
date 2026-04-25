interface OrnamentProps {
  children: React.ReactNode;
  align?: "left" | "center";
  style?: React.CSSProperties;
}

export default function Ornament({ children, align = "center", style }: OrnamentProps) {
  return (
    <div
      className="ornament"
      style={{ justifyContent: align === "left" ? "flex-start" : "center", ...style }}
    >
      <span>{children}</span>
    </div>
  );
}
