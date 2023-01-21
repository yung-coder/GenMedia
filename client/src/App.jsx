import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from './scenes/LoginPage';
import HomePage from './scenes/HomePage';
import ProfilePage from './scenes/ProfilePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
