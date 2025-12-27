import React, { useState, useEffect, useContext } from 'react';
import ShopBagItem from '../components/ShopBagItem';
import { AppContext } from '../App';
// 1. IMPORT formatRupiah
import { formatRupiah } from '../utils/formatCurrency'; 

function Bag() {
    const { bag } = useContext(AppContext);
    const [total, setTotal] = useState(0);

    // Hitung Total Harga setiap kali isi 'bag' berubah
    useEffect(() => {
        const newTotal = bag.reduce((acc, game) => {
            // Rumus: Harga Asli - (Harga Asli * Diskon)
            return acc + (game.price - (game.price * game.discount));
        }, 0);
        setTotal(newTotal);
    }, [bag]);

    return (
        <section id="bag" className="bag section">
            <div className="container-fluid">
                <div className="row mb-3">
                    <h1>My Bag</h1>
                </div>

                {/* Jika keranjang kosong */}
                {bag.length === 0 ? (
                    <div className="empty-message">
                        <h2>Your bag is empty</h2>
                        <a href="#" className="btn btn-primary mt-3">Go Shopping</a>
                    </div>
                ) : (
                    /* Jika ada isinya */
                    <>
                        <div className="row">
                            <div className="table-responsive">
                                <table className="table shopping-cart-table table-borderless align-middle">
                                    <thead>
                                        <tr>
                                            <th scope="col">No</th>
                                            <th scope="col">Preview</th>
                                            <th scope="col">Game</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Discount</th>
                                            <th scope="col">Payment</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bag.map((game, index) => (
                                            <ShopBagItem key={game._id} index={index} game={game} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Bagian Total & Checkout */}
                        <div className="row mt-5">
                            <div className="col-lg-6 d-flex justify-content-start align-items-center">
                                <h3 className="text-white">Total Items: {bag.length}</h3>
                            </div>
                            <div className="col-lg-6 d-flex justify-content-end align-items-center gap-3">
                                {/* 2. GANTI FORMAT TOTAL HARGA DISINI */}
                                <h3 className="text-white">
                                    Total Payment: <span className="text-primary">{formatRupiah(total)}</span>
                                </h3>
                                <a href="#" className="btn btn-primary btn-lg">Checkout</a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Bag;