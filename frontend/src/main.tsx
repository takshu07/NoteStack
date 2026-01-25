import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { NavbarProvider } from "./context/NavbarContext.tsx";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <NavbarProvider>
        <RouterProvider router={router} />
      </NavbarProvider>
    </ThemeProvider>
  </Provider>
);
