import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import { Link, Route, Routes } from 'react-router-dom';
import Analytics_page from './components/Analytics_page/Analytics_page';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/analyticsPage' element={<Analytics_page />} />
      </Routes>
    </div>
  );
}

export default App;
