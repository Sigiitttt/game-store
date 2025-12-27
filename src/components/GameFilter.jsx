import React, { useState } from 'react';
// import './GameFilter.css'; // Opsional jika CSS dipisah

function GameFilter({ filterGames }) {
    // Daftar kategori (sesuai yang ada di JSON Anda)
    const [filterList, setFilterList] = useState([
        { _id: 1, name: 'All', active: true },
        { _id: 2, name: 'RPG', active: false },
        { _id: 3, name: 'MOBA', active: false },
        { _id: 4, name: 'Action', active: false },
        { _id: 5, name: 'Racing', active: false },
    ]);

    const handleFilterChange = (id, name) => {
        // 1. Ubah tampilan tombol aktif
        const newFilterList = filterList.map(filter => {
            filter.active = false;
            if (filter._id === id) filter.active = true;
            return filter;
        });
        setFilterList(newFilterList);

        // 2. Panggil fungsi filter di Home.jsx
        filterGames(name);
    };

    return (
        <div className="filter-box">
            <ul className="filter-list">
                {filterList.map(filter => (
                    <li key={filter._id}>
                        <button
                            className={`filter-btn ${filter.active ? 'active' : ''}`}
                            onClick={() => handleFilterChange(filter._id, filter.name)}
                        >
                            {filter.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GameFilter;