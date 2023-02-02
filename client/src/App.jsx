import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import HomePage from "./scenes/HomePage";
import ProfilePage from "./scenes/ProfilePage";
import { useSelector} from "react-redux";
import Login from "./scenes/Login";
import Register from "./scenes/Register";
import Welcome from "./scenes/Welcome";

function App() {
  const mode = useSelector((state) => state.mode);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div
      className={`min-h-screen w-screen overflow-x-hidden ${
        mode === "light" ? "bg-gray-200" : "bg-[#181818]"
      } `}
    >
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
    </div>
  );
}

export default App;
