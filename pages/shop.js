import React, { useEffect, useState } from 'react';
import { Product, FooterBanner, HeroBanner, Layout } from '../components';
import { client } from '../lib/client.mjs';
import { StateContext, useStateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { usePagination } from '@mantine/hooks';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductSkeleton from '@/components/ProductSkeleton';
import Accordion from '@/components/Accordion';
import DropDown from '@/components/DropDown';
import PriceAccordion from '@/components/PriceAccordion';

const Home = ({ bannerData, total}) => {

  const {filterproducts, SORT_OPTIONS, BATTERY, BRANDS, DISPLAY, PRICE_FILTERS, STORAGE, RAM, REFRESH_RATE, FEATURES } = useStateContext();

  const [displayproducts, setdisplayproducts] = useState([]);

  useEffect(() => {
    if (filterproducts && filterproducts.length > 1) {
      setdisplayproducts(filterproducts);
    } else {
      setdisplayproducts(total);
    }
  }, [filterproducts, total]);


  const handleHightoLow = () => {
    const sortedHightoLow = [...displayproducts].sort((a, b) => b.lowestPrice - a.lowestPrice);
    setdisplayproducts(sortedHightoLow);
  };

  const handleLowtoHigh = () => {
    const sortedLowtoHigh = [...displayproducts].sort((a, b) => a.lowestPrice - b.lowestPrice);
    setdisplayproducts(sortedLowtoHigh);
  };

  const handleRelevant = () => {
    if (filterproducts && filterproducts.length > 1) {
      setdisplayproducts(filterproducts);
    } else {
      setdisplayproducts(total);
    }
  };

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





  const [isActive, setIsActive] = useState(true);




  return (
    <>

    <div className='herosection-container'>
        <HeroBanner herobanner={bannerData.length && bannerData[0]} />
    </div>

     <div className='products-heading'>
        <h2>Best Selling Smartphones</h2>
        <p>Summer Sale is here!</p>
     </div>

     <div className='sort-container' onClick={() => setIsActive(!isActive)}>
     <DropDown trigger={<button className='sort-btn'>Sort {isActive ? '+' : '-' } </button>}
      menu={[
        <button onClick={handleRelevant}>Relevant</button>,
        <button onClick={handleLowtoHigh}>Price: Low to High</button>,
        <button onClick={handleHightoLow}>Price: High to Low</button>,
            ]}
    />
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
                                            new Array(32).fill(null).map((_, i) => <ProductSkeleton key={i}/>)
                                          )


            }
          </div>
      </div>


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

    <div className='herosection-container'>
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>

    </>
  )
}

Home.getLayout = (page) => {
  return <ClerkProvider
          appearance={{
            baseTheme: dark,
            fontFamily: "__Fira_Sans_505ce6, __Fira_Sans_Fallback_505ce6",
          }}
          >
          <StateContext>
              <Layout>
              <Toaster />
                {page}
              </Layout>
          </StateContext>
         </ClerkProvider>;
}

export const getServerSideProps = async () => {

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const totalquery = `*[_type in ["phone","samsung"]]`;
  const total = await client.fetch(totalquery);

  return {
    props: { bannerData, total}
  }
}

export default Home;