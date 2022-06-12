import logo from "./logo.svg";
import "./App.css";
import Slide from "./components/slider/Slide";
import { useState } from "react";

function App() {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Slide
        onSlideComplete={setIndex}
        onSlideStart={(i) => {
          console.log("started dragging on slide", i);
        }}
        activeIndex={index}
        threshHold={100}
        transition={0.3}
        scaleOnDrag={true}
      />
    </div>
  );
}

export default App;
