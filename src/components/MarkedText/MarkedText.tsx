/** @jsxRuntime classic */
// @jsx jsx
import { jsx } from "theme-ui";
import { ThemeUIStyleObject } from "@theme-ui/css";
import { LinkProps } from "react-router-dom";

interface MarkedTextProps {
  link: string | LinkProps;
  textColor: string;
  c1: string;
  c2: string;
  sx?: ThemeUIStyleObject;
}

const MarkedText: React.FC<MarkedTextProps> = ({
  link,
  textColor,
  c1,
  c2,
  ...props
}) => {
  const style: ThemeUIStyleObject = {
    backgroundColor: c1,
    color: textColor,
  };

  return <span sx={{ ...style, ...props.sx }}></span>;
};

export default MarkedText;
