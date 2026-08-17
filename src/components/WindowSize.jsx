import { useEffect } from "react";

function WindowSize() {
 useEffect(() => {
  const handleResize = () => {
    console.log("Window resized");
  };

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return <h1>Window Size</h1>;
}

export default WindowSize;