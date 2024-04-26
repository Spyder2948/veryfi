import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '@/context/StateContext';
import Link from 'next/link';
import { client } from '@/lib/client.mjs';


const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove } = useStateContext();

  {console.log(cartItems);}

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
        <AiOutlineLeft fill='#fff' size={22}/>
        <span className='heading'>Your Wishlist</span>
        <span className='cart-num-items'> ({totalQuantities} items) </span>
        </button>

        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping fill='#fff' size={150}/>
            <h3>Your Wishlist is Empty</h3>
            <Link href="/">
              <button type='button' onClick={() => setShowCart(false)} className='btn'>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item) => (
            <div className='small-images-container' key={item._id}>
                <em className='cart-small-image'>
                  <img src={item?.image[0]} className='small-image' />
                </em>

                <div className="item-desc">
                  <div className="flex top">
                    <h5> {item.productName} </h5>
                    <h4> &#8377; {item.amazon[3]} </h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p>

                      </p>
                    </div>
                    <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3> &#8377; {totalPrice} </h3>
            </div>
            {/* <div className="btn-container">
              <button type="button" className='btn' onClick="">

              </button>
            </div> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart