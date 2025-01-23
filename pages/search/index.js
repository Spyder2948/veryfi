import React, {useEffect, useState} from 'react';
import { Product, Layout } from '@/components';
import { StateContext, useStateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Lottie from 'lottie-react';
import gif from '../../productNotFound.json';
import { Kalam } from 'next/font/google';
import { client } from '@/lib/client.mjs';
import ProductSkeleton from '@/components/ProductSkeleton';
import Accordion from '@/components/Accordion';
import PriceAccordion from '@/components/PriceAccordion';
import { usePagination } from '@mantine/hooks';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

const Home = ({ products }) => {

  const {searchResults} = useStateContext();
  const {BATTERY, BRANDS, DISPLAY, PRICE_FILTERS, STORAGE, RAM, REFRESH_RATE, FEATURES } = useStateContext();

  //searchResults or products

  let displayproducts;

  if(searchResults && searchResults.length > 0){
   displayproducts = searchResults;
  }
  else{
    displayproducts = products;
  }


  const totalProducts = displayproducts.length;
  const productsPerPage = 24; // Change this to the number of products you want to display per page
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [productsForPage, setProductsForPage] = useState([]);

  const { range, active, setPage, next, previous, first, last } = usePagination({
    total: totalPages,
    initialPage: 1,
    onChange: (page) => {
      // Fetch products for the selected page
      const start = (page - 1) * productsPerPage;
      const end = start + productsPerPage;
      const currentPageProducts = displayproducts.slice(start, end);
      // Set the products for the current page
      setProductsForPage(currentPageProducts);
    },
  });



  useEffect(() => {
    // Fetch products for the initial page
    const start = (active - 1) * productsPerPage;
    const end = start + productsPerPage;
    const initialProductsForPage = displayproducts.slice(start, end);
    setProductsForPage(initialProductsForPage);
  }, [displayproducts, active]);

  return (
    <>
    {searchResults?.length > 0 ? (
     <>
        <div className='products-heading'>
          <h2>Search Results</h2>
          <p>Found {searchResults.length} matched Products</p>
        </div>

        <div className='filter-product-container'>
          <div className='accordion'>
            <h2 className='filter-title'>Filters</h2>
            <Accordion title={BRANDS.name} content={BRANDS} />
            <Accordion title={FEATURES.name} content={FEATURES}/>
            <Accordion title={STORAGE.name} content={STORAGE}/>
            <Accordion title={RAM.name} content={RAM}/>
            <Accordion title={DISPLAY.name} content={DISPLAY}/>
            <Accordion title={REFRESH_RATE.name} content={REFRESH_RATE}/>
            <Accordion title={BATTERY.name} content={BATTERY}/>
            <PriceAccordion title={PRICE_FILTERS.name} content={PRICE_FILTERS}/>

          </div>

          <div className="product-list">
            {productsForPage ?(productsForPage.map((product) =>
                                          ( <div key={product._id}>
                                              <Product product={product} />
                                            </div>
                                          ))): (
                                            new Array(24).fill(null).map((_, i) => <ProductSkeleton key={i}/>)
                                          )
            }
          </div>
      </div>

     </>
    ): (
      <>
      <div className='product-not-found'>
          <div className='gif'>
            <Lottie animationData={gif} loop={true} />
          </div>
          <div className={sati.className}> The Product you are searching for is Currently Unavailable:)  </div>

          <div className='suggested-products'>Suggested Products</div>

      </div>

      <div className='filter-product-container'>
          <div className='accordion'>
            <h2 className='filter-title'>Filters</h2>
            <Accordion title={BRANDS.name} content={BRANDS} />
            <Accordion title={FEATURES.name} content={FEATURES}/>
            <Accordion title={STORAGE.name} content={STORAGE}/>
            <Accordion title={RAM.name} content={RAM}/>
            <Accordion title={DISPLAY.name} content={DISPLAY}/>
            <Accordion title={REFRESH_RATE.name} content={REFRESH_RATE}/>
            <Accordion title={BATTERY.name} content={BATTERY}/>
            <PriceAccordion title={PRICE_FILTERS.name} content={PRICE_FILTERS}/>

          </div>
       <div className="product-list">
      {productsForPage?.map((product) => ( <div key={product._id}>
                                  <Product product={product} />
                                </div>
                              ))}
      </div>
      </div>
     </>
    )
   }

      <div className="pagination">
        <button className='page-btn' onClick={previous}> <MdKeyboardArrowLeft className='left-arr'/> </button>
        {range.map((item, index) => (
          <span
            key={index}
            style={{ cursor: 'pointer',
                     color: item === active ? '#ebebeb':'#1a1a1a',
                     background: item === active ? 'rgb(34, 139, 230)' : '#fff',
                   }}
            onClick={() => typeof item === 'number' && setPage(item)}
            className='range-no'
          >
            {item === 'dots' ? '...' : item}
          </span>
        ))}
        <button className='page-btn' onClick={next}> <MdKeyboardArrowRight className='left-arr'/> </button>

      </div>
   </>
  );
}

Home.getLayout = (page) => {
  return  <ClerkProvider
          appearance={{
            baseTheme: dark,
            fontFamily: "__Fira_Sans_505ce6, __Fira_Sans_Fallback_505ce6",
          }}
          >
          <StateContext>
            <Toaster />
              <Layout>
                {page}
              </Layout>
          </StateContext>
         </ClerkProvider>;
}

export const getServerSideProps = async () => {

  const apple = `*[_type == "phone" && productName match "Apple" + '*'][0...4]`;
  const xiaomi = `*[_type == "phone" && productName match "Xiaomi" + '*'][0...4]`;
  const samsung = `*[_type == "samsung"][0...4]`;

  const product1 = await client.fetch(apple);
  const product2 = await client.fetch(xiaomi);
  const product3 = await client.fetch(samsung);

  const products = product1.concat(product2, product3);

  return {
    props: { products }
  }
}


export default Home;