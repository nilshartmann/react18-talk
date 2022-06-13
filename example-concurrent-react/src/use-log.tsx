import React from "react";

const logRenderBubbleStyle = [
  "background-color: #6a7175",
  "color: white",
  "padding: 2px 4px",
  "border-radius: 2px",
].join(";");
const logRenderStyle = ["color: #6a7175"].join(";");
const logCommitStyleGreen = ["color: green"].join(";");
const logCommitBubbleStyleGreen = [
  "background-color: rgb(175, 221, 34)",
  "color: rgb(5, 119, 72)",
  "padding: 2px 4px",
  "border-radius: 2px",
].join(";");

export function useLog(name: string, notSoUrgentValue: any, countValue?: any) {
  const theName = name.padEnd(3, " ");
  if (countValue !== undefined && countValue !== null) {
    console.log(
      "%cRender%c %s count: %s, notSoUrgentValue: %s",
      logRenderBubbleStyle,
      logRenderStyle,
      theName,
      countValue,
      notSoUrgentValue
    );
  } else {
    console.log(
      "%cRender%c %s notSoUrgentValue: %s",
      logRenderBubbleStyle,
      logRenderStyle,
      theName,
      notSoUrgentValue
    );
  }
  React.useEffect(() => {
    if (countValue !== undefined && countValue !== null) {
      console.log(
        "%cCommit%c %s count: %s, notSoUrgentValue: %s ",
        logCommitBubbleStyleGreen,
        logCommitStyleGreen,
        theName,
        countValue,
        notSoUrgentValue
      );
    } else {
      console.log(
        "%cCommit%c %s notSoUrgentValue: %s ",
        logCommitBubbleStyleGreen,
        logCommitStyleGreen,
        theName,
        notSoUrgentValue
      );
    }
  });
}
