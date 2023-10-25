import './App.css';
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import About from './components/About/About';
import ExploreData from './components/ExploreData/ExploreData';
import Footer from './components/Footer/Footer';
import Pan from './components/Pan';
import { Link, Route, Routes } from 'react-router-dom';
import Analytics_page from './components/Analytics_page/Analytics_page';
import { useState, useEffect } from 'react';

function App() {
    // // Initialize the 'topics' state using local storage or an empty Set
    // const [topics, setTopics] = useState(() => {
    //   // Attempt to retrieve 'topics' from local storage, or provide an empty Set if not found
    //   const storedTopics = localStorage.getItem('topics');
    //   return storedTopics ? new Set(JSON.parse(storedTopics)) : new Set();
    // });
  
    // // Use 'useEffect' to save the 'topics' state to local storage whenever it changes
    // useEffect(() => {
    //   localStorage.setItem('topics', JSON.stringify(Array.from(topics)));
    // }, [topics]);
  
    // console.log(topics, "global");

    const [topics, setTopics] = useState(new Set());

    const [isDataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
      const storedTopics = localStorage.getItem('topics');
      if (storedTopics) {
        setTopics(new Set(JSON.parse(storedTopics)));
      } else {
        setTopics(new Set()); // Set to an empty set if there's no data
      }
      setDataLoaded(true); // Mark the data as loaded
    }, []);

  useEffect(() => {
    // Save 'topics' to local storage whenever it changes
    localStorage.setItem('topics', JSON.stringify(Array.from(topics)));
  }, [topics]);

  console.log(topics, "global");
  
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home topics={topics} setTopics={setTopics} isDataLoaded={isDataLoaded}/>} />
        <Route path='/analyticsPage' element={<Analytics_page />} />
        <Route path='/about' element={<Pan />} />
        <Route path='/exploreData' element={<ExploreData />} />
      </Routes>
    </div>
  );
}

export default App;
