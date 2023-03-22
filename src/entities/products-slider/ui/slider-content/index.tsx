import { HTMLAttributes } from "react";

type SliderProps = Omit<HTMLAttributes<HTMLDivElement>, "translate"> & {
  width: number;
  translate: number;
  transition: number;
};

export const SliderContent = (props: SliderProps) => {
  const { width, translate, transition, style, ...other } = props;

  const styles = {
    ...style,
    transform: `translateX(-${translate}px)`,
    transition: `transform ease-out ${transition}s`,
    height: "100%",
    width: `${width}px`,
    display: "flex",
  };

  return <div style={styles} {...other} />;
};
