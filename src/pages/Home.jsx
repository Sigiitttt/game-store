import React, { useContext, useState, useEffect } from 'react'; // 1. Tambah useState & useEffect
import { AppContext } from '../App';
import GameSwiper from '../components/GameSwiper';
import GameCard from '../components/GameCard';
import GameFilter from '../components/GameFilter'; // Pastikan ini diimport

function Home() {
    // Ambil Master Data (Semua Game) dari Context
    const { games } = useContext(AppContext);

    // 2. Buat State untuk Data yang TAMPIL (Hasil Filter)
    const [gamesData, setGamesData] = useState([]);

    // 3. Saat pertama kali load, isi gamesData dengan SEMUA games
    useEffect(() => {
        setGamesData(games);
    }, [games]);

    // 4. Logika Filter
    const handleFilterGames = (category) => {
        if (category === 'All') {
            setGamesData(games); // Tampilkan semua
        } else {
            // Filter array berdasarkan kategori yang dipilih
            const filtered = games.filter(game => game.category === category);
            setGamesData(filtered);
        }
    };

    return (
        <section id="home" className="home active">
            <div className="container-fluid">

                {/* Banner Slider (Tetap tampilkan semua game unggulan) */}
                <div className="row mb-5">
                    <GameSwiper games={games} />
                </div>

                {/* Header Section + Filter */}
                <div className="row mb-4 mt-4 align-items-center">
                    <div className="col-lg-6">
                        <h2 className="sectionTitle">Games on Promotion</h2>
                    </div>
                    {/* 5. Ganti tombol 'View More' dengan GameFilter */}
                    <div className="col-lg-6 d-flex justify-content-end">
                        <GameFilter filterGames={handleFilterGames} />
                    </div>
                </div>

                {/* Daftar Kartu Game */}
                <div className="row">
                    {/* 6. PENTING: Map dari 'gamesData' (hasil filter), BUKAN 'games' */}
                    {gamesData && gamesData.length > 0 ? (
                        gamesData.map(game => (
                            <GameCard key={game._id} game={game} />
                        ))
                    ) : (
                        // Tampilkan pesan jika kategori kosong
                        <div className="col-12 text-center text-white mt-5">
                            <h3>No games found in this category.</h3>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
}

export default Home;