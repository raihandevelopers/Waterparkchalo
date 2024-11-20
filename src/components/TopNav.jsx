import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-blue-600 text-white px-4 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="mailto:wpc@waterparkchalo.com" className="text-sm hover:underline">wpc@waterparkchalo.com</a>
          <span className="text-sm">|</span>
          <a href="tel:+918847714464" className="text-sm hover:underline">+91 8847714464</a>
          <span className="text-sm">|</span>
          <span className="text-sm">Alkapuri</span>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://facebook.com" className="text-white hover:text-gray-300">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://wa.me" className="text-white hover:text-gray-300">
            <i className="fab fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com" className="text-white hover:text-gray-300">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://youtube.com" className="text-white hover:text-gray-300">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;