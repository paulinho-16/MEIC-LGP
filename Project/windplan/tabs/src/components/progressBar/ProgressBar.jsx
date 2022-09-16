import React from "react";
import { Circle } from "rc-progress";

export default function ProgressBar({ progress }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, .5)",
        position: "fixed",
        zIndex: 1,
        left: 0,
        top: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Circle
        percent={progress}
        trailWidth={4}
        trailColor={"#F6FCFF"}
        strokeWidth={4}
        strokeColor="#4490BA"
        width="25%"
        height="25%"
      />
    </div>
  );
}
