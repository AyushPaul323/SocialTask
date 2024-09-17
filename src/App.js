import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { FaInstagram, FaFacebook, FaTwitter, FaTelegram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYwYLkl6z3sptsJf5NUfCzDWkaS26SSHB0gw&s',
    'https://www.proideators.com/wp-content/uploads/2022/09/ProiDeators-Media-Referal-Program-Refer-and-Earn-Money.jpg',
    'https://t4.ftcdn.net/jpg/03/24/91/89/360_F_324918993_jRG7vew7aagtUfPGvvAdmyYKOQwtxtOW.jpg'
  ];

  useEffect(() => {
    let interval;
    if (!isPreviewing) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); // Change image every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPreviewing, images.length]);

  const handleClick = (index) => {
    setCurrentIndex(index);
    setIsPreviewing(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  };

  const handleClose = () => {
    setIsPreviewing(false);
    document.body.style.overflow = 'auto'; // Allow scrolling
  };

  const [progress, setProgress] = useState({
    Instagram: 50,
    Facebook: 30,
    Twitter: 20,
    Youtube: 10,
    Telegram: 40,
    LinkedIn: 15,
  });

  const calculateStrokeDasharray = (percent) => {
    const radius = 40; // Radius of the circle
    const circumference = 2 * Math.PI * radius;
    const dasharray = `${(percent / 100) * circumference} ${circumference}`;
    return dasharray;
  };

  const handleComplete = (task) => {
    // Update progress with animation
    setProgress(prevState => ({
      ...prevState,
      [task]: 100
    }));

    // Show success notification
    toast.success(`You have completed the ${task} task!`, {
      position: 'bottom-right', // Position for right-side appearance
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'toast-custom' // Custom class for styling
    });
  };

  return (
    <div className="app">
      <div className="banner1">
        <h2 className='gg'>Home</h2>
        <div className="header-stats">
          <span className="points-earned">3982</span>
          <span className="balance">₹28750.00</span>
          <span className="balance1">₹1000</span>
          <img src="https://via.placeholder.com/40" alt="Top Player" className="player-icon" />
        </div>
      </div>
           {/* Banner */}
      <div className="banner">
        <p>
          <FontAwesomeIcon icon={faStar} className="fa-star" />
          <span className="highlight">Earn 10 Points</span> for every successful referral on <span className="highlight">TaskPlanet</span>!
        </p>
      </div>

      {/* Wallet, Earnings, Referrals */}
      <div className="wallet-section">
        <div className="wallet-box">
          <i className="fas fa-wallet"></i>
          <p>Wallet</p>
          <span>₹2875.00</span>
        </div>
        <div className="earnings-box">
          <i className="fas fa-money-bill-wave"></i>
          <p>Earnings</p>
          <span>₹2875.00</span>
        </div>
        <div className="referrals-box">
          <i className="fas fa-users"></i>
          <p>Referrals</p>
          <span>2417</span>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="leaderboard">
        <div className="carousel-container">
          <div className="carousel" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
            {images.map((src, index) => (
              <div key={index} className="carousel-item" onClick={() => handleClick(index)}>
                <img src={src} alt={`Leaderboard ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Overlay for image preview */}
        {isPreviewing && (
          <div className="overlay" onClick={handleClose}>
            <div className="overlay-content">
              <img src={images[currentIndex]} alt={`Enlarged ${currentIndex + 1}`} />
            </div>
          </div>
        )}
      </div>

      {/* Social Media Tasks */}
      <div className="social-media-task">
      <div className="banner">
        <p>
          <FontAwesomeIcon icon={faStar} className="fa-star" />
          <span className="highlight">Earn through Social </span>Media Tasks!<span className="highlight"></span>
        </p>
      </div>
        <div className="task-grid">
          {Object.keys(progress).map((task) => (
            <div className="task" key={task}>
              {task === 'Instagram' && <FaInstagram className="icon" style={{ color: '#C13584' }} />}
              {task === 'Facebook' && <FaFacebook className="icon" style={{ color: '#1877F2' }} />}
              {task === 'Twitter' && <FaTwitter className="icon" style={{ color: '#1DA1F2' }} />}
              {task === 'Youtube' && <FaYoutube className="icon" style={{ color: '#FF0000' }} />}
              {task === 'Telegram' && <FaTelegram className="icon" style={{ color: '#0088CC' }} />}
              {task === 'LinkedIn' && <FaLinkedin className="icon" style={{ color: '#0077B5' }} />}
              <p>{task}</p>
              <div className="progress-circle">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="progress-bg"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="progress"
                    strokeDasharray={calculateStrokeDasharray(progress[task])}
                  />
                  <text
                    x="50%"
                    y="50%"
                    className="percentage"
                    dominantBaseline="middle"
                    textAnchor="middle"
                  >
                    {progress[task]}%
                  </text>
                </svg>
              </div>
              <button className="complete-btn" onClick={() => handleComplete(task)}>
                Complete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="footer">
        <div className="footer-content">
          <button className="nav-button"><i className="fas fa-home"></i></button>
          <button className="nav-button"><i className="fas fa-pencil"></i></button>
          <button className="nav-button"><i className="fas fa-plus"></i></button>
          <button className="nav-button"><i className="fas fa-cog"></i></button>
          <button className="nav-button"><i className="fas fa-trophy"></i></button>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default App;
