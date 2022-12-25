import "./Typography.css";

type TextProps = {
  text: string;
  color?: string;
};

type TitleProps = {
  text: string;
  level?: number;
  color?: string;
};

export const Text = ({ text, color = "black" }: TextProps) => {
  return (
    <p className="text" style={{ color }}>
      {text}
    </p>
  );
};

const getHeaderTag = (text: string, level: number, color: string) => {
  switch (level) {
    case 1:
      return (
        <h1 className="header-tag" style={{ color }}>
          {text}
        </h1>
      );
    case 3:
      return (
        <h3 className="header-tag" style={{ color }}>
          {text}
        </h3>
      );
    case 4:
      return (
        <h4 className="header-tag" style={{ color }}>
          {text}
        </h4>
      );
    default:
      return (
        <h5 className="header-tag" style={{ color }}>
          {text}
        </h5>
      );
  }
};

export const Title = ({ text, level = 5, color = "black" }: TitleProps) => {
  return getHeaderTag(text, level, color);
};
