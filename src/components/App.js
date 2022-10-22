import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from "../hooks";
import { Home, Login, SignUp } from '../pages';
import { Loader, Navbar } from './';


const Page404 = () => {
  return <h1> 404 </h1>
}

function App() {

  const auth = useAuth();

  if (auth.loading) {
    return <Loader />
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
