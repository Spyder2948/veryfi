import React, { useEffect } from 'react';
import { Product, FooterBanner, Footer, HeroBanner, Layout } from '../components';
import { client } from '../lib/client.mjs';
import { StateContext, useStateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner herobanner={bannerData.length && bannerData[0]} />

     <div className='products-heading'>
      <h2>Best Selling Smartphones</h2>
      <p>Summer Sale is here!</p>
     </div>

      <div className="product-list">
        {products?.map((product) => ( <div key={product._id}>
                                        <Product product={product} />
                                      </div>
        ))}
      </div>

     <FooterBanner footerBanner={bannerData && bannerData[0]} />


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

  const apple = `*[_type == "phone" && productName match "Apple" + '*'][0...10]`;
  const xiaomi = `*[_type == "phone" && productName match "Xiaomi" + '*'][0...10]`;
  const samsung = `*[_type == "samsung"][0...10]`;

  const product1 = await client.fetch(apple);
  const product2 = await client.fetch(xiaomi);
  const product3 = await client.fetch(samsung);

  const products = product1.concat(product2, product3);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;