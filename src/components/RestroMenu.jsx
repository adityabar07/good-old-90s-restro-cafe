import React, { useState } from 'react';

const MENU_DATA = {
  starters: [
    { name: 'Cheese Corn Balls', price: 199 },
    { name: 'Peri Peri Fries Basket', price: 149 },
    { name: 'Veg Crispy', price: 189 },
    { name: 'Paneer 65', price: 209 },
    { name: 'Crispy Mushroom Pepper Salt', price: 219 },
    { name: 'Chilli Baby Corn', price: 199 }
  ],
  soups: [
    { name: 'Tomato Shorba', price: 129 },
    { name: 'Hot & Sour Soup', price: 139 },
    { name: 'Sweet Corn Soup', price: 139 },
    { name: 'Manchow Soup', price: 149 },
    { name: 'Lemon Coriander Soup', price: 139 }
  ],
  chinese: [
    { name: 'Chilli Garlic Noodles', price: 229 },
    { name: 'Veg Fried Rice', price: 199 },
    { name: 'Dragon Chicken', price: 269 },
    { name: 'Veg Manchurian Gravy', price: 219 },
    { name: 'Paneer Chilli Dry', price: 239 },
    { name: 'Schezwan Fried Rice', price: 209 }
  ],
  indian: [
    { name: 'Paneer Lababdar', price: 289 },
    { name: 'Old Delhi Butter Chicken', price: 399 },
    { name: 'Dal Makhani', price: 229 },
    { name: 'Mix Veg Jalfrezi', price: 249 },
    { name: 'Kadhai Paneer', price: 279 },
    { name: 'Chicken Bharta', price: 329 }
  ],
  tandoor: [
    { name: 'Smoky Paneer Tikka', price: 279 },
    { name: 'Malai Soya Chaap', price: 259 },
    { name: 'Tandoori Chicken (Half)', price: 349 },
    { name: 'Chicken Tikka', price: 299 },
    { name: 'Tandoori Roti', price: 29 },
    { name: 'Butter Naan', price: 69 }
  ],
  biryani: [
    { name: 'Veg Dum Biryani', price: 269 },
    { name: 'Chicken Tikka Biryani', price: 349 },
    { name: 'Mutton Dum Biryani', price: 399 },
    { name: 'Jeera Rice', price: 149 },
    { name: 'Peas Pulao', price: 179 }
  ],
  pizza: [
    { name: 'Retro Double Cheese Pizza', price: 349 },
    { name: 'Farmhouse Pizza', price: 329 },
    { name: 'Paneer Tikka Pizza', price: 349 },
    { name: 'Margherita Pizza', price: 279 },
    { name: 'Chicken Golden Delight Pizza', price: 389 }
  ],
  burger: [
    { name: '90s Classic Cheeseburger', price: 189 },
    { name: 'Veg Crispy Burger', price: 149 },
    { name: 'Chicken Zinger Burger', price: 209 },
    { name: 'Paneer Burger', price: 199 }
  ],
  sandwich: [
    { name: 'Grilled Club Sandwich', price: 169 },
    { name: 'Veg Cheese Toast', price: 129 },
    { name: 'Corn & Cheese Sandwich', price: 139 },
    { name: 'Chicken Club Sandwich', price: 199 }
  ],
  pasta: [
    { name: 'Smoked Alfredo Penne', price: 289 },
    { name: 'Arrabbiata Penne', price: 269 },
    { name: 'Creamy Pesto Pasta', price: 299 },
    { name: 'Mac & Cheese', price: 249 }
  ],
  momos: [
    { name: 'Steamed Veg Momos', price: 119 },
    { name: 'Fried Chicken Momos', price: 149 },
    { name: 'Pan Fried Schezwan Momos', price: 159 },
    { name: 'Tandoori Momos', price: 169 }
  ],
  rolls: [
    { name: 'Double Egg Roll', price: 99 },
    { name: 'Paneer Tikka Roll', price: 129 },
    { name: 'Chicken Kebab Roll', price: 139 },
    { name: 'Mixed Veg Roll', price: 119 }
  ],
  snacks: [
    { name: 'Onion Rings', price: 129 },
    { name: 'Garlic Bread with Cheese', price: 149 },
    { name: 'Nachos with Cheese Sauce', price: 159 },
    { name: 'Chicken Nuggets', price: 179 }
  ],
  coffee: [
    { name: 'Filter Kaapi', price: 99 },
    { name: 'Cappuccino', price: 129 },
    { name: 'Cafe Latte', price: 139 },
    { name: 'Americano', price: 109 }
  ],
  tea: [
    { name: 'Masala Chai', price: 79 },
    { name: 'Elaichi Tea', price: 69 },
    { name: 'Green Tea', price: 89 },
    { name: 'Ginger Lemon Tea', price: 79 }
  ],
  mocktails: [
    { name: 'Virgin Mojito', price: 149 },
    { name: 'Blue Lagoon', price: 149 },
    { name: 'Fruit Punch', price: 169 },
    { name: 'Watermelon Cooler', price: 139 }
  ],
  cold_beverages: [
    { name: 'Cassette Cola Float', price: 129 },
    { name: 'Iced Americano', price: 119 },
    { name: 'Cold Coffee with Ice Cream', price: 159 },
    { name: 'Fresh Lime Soda', price: 99 }
  ],
  desserts: [
    { name: 'Cassette Tape Lava Cake', price: 199 },
    { name: 'Brownie with Ice Cream', price: 179 },
    { name: 'Warm Gulab Jamun (2 Pcs)', price: 89 },
    { name: 'Sizzling Brownie Plate', price: 219 }
  ],
  ice_cream: [
    { name: 'Vanilla Bean', price: 79 },
    { name: 'Chocolate Fudge', price: 89 },
    { name: 'Butterscotch', price: 89 },
    { name: 'Strawberry Ripple', price: 79 }
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
  { id: 'snacks', label: 'Snacks' },
  { id: 'coffee', label: 'Coffee' },
  { id: 'tea', label: 'Tea' },
  { id: 'mocktails', label: 'Mocktails' },
  { id: 'cold_beverages', label: 'Cold Beverages' },
  { id: 'desserts', label: 'Desserts' },
  { id: 'ice_cream', label: 'Ice Cream' }
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

      {/* Elegant Menu Layout */}
      <div className="menu-display-layout">
        <div className="menu-category-header">
          <h3>{CATEGORIES.find(c => c.id === activeCategory)?.label}</h3>
        </div>

        <div className="menu-items-table">
          {MENU_DATA[activeCategory].map((item, idx) => (
            <div key={idx} className="menu-table-row">
              <span className="menu-dish-name">{item.name}</span>
              <span className="menu-dish-dots"></span>
              <span className="menu-dish-price">₹{item.price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
