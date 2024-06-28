import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const fadeImages = [
  {
    url: 'https://quotefancy.com/media/wallpaper/3840x2160/245458-Ren-Descartes-Quote-The-reading-of-all-good-books-is-like-a.jpg',
    
  },
  {
    url: 'https://quotefancy.com/media/wallpaper/3840x2160/307792-James-Patterson-Quote-If-you-re-not-reading-with-your-heart-as.jpg',
   
  },
  {
    url: 'https://quotefancy.com/media/wallpaper/3840x2160/4744474-Orhan-Pamuk-Quote-I-read-a-book-one-day-and-my-whole-life-was.jpg',
   
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container" style={containerStyle}>
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index} style={slideStyle}>
            <img style={imageStyle} src={fadeImage.url} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Fade>
    </div>
  );
}

const containerStyle = {
  width: '90%',
  margin: '0 auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: '10px',
  overflow: 'hidden',
};

const slideStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: '#000',
  color: '#fff',
};

const imageStyle = {
  width: '100%',
  height: '600px',
  backgroundSize: 'cover',
};



export default Slideshow;
