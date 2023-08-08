import './App.css';
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero';
import Instruction1 from './components/Instruction1/Instruction1';
import Interests from './components/Interests/Interests';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Instruction1 />
      <Interests />
    </div>
  );
}

export default App;
