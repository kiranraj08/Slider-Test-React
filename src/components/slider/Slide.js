import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import {
  nft01,
  nft02,
  nft03,
  nft04,
  nft05,
  nft06,
  nft07,
  nft08,
} from "../../assets";
import "./slide.css";

const Slide = ({
  children,
  onSlideComplete,
  onSlideStart,
  activeIndex = null,
  threshHold = 100,
  transition = 0.3,
  scaleOnDrag = false,
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const dragging = useRef(false);
  const startPos = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const currentIndex = useRef(activeIndex || 0);
  const slider = useRef();
  const animationRef = useRef(null);

  function getPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function getElementDimensions(ref) {
    const width = ref.current.clientWidth;
    const height = ref.current.clientHeight;
    return { width, height };
  }

  const setPositionByIndex = useCallback(
    (w = dimensions.width) => {
      currentTranslate.current = currentIndex.current * -w;
      prevTranslate.current = currentTranslate.current;
      setSliderPosition();
    },
    [dimensions.width]
  );

  const transitionOn = () =>
    (slider.current.style.transition = `transform ${transition}s ease-out`);

  const transitionOff = () => (slider.current.style.transition = "none");

  // watch for a change in activeIndex prop
  useEffect(() => {
    if (activeIndex !== currentIndex.current) {
      transitionOn();
      currentIndex.current = activeIndex;
      setPositionByIndex();
    }
  }, [activeIndex, setPositionByIndex]);

  // set width after first render
  // set position by startIndex
  // no animation on startIndex
  useLayoutEffect(() => {
    setDimensions(getElementDimensions(slider));

    setPositionByIndex(getElementDimensions(slider).width);
  }, [setPositionByIndex]);

  // add event listeners
  useEffect(() => {
    // set width if window resizes
    const handleResize = () => {
      transitionOff();
      const { width, height } = getElementDimensions(slider);
      setDimensions({ width, height });
      setPositionByIndex(width);
    };

    const handleKeyDown = ({ key }) => {
      const arrowsPressed = ["ArrowRight", "ArrowLeft"].includes(key);
      if (arrowsPressed) transitionOn();
      if (arrowsPressed && onSlideStart) {
        onSlideStart(currentIndex.current);
      }
      if (key === "ArrowRight" && currentIndex.current < 7) {
        currentIndex.current += 1;
      }
      if (key === "ArrowLeft" && currentIndex.current > 0) {
        currentIndex.current -= 1;
      }
      if (arrowsPressed && onSlideComplete)
        onSlideComplete(currentIndex.current);
      setPositionByIndex();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setPositionByIndex, onSlideComplete, onSlideStart]);

  function touchStart(index) {
    return function (event) {
      transitionOn();
      currentIndex.current = index;
      startPos.current = getPositionX(event);
      dragging.current = true;
      animationRef.current = requestAnimationFrame(animation);
      slider.current.style.cursor = "grabbing";
      // if onSlideStart prop - call it
      if (onSlideStart) onSlideStart(currentIndex.current);
    };
  }

  function touchMove(event) {
    if (dragging.current) {
      const currentPosition = getPositionX(event);
      currentTranslate.current =
        prevTranslate.current + currentPosition - startPos.current;
    }
  }

  function touchEnd() {
    transitionOn();
    cancelAnimationFrame(animationRef.current);
    dragging.current = false;
    const movedBy = currentTranslate.current - prevTranslate.current;

    // if moved enough negative then snap to next slide if there is one
    if (movedBy < -threshHold && currentIndex.current < 7)
      currentIndex.current += 1;

    // if moved enough positive then snap to previous slide if there is one
    if (movedBy > threshHold && currentIndex.current > 0)
      currentIndex.current -= 1;

    transitionOn();

    setPositionByIndex();
    slider.current.style.cursor = "grab";
    // if onSlideComplete prop - call it
    if (onSlideComplete) onSlideComplete(currentIndex.current);
  }

  function animation() {
    setSliderPosition();
    if (dragging.current) requestAnimationFrame(animation);
  }

  function setSliderPosition() {
    slider.current.style.transform = `translateX(${currentTranslate.current}px)`;
  }

  return (
    <div className="wrapper">
      <div className="slide-container" ref={slider}>
        <div>
          <img
            className="first"
            onTouchMove={touchMove}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            onTouchEnd={touchEnd}
            src={nft01}
            alt="second"
            onTouchStart={touchStart(0)}
          />
        </div>
        <div>
          <img
            onTouchStart={touchStart(1)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft02}
            alt="second"
          />
        </div>
        <div>
          <img
            onTouchStart={touchStart(2)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft03}
            alt="second"
          />
        </div>
        <div>
          <img
            onTouchStart={touchStart(3)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft04}
            alt="second"
          />
        </div>
        <div>
          <img
            onTouchStart={touchStart(4)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft05}
            alt="second"
          />
        </div>
        <div>
          <img
            onTouchStart={touchStart(5)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft06}
            alt="second"
          />
        </div>
        <div>
          <img
            onTouchStart={touchStart(6)}
            onTouchMove={touchMove}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft07}
            alt="second"
          />
        </div>
        <div>
          <img
            onTouchMove={touchMove}
            onTouchStart={touchStart(7)}
            onTouchEnd={touchEnd}
            onMouseDown={touchStart(0)}
            onMouseMove={touchMove}
            onMouseLeave={touchEnd}
            onMouseUp={touchEnd}
            className="first"
            src={nft08}
            alt="second"
          />
        </div>
      </div>
    </div>
  );
};

export default Slide;
