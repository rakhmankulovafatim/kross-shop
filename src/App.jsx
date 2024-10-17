import './App.scss';
import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";
import { TiTick } from "react-icons/ti";


function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [addedItems, setAddedItems] = useState([]); // Состояние для отслеживания добавленных товаров

  useEffect(() => {
    fetch('http://localhost:3001/product')
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при подключений к сети');
        }
        return response.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка при получении данных:', error);
        setLoading(false);
      });
  }, []);

  const addToOrder = (item) => {
    const inArray = orders.some(order => order.id === item.id);
    if (!inArray) {
      setOrders(prevOrders => [...prevOrders, item]);
      setAddedItems(prev => [...prev, item.id]); // Добавляем ID товара в массив добавленных
    }
  };

  const filteredItems = items.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className='container'>
      <div className='c_container'>
        <Header orders={orders} setOrders={setOrders} />
        <div className="main-top">
          <h1>Все кроссовки</h1>
          <div className="main-top-r">
            <input
              type="text"
              placeholder="Поиск..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className='item'>
          <ul className='product'>
            {filteredItems.map(product => (
              <li className='li-product' key={product.id}>
                <img src={product.image} alt={product.title} className='img' />
                <h2>{product.title}</h2>
                <p>{product.text}</p>
                <div className="li-title">
                  <p>ЦЕНА:<br /><span className='black'>{product.price} руб.</span></p>
                  <button className='button-pr' onClick={() => addToOrder(product)}>
                    <CiSquarePlus className='button-pru' />
                  </button>
                  {/* Условный рендеринг иконки "галочка" */}
                  {addedItems.includes(product.id) && (
                    <TiTick className='added-icon' style={{ color: 'green' }} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
