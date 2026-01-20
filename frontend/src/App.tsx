import AppRoutes from "./Routes/routes";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { checkAuthThunk } from "./features/auth/authThunks";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthChecked, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthThunk());
  }, [dispatch]);

  if (!isAuthChecked || loading) {
    return <p>Checking authentication...</p>;
  }

  return <AppRoutes />;
}

export default App;
