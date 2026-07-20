import React, { useState } from 'react';

const MENU_DATA = {
  starters: [
    { name: 'Paneer Tikka Dry', price: 239, img: '/images/menu/paneer-tikka.jpg' },
    { name: 'Chicken Roast', price: 279, img: '/images/menu/chicken-roast.jpg' },
    { name: 'Fish & Chips', price: 295, img: '/images/menu/fish-chips.jpg' },
    { name: 'Cheese Corn Balls', price: 199, img: '/images/menu/cheese-corn-balls.jpg' },
    { name: 'Peri Peri Fries Basket', price: 149, img: '/images/menu/peri-peri-fries.jpg' }
  ],
  soups: [
    { name: 'Hot & Sour Chicken Soup', price: 149, img: '/images/menu/hot-sour-soup.jpg' },
    { name: 'Manchow Soup', price: 139, img: '/images/menu/manchow-soup.jpg' }
  ],
  chinese: [
    { name: 'Chilli Garlic Noodles', price: 229, img: '/images/menu/chilli-garlic-noodles.jpg' },
    { name: 'Paneer Chilli Dry', price: 239, img: '/images/menu/paneer-chilli-dry.jpg' },
    { name: 'Dragon Chicken', price: 269, img: '/images/menu/dragon-chicken.jpg' }
  ],
  indian: [
    { name: 'Paneer Butter Masala', price: 269, img: '/images/menu/paneer-butter-masala.jpg' },
    { name: 'Fish Butter Masala', price: 349, img: '/images/menu/fish-butter-masala.jpg' },
    { name: 'Mutton Kasha', price: 389, img: '/images/menu/mutton-kasha.jpg' }
  ],
  tandoor: [
    { name: 'Malai Soya Chaap', price: 259, img: '/images/menu/malai-soya-chaap.jpg' },
    { name: 'Tandoori Naan', price: 59, img: '/images/menu/tandoori-naan.jpg' }
  ],
  biryani: [
    { name: 'Basanti Pulao', price: 189, img: '/images/menu/basanti-pulao.jpg' },
    { name: 'Mutton Dum Biryani', price: 399, img: '/images/menu/mutton-biryani.jpg' }
  ],
  pizza: [
    { name: 'Double Cheese Pizza', price: 349, img: '/images/menu/double-cheese-pizza.jpg' }
  ],
  burger: [
    { name: 'Cheeseburger', price: 189, img: '/images/menu/cheeseburger.jpg' }
  ],
  sandwich: [
    { name: 'Paneer Tikka Sandwich', price: 159, img: '/images/menu/paneer-sandwich.jpg' }
  ],
  pasta: [
    { name: 'Smoked Alfredo Penne', price: 289, img: '/images/menu/alfredo-pasta.jpg' }
  ],
  momos: [
    { name: 'Steamed Veg Momos', price: 119, img: '/images/menu/veg-momos.jpg' }
  ],
  rolls: [
    { name: 'Chicken Roll', price: 139, img: '/images/menu/chicken-roll.jpg' }
  ],
  fried_rice: [
    { name: 'Egg Fried Rice', price: 199, img: '/images/menu/egg-fried-rice.jpg' }
  ],
  noodles: [
    { name: 'Chilli Garlic Hakka Noodles', price: 229, img: '/images/menu/hakka-noodles.jpg' }
  ],
  snacks: [
    { name: 'Omelette Platter', price: 135, img: '/images/menu/omelette-platter.jpg' },
    { name: 'Bun Maska', price: 85, img: '/images/menu/bun-maska.jpg' }
  ],
  coffee: [
    { name: 'Filter Kaapi', price: 99, img: '/images/menu/filter-kaapi.jpg' }
  ],
  tea: [
    { name: 'Masala Tea', price: 79, img: '/images/menu/masala-tea.jpg' }
  ],
  mocktails: [
    { name: 'Black Currant Mojito', price: 159, img: '/images/menu/black-currant-mojito.jpg' }
  ],
  soft_drinks: [
    { name: 'Fresh Lime Soda', price: 99, img: '/images/menu/fresh-lime-soda.jpg' }
  ],
  shakes: [
    { name: 'Strawberry Shake', price: 149, img: '/images/menu/strawberry-shake.jpg' }
  ],
  desserts: [
    { name: 'Hot Gulab Jamun', price: 89, img: '/images/menu/gulab-jamun.jpg' },
    { name: 'Brownie with Ice Cream', price: 179, img: '/images/menu/brownie-ice-cream.jpg' }
  ],
  ice_cream: [
    { name: 'Vanilla Bean Scoop', price: 79, img: '/images/menu/vanilla-scoop.jpg' }
  ],
  combos: [
    { name: 'Hakka Noodles + Chilli Paneer Combo', price: 265, img: '/images/menu/noodle-paneer-combo.jpg' },
    { name: 'Fried Rice + Chilli Chicken Combo', price: 285, img: '/images/menu/rice-chicken-combo.jpg' }
  ],
  special_dishes: [
    { name: 'Basanti Pulao + Mutton Kasha Special', price: 365, img: '/images/menu/pulao-mutton-special.jpg' }
  ]
};

const CATEGORIES = [
  { id: 'starters', label: 'Starters' },
  { id: 'soups', label: 'Soups' },
  { id: 'chinese', label: 'Chinese' },
  { id: 'indian', label: 'Indian' },
  { id: 'tandoor', label: 'Tandoor' },
  { id: 'biryani', label: 'Biryani' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'burger', label: 'Burger' },
  { id: 'sandwich', label: 'Sandwich' },
  { id: 'pasta', label: 'Pasta' },
  { id: 'momos', label: 'Momos' },
  { id: 'rolls', label: 'Rolls' },
  { id: 'fried_rice', label: 'Fried Rice' },
  { id: 'noodles', label: 'Noodles' },
  { id: 'snacks', label: 'Snacks' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'mocktails', label: 'Mocktails' },
  { id: 'soft_drinks', label: 'Soft Drinks' },
  { id: 'shakes', label: 'Shakes' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'ice_cream', label: 'Ice Cream' },
  { id: 'combos', label: 'Combos' },
  { id: 'special_dishes', label: 'Special Dishes' }
];

export default function RestroMenu() {
  const [activeCategory, setActiveCategory] = useState('starters');

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.02, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch (e) {}
  };

  const handleCategorySelect = (id) => {
    playClickSound();
    setActiveCategory(id);
  };

  const activeCategoryLabel = CATEGORIES.find(c => c.id === activeCategory)?.label || '';

  return (
    <div className="menu-section-container">
      {/* Category Tabs */}
      <div className="menu-tabs">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Elegant Restaurant Grid Menu Layout */}
      <div className="menu-grid-layout">
        <div className="menu-category-header">
          <h3>{activeCategoryLabel}</h3>
        </div>

        <div className="menu-cards-grid">
          {MENU_DATA[activeCategory].map((item, idx) => (
            <div key={idx} className="menu-item-card">
              <div className="menu-item-card-img-box">
                <img src={item.img} alt={item.name} className="menu-item-card-img" />
                <span className="menu-item-card-category">{activeCategoryLabel}</span>
              </div>
              <div className="menu-item-card-body">
                <h4 className="menu-item-card-title">{item.name}</h4>
                <div className="menu-item-card-footer">
                  <span className="menu-item-card-price">₹{item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
