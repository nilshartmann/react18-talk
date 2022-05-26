import React from "react";

let id = 0;

function getRandomBetween(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const colors = [
  "#BE002F",
  "#F20C00",
  "#F00056",
  "#FF2D51",
  "#FF2121",
  "#FF4C00",
  "#FF7500",
  "#FF8936",
  "#FFA400",
  "#F0C239",
  "#FFF143",
  "#FAFF72",
  "#C9DD22",
  "#AFDD22",
  "#9ED900",
  "#00E500",
  "#0EB83A",
  "#0AA344",
  "#0C8918",
  "#057748",
  "#177CB0",
];

type BarData = {
  id: any;
  color: string;
  value: number;
};

function createBarData(): BarData {
  return {
    id: ++id,
    color: colors[getRandomBetween(0, colors.length)],
    value: getRandomBetween(15, 100),
  };
}

function initialData() {
  id = 0;
  const result: BarData[] = [];
  for (let i = 0; i < 50000; i++) {
    result.push(createBarData());
  }

  return result;
}

export default function ExampleChartWithInterval() {
  const [isUseTransition, setUseTransition] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [barDatas, setBarDatas] = React.useState<BarData[]>(initialData); //[createBarData(), createBarData(), createBarData()];
  const [isPending, startTransition] = React.useTransition();

  React.useEffect(() => {
    function updateBars() {
      setBarDatas((barDatas) => {
        const newBarData = [...barDatas];
        newBarData.shift();
        return [...newBarData, createBarData()];
      });
    }
    const timerId = setInterval(() => {
      if (isUseTransition) {
        startTransition(() => {
          updateBars();
        });
      } else {
        updateBars();
      }
      // EXAMPLE => SET TO 1000
    }, 500);

    return () => clearInterval(timerId);
  }, [isUseTransition]);

  function handleToggle() {
    setInput("");
    setBarDatas(initialData());
    setUseTransition((x) => !x);
  }

  function handleInput(e: string) {
    setInput(e);
  }

  const divStyle: React.CSSProperties = {
    backgroundColor: isPending ? "lightgray" : "white",
    opacity: isPending ? 0.5 : 1,
  };

  return (
    <div style={{ width: "100%", padding: "2rem" }}>
      <h1>With Interval</h1>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isUseTransition}
            onChange={handleToggle}
          />
          Use Transition
        </label>
      </div>
      <input
        style={{
          padding: "0.5rem",
          width: "100%",
          marginBottom: "1rem",
        }}
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
      />
      <div style={divStyle}>
        <TheChart barDatas={barDatas} />
      </div>
    </div>
  );
}

type BarProps = {
  id: any;
  color: string;
  value: number;
};

const TheChart = React.memo(function TheChart({
  barDatas,
}: {
  barDatas: BarData[];
}) {
  return (
    <>
      {barDatas.map((d) => (
        <Bar key={d.id} {...d} />
      ))}
    </>
  );
});

function Bar({ color, value, id }: BarProps) {
  const style: React.CSSProperties = {
    backgroundColor: color,
    width: value + "%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
  };

  const spanStyle: React.CSSProperties = {
    marginRight: "0.3rem",
    backgroundColor: "lightgray",
    padding: "0.3rem",
  };

  return (
    <div style={style}>
      <span style={spanStyle}> {id}</span>
      {value}
    </div>
  );
}
