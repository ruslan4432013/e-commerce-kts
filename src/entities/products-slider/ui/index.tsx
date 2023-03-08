import { FC, useEffect, useRef, useState } from "react";

import { Slide } from "@entities/products-slider/ui/slide";
import { SliderContent } from "@entities/products-slider/ui/slider-content";
import ArrowIcon from "@shared/assets/icons/arrow.svg";
import cn from "classnames";

import s from "./styles.module.scss";

interface SliderProps {
  images: string[];
}

export const ProductSlider: FC<SliderProps> = ({ images }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const getWidth = () => width;
  const parentRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const setInnerWidth = () => {
      const parentWidth = parentRef.current?.offsetWidth || 375;
      setWidth(parentWidth);
    };
    setInnerWidth();
    window.addEventListener("resize", setInnerWidth);
    return () => {
      window.removeEventListener("resize", setInnerWidth);
    };
  }, []);

  const [state, setState] = useState({
    translate: 0,
    transition: 0.45,
    activeIndex: 0,
  });

  const { translate, transition, activeIndex } = state;

  const nextSlide = () => {
    if (activeIndex === images.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth(),
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (images.length - 1) * getWidth(),
        activeIndex: images.length - 1,
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth(),
    });
  };

  return (
    <div ref={parentRef} className={s.slider}>
      <SliderContent
        width={getWidth() * images.length}
        translate={translate}
        transition={transition}
      >
        {images.map((image, index) => (
          <Slide key={`${image} - ${index}`} content={image} />
        ))}
      </SliderContent>
      <button
        className={cn(s.slider_arrow, s.slider_arrow__left)}
        onClick={prevSlide}
      >
        <ArrowIcon className={s.icon} />
      </button>
      <button
        className={cn(s.slider_arrow, s.slider_arrow__right)}
        onClick={nextSlide}
      >
        <ArrowIcon className={cn(s.icon, s.arrow_right)} />
      </button>
    </div>
  );
};
