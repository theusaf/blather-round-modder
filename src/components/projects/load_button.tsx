"use client";
import { AppEvents } from "../../lib/app/constants";
import React, { useEffect, useState } from "react";
import FontAwesomeIcon from "../fontawesome";
import { PrimaryButton } from "../button";

type LoadingState = "loading" | "loaded" | "error" | "empty";

export default function ProjectLoadButton() {
  const [loadingState, setLoadingState] = useState<LoadingState>("loaded");

  function onSuccess() {
    setLoadingState("loaded");
  }

  function onFail() {
    setLoadingState("error");
  }

  function onEmpty() {
    setLoadingState("empty");
  }

  function onClick() {
    window.dispatchEvent(new CustomEvent(AppEvents.LOAD_MORE_PROJECTS));
    setLoadingState("loading");
  }

  useEffect(() => {
    window.addEventListener(AppEvents.LOAD_MORE_PROJECTS_SUCCESS, onSuccess);
    window.addEventListener(AppEvents.LOAD_MORE_PROJECTS_FAILED, onFail);
    window.addEventListener(AppEvents.LOAD_MORE_PROJECTS_EMPTY, onEmpty);
    return () => {
      window.removeEventListener(
        AppEvents.LOAD_MORE_PROJECTS_SUCCESS,
        onSuccess,
      );
      window.removeEventListener(AppEvents.LOAD_MORE_PROJECTS_FAILED, onFail);
      window.removeEventListener(AppEvents.LOAD_MORE_PROJECTS_EMPTY, onEmpty);
    };
  }, [loadingState]);

  let noteContent = <></>;
  switch (loadingState) {
    case "error":
      noteContent = (
        <p className={`text-red-700`}>
          Error loading more projects. Try again later.
        </p>
      );
      break;
    case "empty":
      noteContent = <p className="text-gray-700">No more projects to load.</p>;
      break;
  }

  return (
    <div className="w-full text-center">
      <PrimaryButton
        onClick={onClick}
        disabled={loadingState === "loading" || loadingState === "empty"}
        className="bg-blue-500 hover:bg-blue-700"
      >
        {loadingState === "loading" ? (
          <FontAwesomeIcon icon="circle-notch" className="animate-spin" />
        ) : null}
        Load More
      </PrimaryButton>
      {noteContent}
    </div>
  );
}
