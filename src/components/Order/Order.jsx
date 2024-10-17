import React from 'react';
import { CiSquarePlus } from "react-icons/ci";
import "../Order/Order.scss"
import { ImCross } from "react-icons/im";


const Order = ({ item, onRemove, isAdded, onAdd }) => {
  return (
    <div className='order'>
      
      <div className="order-left">
              <img src={item.image} alt={item.title} className='img' />
      </div>

    <div className="order-right">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <p>{item.price} руб.</p>
    </div>
                <button onClick={() => onRemove(item.id)}><ImCross />
                </button>

                <button className='button-bottom'>Оформит заказ</button>
                
                
          
    </div>
  );
};

export default Order;
