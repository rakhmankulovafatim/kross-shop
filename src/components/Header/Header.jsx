import React, { useState } from 'react';
import './Header.scss';
import { CiShoppingCart } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { MdPeopleAlt } from "react-icons/md";
import Order from '../Order/Order';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";


export default function Header({ orders, setOrders }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [addedItems, setAddedItems] = useState({}); // Состояние для отслеживания добавленных товаров
  const navigate = useNavigate();

  const removeFromOrder = (id) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    setAddedItems(prev => ({ ...prev, [id]: false })); // Удаляем галочку
  };

  const addToOrder = (item) => {
    const inArray = orders.some(order => order.id === item.id);
    if (!inArray) {
      setOrders(prevOrders => [...prevOrders, item]);
      setAddedItems(prev => ({ ...prev, [item.id]: true })); // Устанавливаем галочку
    }
  };

  const getTotalPrice = () => {
    return orders.reduce((total, order) => total + parseFloat(order.price), 0).toFixed(2);
  };

  const toggleCart = () => {
    setCartOpen(prev => !prev);
  };

  const handleBackButtonClick = () => {
    setCartOpen(false); // Закрыть корзину
    navigate('/'); // Перейти на главную страницу
  };

  return (
    <header className='header'>
      <div className='h_left'>
        <img src="/img/image%204%20(3).png" alt="" />
        <div className="h_l_text">
          <h1>Kross Store</h1>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>
      <div className='h_right'>
        <div className="h_item">
          <CiShoppingCart 
            onClick={toggleCart} 
            className={`shop-cart-button ${cartOpen && 'active'}`} 
          />
        </div>
        <div className="h_item">
          <CiHeart />
          <p>Закладки</p>
        </div>
        <div className="h_item">
          <MdPeopleAlt />
          <p>Профиль</p>
        </div>
      </div>

      {cartOpen && <div className="overlay" onClick={toggleCart}></div>}

      <div className={`shop-cart ${cartOpen ? 'active' : ''}`}>
        {orders.length === 0 ? (
          <>
          <h1>Корзина</h1>
          <div className='shop-cart-cart'>
           <img src="/img/image%208.png" alt="" />
          <h2>Корзина пустая</h2>
          <p>Добавьте хотя бы одну пару <br/>
             кроссовок, чтобы сделать заказ.</p>
             

             <button className='button' onClick={handleBackButtonClick}><FaArrowLeft className='arrow' />
             Вернуться назад</button> 
             
             
          </div>

          </>
        ) : (
          <>
            {orders.map(el => (
              <Order 
                key={el.id} 
                item={el} 
                onRemove={removeFromOrder} 
                isAdded={addedItems[el.id] || false} // Передаем состояние добавления
                onAdd={addToOrder}
              />
            ))}
            <p>Сумма: {getTotalPrice()} руб.</p>
          </>
        )}
      </div>
    </header>
  );
}
