"use client";
import React, { useEffect, useState } from "react";

function listener(callback: CallableFunction) {
  const eventListener = () => {
      callback();
    },
    pingInterval = setInterval(() => {
      const event = new CustomEvent("PreMiD_RequestExtensionData", {
        detail: {
          language: "en",
          strings: {},
        },
      });
      window.dispatchEvent(event);
    }, 5e3);
  window.addEventListener("PreMiD_ReceiveExtensionData", eventListener);
  return () => {
    window.removeEventListener("PreMiD_ReceiveExtensionData", eventListener);
    clearInterval(pingInterval);
  };
}

export default function PremidDetector() {
  const [premidDetected, setDetected] = useState(false);
  useEffect(() => {
    if (premidDetected) return;
    const dispose = listener(() => {
      setDetected(true);
      console.log(
        "Hey! It looks like you are using PreMiD! This app doesn't have a presence for it, but maybe it will in the future.",
      );
    });
    return () => dispose();
  }, [premidDetected]);
  return <></>;
}
