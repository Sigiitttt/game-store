import React, { useContext } from 'react';
import { AppContext } from '../App'; // 1. Import Context
import Header from '../components/Header';
import Home from './Home';
import Bag from './Bag'; // 2. Import halaman Bag
import MyLibrary from './MyLibrary';
import Categories from './Categories';

function Main({ active, toggleActive }) {
    // 3. Ambil variable 'section' dari Context
    // Variable ini isinya bisa 'home', 'bag', 'library', dll.
    const { section } = useContext(AppContext);

    return (
        <main className={`main ${active ? 'active' : ''}`}>
            {/* Header menerima fungsi toggleActive untuk tombol hamburger */}
            <Header toggleActive={toggleActive} />

            <div className="container-fluid">
                {/* 4. LOGIKA PERPINDAHAN HALAMAN */}
                {/* Jika section == 'home', tampilkan komponen Home */}
                {section === 'home' && <Home />}
                
                {/* Jika section == 'bag', tampilkan komponen Bag */}
                {section === 'bag' && <Bag />}
                
                {/* Nanti ditambahkan: section === 'library' && <MyLibrary /> */}
                {section === 'library' && <MyLibrary />}
                {section === 'categories' && <Categories />}
            </div>
        </main>
    );
}

export default Main;