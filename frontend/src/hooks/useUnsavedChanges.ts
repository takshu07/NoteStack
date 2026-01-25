import { useEffect } from "react";
import { useBlocker } from "react-router-dom";

export const useUnsavedChanges = (isDirty: boolean) => {
  // 1. Block navigation (React Router)
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      isDirty && currentLocation.pathname !== nextLocation.pathname
  );

  // 2. Browser native warning (Refresh/Close Tab)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = ""; // Standard for Chrome
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Handle the blocker UI confirmation
  useEffect(() => {
    if (blocker.state === "blocked") {
      const confirmLeave = window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      );
      if (confirmLeave) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }
  }, [blocker]);
};
