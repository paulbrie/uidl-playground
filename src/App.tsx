import "./styles.css";
import store from "./store";
import Code from "./pages/code";
import UidlVisualiser from "./pages/uidlVisualiser";
import About from "./pages/about";
import Custom from "./pages/custom";
import Uidl from "./pages/uidl";

const views = {
  UIDL: <Uidl />,
  Code: <Code />,
  "UIDL Visualiser": <UidlVisualiser />,
  Custom: <Custom />,
  About: <About />
};

export default function App() {
  const view = store.view.hook();
  return (
    <div className="App">
      <h1>TeleportHQ for Developers</h1>
      <div
        style={{
          display: "flex",
          gap: 8,
          borderRadius: 4,
          marginBottom: 32,
          borderBottom: "solid 1px #cccccc80"
        }}
      >
        {Object.keys(views).map((key, index) => {
          return (
            <div
              key={index}
              style={{
                height: 32,
                padding: "0 16px",
                display: "flex",
                alignItems: "center",
                backgroundColor: key === view ? "#cccccc50" : "",
                cursor: "pointer"
              }}
              onClick={() => store.view.next(key)}
            >
              {key}
            </div>
          );
        })}
      </div>
      {views[view]}
    </div>
  );
}
