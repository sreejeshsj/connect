import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Sidebar from './components/Sidebar'

import HomeFeed from './components/HomeFeed';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
function App() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sidebar" element={<Sidebar />} />
            <Route path="/home-feed" element={<HomeFeed />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>

      
    </div>
  );
}

export default App
