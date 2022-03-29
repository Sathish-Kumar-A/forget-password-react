import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Login } from "./Login page/Login";
import { FP } from "./Forgot password/FP";
import { Register } from "./New User/Register";
import { NP } from "./NP/NP";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="components">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotpassword" element={<FP />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newpassword" element={<NP />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
