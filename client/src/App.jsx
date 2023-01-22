import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, CssBaseline } from "@mui/material";
import { themeSettings } from "./muiComps/theme";
import { ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import AuthSection from "./scenes/Header";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import Welcome from "./scenes/Welcome";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div
      className={`h-screen w-screen ${
        mode === "light" ? "bg-gray-200" : "bg-black"
      } `}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/profile/:userId"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
