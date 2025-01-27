import { FC, LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  value: string;
}

const Label: FC<LabelProps> = ({ value, ...props }: LabelProps) => {
  return <label {...props}>{value}</label>;
};

export default Label;
