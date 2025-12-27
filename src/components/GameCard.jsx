import React, { useContext } from 'react';
import { AppContext } from '../App';
import { formatRupiah } from '../utils/formatCurrency';

function GameCard({ game }) {
    // 1. Ambil data dan fungsi dari Context
    const { library, setLibrary, bag, setBag } = useContext(AppContext);

    const stars = Array.from({ length: game.rating }, (_, index) => index);
    const finalPrice = game.price - (game.price * game.discount);

    // 2. Logic Tombol LIKE (Heart)
    const handleAddToLibrary = (game) => {
        const isInLibrary = library.find(item => item._id === game._id);

        if (isInLibrary) {
            setLibrary(library.filter(item => item._id !== game._id));
        } else {
            setLibrary([...library, game]);
        }
    };

    // 3. Logic Tombol BAG (Cart)
    const handleAddToBag = (game) => {
        const isInBag = bag.find(item => item._id === game._id);

        if (isInBag) {
            // PERBAIKAN: Hapus baris 'setLibrary' yang salah disini!
            // Cukup update setBag saja.
            setBag(bag.filter(item => item._id !== game._id));
        } else {
            setBag([...bag, game]);
        }
    };

    return (
        <div className="col-xl-3 col-lg-4 col-md-6">
            {/* PERBAIKAN: Hapus span harga yang nyasar disini */}

            <div className="gameCard">
                <img src={game.img} alt={game.title} className="img-fluid" />

                {/* Tombol Like */}
                <a
                    href="#"
                    className={`like ${library.find(item => item._id === game._id) ? 'active' : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        handleAddToLibrary(game);
                    }}
                >
                    <i className="bi bi-heart-fill"></i>
                </a>

                <div className="gameFeature">
                    <span className="gameType">{game.category}</span>

                    <div className="gameRating">
                        {stars.map(star => <i key={star} className="bi bi-star-fill"></i>)}
                    </div>

                    <h4>{game.title}</h4>

                    {/* PERBAIKAN: Gunakan formatRupiah di sini */}
                    <div className="gamePrice">
                        {game.discount !== 0 && (
                            <>
                                <span className="discount">{game.discount * 100}%</span>
                                {/* Ganti $ dengan formatRupiah */}
                                <span className="prevPrice">{formatRupiah(game.price)}</span>
                            </>
                        )}
                        {/* Ganti $ dengan formatRupiah */}
                        <span className="currentPrice">{formatRupiah(finalPrice)}</span>
                    </div>

                    <a
                        href="#"
                        className="addBag"
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddToBag(game);
                        }}
                    >
                        <i className={`bi ${bag.find(item => item._id === game._id) ? 'bi-check-lg' : 'bi-bag-plus-fill'}`}></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default GameCard;