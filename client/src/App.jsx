import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./scenes/LoginPage";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const mode = useSelector((state) => state.mode);
  return (
    <div
      className={`h-screen w-screen ${
        mode === "light" ? "bg-gray-200" : "bg-black"
      } `}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
