import { FC, InputHTMLAttributes } from "react";

interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {}
const Slider: FC<SliderProps> = ({ ...props }: SliderProps) => {
  return (
    <>
      <input type="range" {...props} />
    </>
  );
};
export default Slider;
