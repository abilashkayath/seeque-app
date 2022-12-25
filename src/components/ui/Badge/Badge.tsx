import "./Badge.css";

export type BadgeProps = {
  text: string;
  bgColor?: string;
  color?: string;
};

const Badge = ({
  text,
  bgColor = "#c0edc0",
  color = "#213a1f",
}: BadgeProps) => {
  return (
    <div className="badge" style={{ backgroundColor: bgColor, color }}>
      {text}
    </div>
  );
};

export default Badge;
