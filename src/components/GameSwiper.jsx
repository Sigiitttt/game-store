import React, { useState } from 'react';
// 1. Import Swiper & SwiperSlide
import { Swiper, SwiperSlide } from 'swiper/react';

// 2. Import CSS Swiper (Wajib)
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 3. Import Modul yang dibutuhkan
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';


function GameSwiper({ games }) {
    // State untuk menangani play/pause video (opsional, sesuai CSS kamu sebelumnya)
    const [activeVideo, setActiveVideo] = useState(null);

    const handleToggleVideo = (id) => {
        setActiveVideo(activeVideo === id ? null : id);
    };

    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}           // ✅ FITUR 1: Kursor jadi tangan (bisa digeser)
            centeredSlides={true}       // Slide aktif ada di tengah
            slidesPerView={'auto'}      // Ukuran otomatis menyesuaikan CSS
            loop={true}                 // ✅ FITUR 2: Loop tak terbatas
            spaceBetween={30}

            // Pengaturan Efek 3D
            coverflowEffect={{
                rotate: 35,
                stretch: 200,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            }}

            // ✅ FITUR 3: Autoplay Pintar
            autoplay={{
                delay: 2500,                // Geser setiap 2.5 detik
                disableOnInteraction: false, // PENTING: Autoplay lanjut lagi setelah user geser manual
            }}

            // Navigasi (Titik & Panah)
            pagination={{ clickable: true }}
            navigation={true}

            modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
            className="gameSwiper"
        >
            {/* Mapping Data Games */}
            {games.map(game => (
                <SwiperSlide key={game._id}>
                    <div className="gameSlider">
                        <div className={`imgBox ${activeVideo === game._id ? 'active' : ''}`}>
                            <img src={game.img} alt={game.title} />
                            {/* Jika ada video ID, load iframe Youtube */}
                            {game.video && (
                                <iframe
                                    width="100%"
                                    height="100%"
                                    src={`https://www.youtube.com/embed/${game.video}?enablejsapi=1&controls=0&rel=0`}
                                    title={game.title}
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            )}
                        </div>

                        <div className="content">
                            <h2>{game.title}</h2>
                            <p>{game.description}</p>
                            <div className="buttons">
                                <a href="#" className="orderBtn">Order Now</a>
                                <a
                                    href="#"
                                    className={`playBtn ${activeVideo === game._id ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleToggleVideo(game._id);
                                    }}
                                >
                                    <span className="play">
                                        <i className="bi bi-play-fill"></i> Play Trailer
                                    </span>
                                    <span className="pause">
                                        <i className="bi bi-pause-fill"></i> Stop Video
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default GameSwiper;