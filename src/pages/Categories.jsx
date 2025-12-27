import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../App';
import GameCard from '../components/GameCard';

function Categories() {
    const { games } = useContext(AppContext);
    
    // State untuk data yang tampil & kategori yang aktif
    const [data, setData] = useState([]);
    const [activeCat, setActiveCat] = useState('All');

    // Daftar Kategori Manual (Bisa juga diambil unik dari data games)
    const categories = ['All', 'RPG', 'MOBA', 'Action', 'Racing', 'Adventure'];

    // Load data awal
    useEffect(() => {
        setData(games);
    }, [games]);

    // Fungsi Filter
    const handleCategoryChange = (category) => {
        setActiveCat(category);
        if (category === 'All') {
            setData(games);
        } else {
            setData(games.filter(game => game.category === category));
        }
    };

    return (
        <section id="categories" className="categories section">
            <div className="container-fluid">
                <div className="row mb-5">
                    <div className="col-12">
                        <h1 className="text-white">Game Categories</h1>
                    </div>
                </div>

                <div className="row">
                    {/* KOLOM KIRI: Daftar Kategori (Menu Tab) */}
                    <div className="col-lg-2 col-md-3 mb-4">
                        <ul className="category-list">
                            {categories.map((cat, index) => (
                                <li key={index}>
                                    <button 
                                        className={`cat-btn ${activeCat === cat ? 'active' : ''}`}
                                        onClick={() => handleCategoryChange(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* KOLOM KANAN: Daftar Game */}
                    <div className="col-lg-10 col-md-9">
                        <div className="row">
                            {data.length > 0 ? (
                                data.map(game => (
                                    <GameCard key={game._id} game={game} />
                                ))
                            ) : (
                                <div className="col-12 text-center text-white">
                                    <h3>No games found in {activeCat} category.</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Categories;