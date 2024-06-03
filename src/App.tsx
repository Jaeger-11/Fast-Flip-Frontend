import { 
  BrowserRouter,
  Routes,
  Route
 } from 'react-router-dom';
import './App.css'
import Landing from './pages/Landing'
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import Home from './pages/Home';
import Gameplay from './pages/Gameplay';
import Protected from './components/Protected';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected>
          <Home/>
        </Protected>} />
        {/* <Route path='/' element={<Home/>} /> */}
        <Route path='/landing' element={<Landing/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/gameplay' element={<Protected>
          <Gameplay/>
        </Protected>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
