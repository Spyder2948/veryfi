import React, { useState, useRef, useEffect } from 'react'
import { client, urlFor } from '@/lib/client.mjs';
import { FcNext, FcPrevious } from 'react-icons/fc';
import { Product } from '@/components';
import Review from '@/components/Review';
import Star from '@/components/Star';
import { useStateContext, StateContext } from '@/context/StateContext';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'react-hot-toast';
import { IoHeartCircleOutline } from "react-icons/io5";
import { AiFillAmazonCircle } from "react-icons/ai";
import { SiFlipkart } from "react-icons/si";
import { TbBrandCoinbase } from "react-icons/tb";
import ProductLayout from '@/components/ProductLayout';
import { TbBrandSamsungpass } from "react-icons/tb";
import Graph from '@/components/Graph';

const ProductDetails = ({product, products}) => {

 const {productName, features, image, amazon, flipkart, croma, rating, reviews, samsung, links} = product;
//  const [index, setIndex] = useState(0);
 const { qty, onAdd} = useStateContext();
//  const curIndex = index;


 const maxScrollWidth = useRef(0);
 const [currentIndex, setCurrentIndex] = useState(0);
 const carousel = useRef(null);
 const [initialImages, setInitialImages] = useState([]);

 useEffect(() => {
    setInitialImages(image.slice(0, 4));
}, [image]);

const nextImage = () => {
    if (currentIndex < image.length - 1) {
        setCurrentIndex(currentIndex + 1);
    } else {
        setCurrentIndex(0);
    }
    updateInitialImages();
};

const prevImage = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
    } else {
        setCurrentIndex(image.length - 1);
    }
    updateInitialImages();
};

const updateInitialImages = () => {
    let startIndex = currentIndex > image.length - 4 ? image.length - 4 : currentIndex;
    if (startIndex === image.length - 4) {
        startIndex = image.length - 4;
    }
    setInitialImages(image.slice(startIndex, startIndex + 4));
};

useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
        carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
}, [currentIndex]);

useEffect(() => {
    maxScrollWidth.current = carousel.current
        ? carousel.current.scrollWidth - carousel.current.offsetWidth
        : 0;
}, []);

const isDisabled = (direction) => {
    if (direction === 'prev') {
        return currentIndex <= 0;
    }

    if (direction === 'next' && carousel.current !== null) {
        return (
            carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current ||
            currentIndex >= image.length - 1
        );
    }

    return false;
};

const handleImageClick = (index) => {
    setCurrentIndex(index);
};



 return (
    <>
         <div className='product-detail-container'>
            <div className='carousel-container'>

                <div className='image-container'>

                    <button onClick={prevImage} disabled={isDisabled('prev')} className='prev-btn'> <FcPrevious size={15}/> </button>
                        <img src={image[currentIndex].includes('www.smartprix.com') ? `/api/image?url=${encodeURIComponent(image[currentIndex])}` : image[currentIndex]}
                        alt="smartphone" id='main-image' className='product-detail-image' />
                        <div className='wishlist'>
                            <IoHeartCircleOutline className='wishlist-icon' onClick={() => onAdd(product, qty)}/>
                        </div>
                    <button onClick={nextImage} disabled={isDisabled('next')} className='prev-btn'> <FcNext size={15}/> </button>

                </div>

                <div className='small-images-container'>

                    {initialImages.map((img, key) => (
                            <img key={key} src={img.includes('www.smartprix.com') ? `/api/image?url=${encodeURIComponent(img)}` : img} alt='smartphone'
                            className={`small-image ${key === currentIndex ? 'active' : ''}`} onClick={() => handleImageClick(key)}
                            />
                    ))}

                </div>
            </div>


            <div className='product-detail-desc'>
                <h1 className='product-header'>{productName}</h1>
                <div className='reviews'>
                    <div className="rating">
                        <Star />
                        <span className="rating-value">{rating}</span>
                    </div>
                    <div className="review-count">
                        <Review />
                        <span className="review-count-value">{reviews}</span>
                    </div>
                    {/* <div className='wishlist'>
                        <IoHeartCircleOutline className='wishlist-icon'/>
                    </div> */}
                </div>
                    <h4>Features: </h4>

                       <ul>
                            {features.map((item, key) => (
                                <li className="list-items" key={key}> {item}</li>
                            ))}

                       </ul>


                    <div className='price-container'>
                        {samsung?.length > 1 ?
                        <a href={links?.length > 3 ? links[0]: ""} className='price-button'> <TbBrandSamsungpass />Samsung {samsung[3] === 0 ? <em className='out-of-stock'>Out of Stock </em> : <span className='price-rate'> &#8377;{samsung[3]} </span>} </a>
                         : ""}

                        {amazon?.length > 1 ?
                        <a href={links?.length > 3 ? links[2]: links?.length > 2 ? links[0] : links[0]} className='price-button'> <AiFillAmazonCircle size={22}/> Amazon {amazon[3] === 0 ? <em className='out-of-stock'>Out of Stock </em> : <span className='price-rate'> &#8377;{amazon[3]} </span>}  </a>
                        : ""}

                        {flipkart?.length > 1 ?
                        <a href={links?.length > 3 ? links[3]: links?.length > 2 ? links[2] : links[1]} className='price-button'> <SiFlipkart /> Flipkart {flipkart[3] === 0 ? <em className='out-of-stock'>Out of Stock </em> : <span className='price-rate'> &#8377;{flipkart[3]} </span>} </a>
                        : ""}

                        {croma?.length > 1 ?
                        <a href={links?.length > 3 ? links[1]: links?.length > 2 ? links[1] : ""} className='price-button'> <TbBrandCoinbase className='croma-brand'/> Croma  {croma[3]  === 0 ? <em className='out-of-stock'>Out of Stock </em> : <span className='price-rate'> &#8377;{croma[3]} </span>}  </a>
                        : ""}

                    </div>

                </div>


             <Graph product={product}/>
            </div>



            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item) => (
                            <Product key={item._id} product={item}/>
                        ))}
                    </div>

                </div>

            </div>

        </>
  )
}

ProductDetails.getLayout = (page) => {
    return <ClerkProvider
            appearance={{
              baseTheme: dark,
              fontFamily: "__Fira_Sans_505ce6, __Fira_Sans_Fallback_505ce6",
            }}
            >
            <StateContext>
                <ProductLayout>
                <Toaster />
                  {page}
                </ProductLayout>
            </StateContext>
           </ClerkProvider>;
  }

export const getStaticPaths = async () => {
    const query = `*[_type == "phone"]{
        slug{
            current
        }
    }`;
    const products = await client.fetch(query);
    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }));

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({ params: { slug } }) => {
    const query = `*[_type in ["phone", "samsung"] && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type in ["phone", "samsung"]][0...10]';
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);

    // console.log(product);

    return {
      props: { product, products }
    }
  }

export default ProductDetails