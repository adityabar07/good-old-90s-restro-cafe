import React, { useState, useEffect } from 'react';
import './App.css';
import RestroMenu from './components/RestroMenu';

const GALLERY_IMAGES = [
  { title: 'Cafe Interior', url: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=800&auto=format&fit=crop' },
  { title: 'Signature Dishes', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop' },
  { title: 'Family Moments', url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop' },
  { title: 'Coffee Counter', url: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop' },
  { title: 'Live Kitchen', url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop' },
  { title: 'Outdoor Seating', url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=800&auto=format&fit=crop' },
  { title: 'Cafe Ambience', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop' },
  { title: 'Food Presentation', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop' }
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Scroll event to add background to Navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  };

  const handleNavClick = (selector) => {
    playClickSound();
    setIsNavOpen(false);
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* ==========================================
           NAVBAR
         ========================================== */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
            <span className="logo-badge"><span>90</span></span>
            <span className="logo-text">
              <b>GOOD OLD</b>
              <small>Restro Cafe</small>
            </span>
          </a>

          <ul className={`nav-links ${isNavOpen ? 'open' : ''}`}>
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>Home</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}>About</a></li>
            <li><a href="#menu" onClick={(e) => { e.preventDefault(); handleNavClick('#menu'); }}>Menu</a></li>
            <li><a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}>Gallery</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>Contact</a></li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button 
              className="btn btn-outline"
              onClick={() => handleNavClick('#contact')}
              style={{ padding: '8px 20px', fontSize: '0.8rem' }}
            >
              Get in Touch
            </button>
            <button 
              className={`hamburger ${isNavOpen ? 'open' : ''}`} 
              onClick={() => { playClickSound(); setIsNavOpen(!isNavOpen); }}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* ==========================================
           HERO SECTION
         ========================================== */}
      <header className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        
        {/* Slow Spinning Vinyl Record */}
        <div className="hero-vinyl" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="98" fill="#120d09" stroke="#4a2f1e" strokeWidth="2"/>
            <circle cx="100" cy="100" r="80" fill="none" stroke="#3a281a" strokeWidth="1"/>
            <circle cx="100" cy="100" r="65" fill="none" stroke="#3a281a" stroke-width="1"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="#3a281a" stroke-width="1"/>
            <circle cx="100" cy="100" r="34" fill="#e2711d"/>
            <circle cx="100" cy="100" r="6" fill="#17110c"/>
          </svg>
        </div>

        <div className="container hero-content">
          <p className="hero-tagline">— Est. 1998, still slappin' —</p>
          <h1 className="hero-title">
            GOOD OLD <span>90s</span><br/>
            Restro Cafe
          </h1>
          <p className="hero-sub">
            Where every bite brings back memories — vintage vibes, wood-fired flavours, and a menu built on old family recipes.
          </p>
          <div className="hero-btns">
            <button 
              className="btn btn-primary"
              onClick={() => handleNavClick('#menu')}
            >
              Explore Menu
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => handleNavClick('#contact')}
            >
              Contact Us
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
           ABOUT SECTION
         ========================================== */}
      <section className="section" id="about">
        <div className="container about-grid">
          {/* Main frame representing diner warmth */}
          <div className="about-media">
            <div className="about-badge">EST. 1998<br/>SINCE THE 90s</div>
            <div className="frame-main ambient-light-glow">
              <div className="frame-main-content">
                <div className="frame-main-icon">☕</div>
                <h3 className="frame-main-title">A Taste of the Past</h3>
                <p className="frame-main-desc">
                  Step inside our cozy dining corner filled with warm wood accents, frothed coffee, and retro tracks.
                </p>
              </div>
            </div>
          </div>

          <div className="about-content">
            <p className="eyebrow">Our Story</p>
            <h2 className="section-title">A slice of the <em>90s</em>, served warm every single day</h2>
            <p className="section-desc">
              Good Old 90s Restro Cafe began as a tiny corner kitchen run by three cousins who missed the taste of their grandmother's cooking and the sound of cassette tapes on a Sunday afternoon. We still grind our own spices, pour coffee the slow way, and believe a meal should feel like coming home.
            </p>

            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ borderLeft: '3px solid var(--orange)', paddingLeft: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream-soft)', fontSize: '1.1rem' }}>Our Mission</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(244, 233, 212, 0.7)', marginTop: '4px' }}>
                  To serve fresh, premium quality food frothed in warmth and vintage memories, creating a cozy home away from home for every guest.
                </p>
              </div>
              <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--cream-soft)', fontSize: '1.1rem' }}>Our Vision</h4>
                <p style={{ fontSize: '0.9rem', color: 'rgba(244, 233, 212, 0.7)', marginTop: '4px' }}>
                  To be the ultimate space for every generation to experience nostalgia, wood-fired flavors, and old-school hospitality.
                </p>
              </div>
            </div>

            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">🥗</div>
                <div>
                  <h4>Fresh Ingredients</h4>
                  <p>Sourced daily from local farmers &amp; trusted vendors.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📼</div>
                <div>
                  <h4>Nostalgic Dining</h4>
                  <p>Retro decor, old-school playlists &amp; classic flavours.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🏠</div>
                <div>
                  <h4>Family Vibe</h4>
                  <p>A warm, welcoming space for every generation.</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🍔</div>
                <div>
                  <h4>Premium Food</h4>
                  <p>Recipes passed down, never a shortcut taken.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           MENU SECTION
         ========================================== */}
      <section className="section menu-section" id="menu">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Our Menu</p>
            <h2 className="section-title">Flavours that hit <em>different</em></h2>
            <p className="section-desc">
              Browse through our complete collection of starters, main courses, hot brews, and desserts. Select a category below:
            </p>
          </div>

          <div>
            <RestroMenu />
          </div>
        </div>
      </section>

      {/* ==========================================
           GALLERY SECTION (EMPTY FRAMES)
         ========================================== */}
      <section className="section" id="gallery">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Gallery</p>
            <h2 className="section-title">Moments worth <em>savouring</em></h2>
            <p className="section-desc">
              A peek into our seating zones, live kitchens, and community stories. Click on any frame to view in full.
            </p>
          </div>

          <div className="gallery-masonry">
            {GALLERY_IMAGES.map((img, i) => (
              <div 
                key={i} 
                className="gallery-masonry-item"
                onClick={() => { playClickSound(); setLightboxImg(img.url); }}
              >
                <img src={img.url} alt={img.title} className="gallery-masonry-img" />
                <div className="gallery-item-caption">
                  <span>{img.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxImg && (
          <div className="lightbox-backdrop" onClick={() => setLightboxImg(null)}>
            <button className="lightbox-close-btn" onClick={() => setLightboxImg(null)}>×</button>
            <img src={lightboxImg} alt="Enlarged view" className="lightbox-img" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </section>

      {/* ==========================================
           CONTACT SECTION
         ========================================== */}
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">Visit Us</p>
            <h2 className="section-title">Come, pull up a <em>chair</em></h2>
            <p className="section-desc">
              Walk-ins are always welcome. Find our address and timing details below.
            </p>
          </div>

          <div className="contact-layout">
            <div className="contact-details-grid">
              <div className="contact-card">
                <div className="contact-icon-box"><i className="fa-solid fa-location-dot"></i></div>
                <div className="contact-card-content">
                  <h4>Address</h4>
                  <p>7/2, Jessore Road, Sethpukur, Barasat, Kolkata, West Bengal - 700124</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon-box"><i className="fa-solid fa-phone"></i></div>
                <div className="contact-card-content">
                  <h4>Phone Number</h4>
                  <p>+91 90384 74339</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon-box"><i className="fa-brands fa-whatsapp"></i></div>
                <div className="contact-card-content">
                  <h4>WhatsApp Number</h4>
                  <p>+91 90384 74339</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon-box"><i className="fa-solid fa-envelope"></i></div>
                <div className="contact-card-content">
                  <h4>Email Address</h4>
                  <p>hello@goodold90scafe.com</p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon-box"><i className="fa-solid fa-clock"></i></div>
                <div className="contact-card-content">
                  <h4>Opening Hours</h4>
                  <p>Mon – Sun: 11:00 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="contact-card" style={{ flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--cream-soft)', fontWeight: '600' }}>Social Media Connect</h4>
                <div className="contact-social-row">
                  <a href="#facebook" className="contact-social-link" onClick={(e) => { e.preventDefault(); playClickSound(); }} aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#instagram" className="contact-social-link" onClick={(e) => { e.preventDefault(); playClickSound(); }} aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
                </div>
              </div>
            </div>

            {/* Google Maps Embed iframe */}
            <div className="map-embed-container" style={{ width: '100%', minHeight: '320px' }}>
              <iframe
                title="Good Old 90s Restro Cafe Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.124564878232!2d88.4829604!3d22.71476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f8a3ac77616ca5%3A0xad1a8ffa086b9db1!2sGood%20Old%2090s%20Restro%20Cafe!5e0!3m2!1sen!2sin!4v1721495474000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', minHeight: '320px', background: 'var(--espresso)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
           FOOTER
         ========================================== */}
      <footer className="retro-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>
                <span className="logo-badge"><span>90</span></span>
                <span className="logo-text"><b>GOOD OLD</b><small>Restro Cafe</small></span>
              </a>
              <p>
                A nostalgic 90s diner reborn as a premium cafe. Fresh food, warm wood, and memories on every plate since 1998.
              </p>
            </div>

            <div className="footer-col">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('#about'); }}>About Us</a></li>
                <li><a href="#menu" onClick={(e) => { e.preventDefault(); handleNavClick('#menu'); }}>Our Menu</a></li>
                <li><a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('#gallery'); }}>Gallery</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}>Contact</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Contact Info</h5>
              <ul style={{ color: 'rgba(244, 233, 212, 0.65)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>7/2, Jessore Road, Barasat, Kolkata - 700124</li>
                <li>+91 90384 74339</li>
                <li>hello@goodold90scafe.com</li>
              </ul>
            </div>

            <div className="footer-col">
              <h5>Hours</h5>
              <div className="footer-hours-row">
                <span>Mon – Sun</span>
                <span>11 AM – 10 PM</span>
              </div>
              <div className="contact-social-row" style={{ marginTop: '15px' }}>
                <a href="#facebook" className="contact-social-link" onClick={(e) => { e.preventDefault(); playClickSound(); }}><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#instagram" className="contact-social-link" onClick={(e) => { e.preventDefault(); playClickSound(); }}><i className="fa-brands fa-instagram"></i></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} <span>Good Old 90s Restro Cafe</span>. All rights reserved. Made with nostalgia &amp; butter.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button 
        className="to-top-btn" 
        onClick={() => handleNavClick('#home')}
        aria-label="Back to top"
      >
        ▲
      </button>
    </div>
  );
}

export default App;
