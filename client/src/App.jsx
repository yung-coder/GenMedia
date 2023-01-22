import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./scenes/LoginPage";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, CssBaseline } from "@mui/material";
import { themeSettings } from "./muiComps/theme";
import { ThemeProvider } from "@mui/material";
import { useMemo } from "react";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div
      className={`h-screen w-screen ${
        mode === "light" ? "bg-gray-200" : "bg-black"
      } `}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
