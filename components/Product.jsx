import React from 'react';
import Link from 'next/link';
import { MdStarRate } from "react-icons/md";

const Product = ({ product: { image, productName, slug, amazon, croma, samsung, flipkart, rating, lowestPrice } }) => {
  const prices = [amazon?.[amazon?.length - 1],
                  flipkart?.[flipkart?.length - 1],
                  croma?.[croma?.length - 1],
                   samsung?.[samsung?.length - 1],
                ].filter(price => typeof price === 'number' && price !== 0);


  if(prices.length > 0)
  {
    let price = Math.min(...prices);

    if(lowestPrice > 0)
    {
      price = lowestPrice;
    }

    return (
      <div className="product-card">
          <Link href={`/product/${slug.current}`}>
            <div className="product-image-wrapper">
              <div className='rating-icon-bg'>
                <MdStarRate fill='#fff'/>
                <em className='rating-text'>{ rating}</em>

              </div>

              <img src={image[0]} alt="smartphone" className="product-image" />
            </div>

          <div className="product-details">
            <div className="product-info">
              <div className="product-name-desc">
                <h3 className="product-name">{productName}</h3>

              </div>
              <div className="product-price">&#8377;{price}</div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn">View Details</button>
              <button className="add-to-shortlist-btn">Compare Now</button>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Product