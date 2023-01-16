import "@/assets/css/tailwind.css";
import { message } from "antd";
import { Suspense, startTransition, useEffect, useState } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { routers } from "./routers";
message.config({
  maxCount: 3,
});

function App() {
  const location = useLocation();
  const history = useNavigate();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransistionStage] = useState("pageFadeIn");

  useEffect(() => {
    startTransition(() => {
      setDisplayLocation(location);
    });
  }, [location]);

  const element = useRoutes(routers, displayLocation);

  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={() => {
        if (transitionStage === "pageFadeOut") {
          setTransistionStage("pageFadeIn");
          setDisplayLocation(location);
        }
      }}
    >
      <Suspense fallback={<div>App Loading....</div>}>{element}</Suspense>
    </div>
  );
}

export default App;
