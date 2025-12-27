import React, { useContext } from 'react';
import { AppContext } from '../App';
// Pastikan path ini sesuai dengan tempat Anda menyimpan file formatCurrency.js
import { formatRupiah } from '../utils/formatCurrency'; 

function ShopBagItem({ game, index }) {
    const { bag, setBag } = useContext(AppContext);

    const handleRemoveFromBag = (game) => {
        // Hapus item dari array bag berdasarkan ID
        setBag(bag.filter(item => item._id !== game._id));
    };

    // Hitung harga diskon (jika ada)
    const finalPrice = game.price - (game.price * game.discount);

    return (
        <tr className="shopBagItem">
            <th scope="row">{index + 1}</th>
            <td>
                <img 
                    src={game.img} 
                    alt={game.title} 
                    className="img-fluid table-img" 
                    style={{ width: '80px', borderRadius: '10px' }} 
                />
            </td>
            <td>{game.title}</td>
            
            {/* HARGA ASLI (Format Rupiah) */}
            <td>{formatRupiah(game.price)}</td>
            
            <td>{game.discount * 100}%</td>
            
            {/* HARGA AKHIR (Format Rupiah) */}
            <td>{formatRupiah(finalPrice)}</td>
            
            <td>
                <a href="#" onClick={() => handleRemoveFromBag(game)}>
                    <i className="bi bi-trash text-danger fs-4"></i>
                </a>
            </td>
        </tr>
    );
}

export default ShopBagItem;