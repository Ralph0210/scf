import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { Link, Route, Routes } from 'react-router-dom';
import Analytics from './components/Analytics/Analytics';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analytics' element={<Analytics />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
