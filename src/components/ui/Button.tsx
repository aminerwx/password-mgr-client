import { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({
  value,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button className={className} value={value} {...props}>
      {children && children}
    </button>
  );
};

export default Button;
