import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { checkAuthThunk } from "./features/auth/authThunks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Check auth in background without blocking render
    dispatch(checkAuthThunk());
  }, [dispatch]);

  // ✅ Render immediately - no blocking
  return <Outlet />;
}

export default App;
