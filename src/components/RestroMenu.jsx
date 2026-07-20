import React, { useState } from 'react';

const MENU_DATA = {
  starters: [
    { name: 'Paneer Tikka Dry', price: 239, img: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=600' },
    { name: 'Chicken Roast', price: 279, img: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600' },
    { name: 'Fish & Chips', price: 295, img: 'https://images.unsplash.com/photo-1579208575657-c595a05323b3?q=80&w=600' },
    { name: 'Cheese Corn Balls', price: 199, img: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?q=80&w=600' },
    { name: 'Peri Peri Fries Basket', price: 149, img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=600' }
  ],
  soups: [
    { name: 'Hot & Sour Chicken Soup', price: 149, img: 'https://images.unsplash.com/photo-1547592165-e1d17f8e05cc?q=80&w=600' },
    { name: 'Manchow Soup', price: 139, img: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=600' }
  ],
  chinese: [
    { name: 'Chilli Garlic Noodles', price: 229, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600' },
    { name: 'Paneer Chilli Dry', price: 239, img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600' },
    { name: 'Dragon Chicken', price: 269, img: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600' }
  ],
  indian: [
    { name: 'Paneer Butter Masala', price: 269, img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=600' },
    { name: 'Fish Butter Masala', price: 349, img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600' },
    { name: 'Mutton Kasha', price: 389, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600' }
  ],
  tandoor: [
    { name: 'Malai Soya Chaap', price: 259, img: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=600' },
    { name: 'Tandoori Naan', price: 59, img: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?q=80&w=600' }
  ],
  biryani: [
    { name: 'Basanti Pulao', price: 189, img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600' },
    { name: 'Mutton Dum Biryani', price: 399, img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600' }
  ],
  pizza: [
    { name: 'Double Cheese Pizza', price: 349, img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600' }
  ],
  burger: [
    { name: 'Cheeseburger', price: 189, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600' }
  ],
  sandwich: [
    { name: 'Paneer Tikka Sandwich', price: 159, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600' }
  ],
  pasta: [
    { name: 'Smoked Alfredo Penne', price: 289, img: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=600' }
  ],
  momos: [
    { name: 'Steamed Veg Momos', price: 119, img: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600' }
  ],
  rolls: [
    { name: 'Chicken Roll', price: 139, img: 'https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=600' }
  ],
  fried_rice: [
    { name: 'Egg Fried Rice', price: 199, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600' }
  ],
  noodles: [
    { name: 'Chilli Garlic Hakka Noodles', price: 229, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600' }
  ],
  snacks: [
    { name: 'Omelette Platter', price: 135, img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=600' },
    { name: 'Bun Maska', price: 85, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600' }
  ],
  coffee: [
    { name: 'Filter Kaapi', price: 99, img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600' }
  ],
  tea: [
    { name: 'Masala Tea', price: 79, img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600' }
  ],
  mocktails: [
    { name: 'Black Currant Mojito', price: 159, img: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600' }
  ],
  soft_drinks: [
    { name: 'Fresh Lime Soda', price: 99, img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600' }
  ],
  shakes: [
    { name: 'Strawberry Shake', price: 149, img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600' }
  ],
  desserts: [
    { name: 'Hot Gulab Jamun', price: 89, img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=600' },
    { name: 'Brownie with Ice Cream', price: 179, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600' }
  ],
  ice_cream: [
    { name: 'Vanilla Bean Scoop', price: 79, img: 'https://images.unsplash.com/photo-1560180474-e8563fd75bab?q=80&w=600' }
  ],
  combos: [
    { name: 'Hakka Noodles + Chilli Paneer Combo', price: 265, img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600' },
    { name: 'Fried Rice + Chilli Chicken Combo', price: 285, img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600' }
  ],
  special_dishes: [
    { name: 'Basanti Pulao + Mutton Kasha Special', price: 365, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600' }
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
