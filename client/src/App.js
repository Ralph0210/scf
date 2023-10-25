import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import About from './components/About/About';
import ExploreData from './components/ExploreData/ExploreData';
import Footer from './components/Footer/Footer';
import Pan from './components/Pan';
import { Link, Route, Routes } from 'react-router-dom';
import Analytics_page from './components/Analytics_page/Analytics_page';
import { useState } from 'react';

function App() {
  const [interests, setInterests] = useState(new Set())
  console.log(interests)
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home setInterests={setInterests}/>} />
        <Route path='/analyticsPage' element={<Analytics_page />} />
        <Route path='/about' element={<Pan />} />
        <Route path='/exploreData' element={<ExploreData />} />
      </Routes>
    </div>
  );
}

export default App;
