import React from 'react';
import { Product, Layout } from '@/components';
import { StateContext, useStateContext } from '@/context/StateContext';
import { Toaster } from 'react-hot-toast';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Lottie from 'lottie-react';
import gif from '../../productNotFound.json';
import { Kalam } from 'next/font/google';
import { client } from '@/lib/client.mjs';

const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

const Home = ({ products }) => {

  const {searchResults} = useStateContext();

  return (
    <>
    {searchResults?.length > 0 ? (
     <>
        <div className='products-heading'>
          <h2>Best Selling Smartphones</h2>
          <p>Summer Sale is here!</p>
        </div>

        <div className="product-list">
          {searchResults?.map((product) => ( <div key={product._id}>
                                      <Product product={product} />
                                    </div>
                                  ))}
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
       <div className="product-list">
      {products?.map((product) => ( <div key={product._id}>
                                  <Product product={product} />
                                </div>
                              ))}
      </div>
     </>
    )
   }
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

  const query = '*[_type in ["phone", "samsung"]][0...10]';
  const products = await client.fetch(query);

  return {
    props: { products }
  }
}


export default Home;