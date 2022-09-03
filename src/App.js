import CreateElection from "./pages/CreateElection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Result from "./pages/Result";
import Login from "./pages/Login";
import { useLoginContext } from "./hooks/useLoginContext";
import Layout from "./pages/Layout";

function App() {
  const user = useLoginContext();
  console.log(user.user);
  return (
    <div className="App">
      {!user.user && <Login />}
      {user.user && (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="createElection" element={<CreateElection />} />
              <Route path="result" element={<Result />} />
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
