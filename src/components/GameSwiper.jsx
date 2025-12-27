import React, { useState } from 'react';
// Import Swiper & SwiperSlide
import { Swiper, SwiperSlide } from 'swiper/react';

// Import CSS Swiper
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Modul
import { EffectCoverflow, Autoplay, Navigation, Pagination } from 'swiper/modules';

import './GameSwiper.css';

function GameSwiper({ games }) {
  // State untuk video aktif
  const [activeVideo, setActiveVideo] = useState(null);
  
  // 1. State untuk menyimpan "Remote Control" Swiper
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleToggleVideo = (id) => {
    if (activeVideo === id) {
      // KONDISI: Video Dimatikan (Stop Video)
      setActiveVideo(null);
      
      // Nyalakan kembali slider otomatis
      if (swiperInstance) {
        swiperInstance.autoplay.start();
      }
    } else {
      // KONDISI: Video Dinyalakan (Play Trailer)
      setActiveVideo(id);
      
      // Matikan slider otomatis agar tidak geser
      if (swiperInstance) {
        swiperInstance.autoplay.stop();
      }
    }
  };

  return (
    <Swiper
      // 2. Tangkap instance swiper saat pertama kali render
      onSwiper={(swiper) => setSwiperInstance(swiper)}
      
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      loop={true}
      spaceBetween={30}
      coverflowEffect={{
        rotate: 35,
        stretch: 200,
        depth: 250,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
      className="gameSwiper"
    >
      {games.map(game => (
        <SwiperSlide key={game._id}>
          <div className="gameSlider">
            <div className={`imgBox ${activeVideo === game._id ? 'active' : ''}`}>
              <img src={game.img} alt={game.title} />
              
              {/* VIDEO YOUTUBE */}
              {game.video && (
                <iframe
                  width="100%"
                  height="100%"
                  // 3. TAMBAHKAN LOGIC AUTOPLAY DI URL
                  // Jika video aktif, tambahkan &autoplay=1
                  src={`https://www.youtube.com/embed/${game.video}?enablejsapi=1&rel=0&controls=0${activeVideo === game._id ? '&autoplay=1' : ''}`}
                  title={game.title}
                  // Izin autoplay browser
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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