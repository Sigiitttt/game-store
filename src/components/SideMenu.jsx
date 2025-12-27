import React, { useState, useContext } from 'react'; // 1. Tambah useContext disini
import { AppContext } from '../App';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';

function SideMenu({ active }) {
    // Ambil fungsi setSection dari Context untuk ganti halaman
    const { setSection } = useContext(AppContext); 
    
    // State lokal untuk mengatur visual tombol (warna aktif)
    const [navData, setNavData] = useState(navListData);

    // Fungsi saat menu diklik (Menerima ID dan TARGET)
    const handleNavOnClick = (id, target) => {
        // 1. Ubah Visual Active State (Agar warna tombol berubah)
        const newNavData = navData.map(nav => {
            nav.active = false;
            if (nav._id === id) nav.active = true;
            return nav;
        });
        setNavData(newNavData);

        // 2. Ubah Halaman Utama (PENTING!)
        // Ini akan mengubah state 'section' di App.jsx -> Main.jsx merespon
        setSection(target); 
    };

    return (
        <div className={`side-menu ${active ? 'active' : ''}`}>
            <a href="#" className="logo">
                <i className="bi bi-controller"></i>
                <span className="brand">PlayStore</span>
            </a>

            <ul className="nav">
                {navData.map(item => (
                    <NavListItem
                        key={item._id}
                        item={item}
                        // Kirim ID dan TARGET saat diklik
                        navOnClick={() => handleNavOnClick(item._id, item.target)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default SideMenu;