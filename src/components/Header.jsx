import React, { useContext } from 'react'; // Import useContext
import { AppContext } from '../App'; // Import Context dari App

function Header({ toggleActive }) {
    // Ambil data library dan bag dari Context
    const { library, bag } = useContext(AppContext);

    return (
        <header>
            <a href="#" className="menu" onClick={toggleActive}>
                <i className="bi bi-list" style={{ fontSize: '2rem', color: '#fff' }}></i>
            </a>

            <div className="userItems">
                <a href="#" className="icon">
                    <i className="bi bi-heart-fill"></i>
                    {/* Tampilkan jumlah item di library */}
                    <span className="like">{library.length}</span>
                </a>
                <a href="#" className="icon">
                    <i className="bi bi-bag-fill"></i>
                    {/* Tampilkan jumlah item di bag */}
                    <span className="bag">{bag.length}</span>
                </a>
                <div className="avatar">
                    <a href="#">
                        <i className="bi bi-person-circle" style={{ fontSize: '1.8rem', color: '#fff' }}></i>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Header;