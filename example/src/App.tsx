import React from "react";
import ExampleChart from "./ExampleChart";
import ExampleChartWithDeferredValue from "./ExampleChartWithDeferredValue";

export default function App() {
  const [tab, setTab] = React.useState("use transition");

  return (
    <div>
      <button onClick={() => setTab("use transition")}>Use Transition</button>
      <button onClick={() => setTab("deferred value")}>
        With useDeferredValue
      </button>
      <button onClick={() => setTab("react query")}>React Query</button>

      {/* <button onClick={() => setTab("with interval")}>with interval</button> */}

      {tab === "use transition" && <ExampleChart />}
      {tab === "deferred value" && <ExampleChartWithDeferredValue />}
      {/* {tab === "with interval" && <ExampleChartWithInterval />} */}
    </div>
  );
}
