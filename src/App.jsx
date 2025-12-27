import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';


import SideMenu from './components/SideMenu';
import Main from './pages/Main';

// 1. BUAT CONTEXT (Agar bisa diakses di mana saja)
export const AppContext = React.createContext();

// ... import lainnya

function App() {
  const [active, setActive] = useState(false);
  const [section, setSection] = useState('home');

  // 1. UPDATE STATE: Cek LocalStorage dulu saat pertama buka
  // Kalau ada data simpanan, pakai itu. Kalau tidak ada, pakai array kosong [].
  const [library, setLibrary] = useState(() => {
    const saved = localStorage.getItem('library');
    return saved ? JSON.parse(saved) : [];
  });

  const [bag, setBag] = useState(() => {
    const saved = localStorage.getItem('bag');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [games, setGames] = useState([]);

  const handleToggleActive = () => {
    setActive(!active);
  };

  const fetchData = () => {
    // fetch('http://localhost:5173/api/gameData.json')
    fetch('/api/gameData.json')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. TAMBAHKAN USE EFFECT BARU:
  // Setiap kali 'library' atau 'bag' berubah, SIMPAN ke LocalStorage browser
  useEffect(() => {
    localStorage.setItem('library', JSON.stringify(library));
    localStorage.setItem('bag', JSON.stringify(bag));
  }, [library, bag]);

  return (
    <AppContext.Provider value={{ games, setGames, library, setLibrary, bag, setBag, section, setSection }}>
      <div className="App">
        <SideMenu active={active} />
        <Main active={active} toggleActive={handleToggleActive} />
      </div>
    </AppContext.Provider>
  );
}

export default App;
