import CreateElection from "./pages/CreateElection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Result from "./pages/Result";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/voting/admin" element={<Home />} />
          <Route
            path="/voting/admin/createElection"
            element={<CreateElection />}
          />
          <Route path="/voting/admin/result" element={<Result />} />
          <Route path="/voting/admin/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
