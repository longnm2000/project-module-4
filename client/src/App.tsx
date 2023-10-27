import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/user/login/LoginPage";
import NotFoundPage from "./pages/user/NotFound/NotFound";
import RegisterPage from "./pages/user/register/RegisterPage";
import HomePage from "./pages/user/home/HomePage";

function App() {
  return <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>;
}

export default App;