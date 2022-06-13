import React from "react";
import "./App.css";
import { useLog } from "./use-log";

function App() {
  const [count, setCount] = React.useState(0);
  const [notSoUrgentValue, setNotSoUrgentValue] = React.useState(0);
  const [, startTransition] = React.useTransition();

  function handleClick() {
    setCount((c) => c + 1);
    startTransition(() => setNotSoUrgentValue((x) => x + 1));
  }

  useLog("App", notSoUrgentValue, count);

  return (
    <div className="App">
      <button onClick={handleClick}>Go!</button>

      <p>Count: {count}</p>
      <A notSoUrgentValue={notSoUrgentValue} />
    </div>
  );
}

function A({ notSoUrgentValue }: { notSoUrgentValue: number }) {
  useLog("A", notSoUrgentValue);
  return <B notSoUrgentValue={notSoUrgentValue} />;
}

function B({ notSoUrgentValue }: { notSoUrgentValue: number }) {
  useLog("B", notSoUrgentValue);
  return <C notSoUrgentValue={notSoUrgentValue} />;
}

function C({ notSoUrgentValue }: { notSoUrgentValue: number }) {
  useLog("C", notSoUrgentValue);

  // Something CPU intensive
  React.useMemo(() => {
    function doSomeHeavyStuff() {
      let x = 0;
      for (let i = 0; i < 100000000 * notSoUrgentValue; i++) {
        x = x + 1;
      }

      return x;
    }

    return doSomeHeavyStuff();
  }, [notSoUrgentValue]);

  return <D notSoUrgentValue={notSoUrgentValue} />;
}

function D({ notSoUrgentValue }: { notSoUrgentValue: number }) {
  useLog("D", notSoUrgentValue);
  return <>{notSoUrgentValue}</>;
}

export default App;
