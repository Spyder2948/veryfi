import React from 'react';
import HomeLayout from '@/components/HomeLayout';
import { client, urlFor } from '@/lib/client.mjs';
import { Kalam } from 'next/font/google';

const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

export default function HomePage({ herosectionData }) {
  return (
        <>
        <div className='hero-section-flex-row'>

           <div className='desc-flex-col-container'>
              <div className='desc-flex-col'>
                <div className='verify_desc'>VERYFI <span className={sati.className}>here</span> </div>
                <div className='verify_desc'>THEN <span className={sati.className}>buy</span> </div>
              </div>

              <div className='desc-flex-col'>
                <p className='verify_desc'>Seize the best moment to make your next</p>
                <p className='verify_desc'>purchase by <em className={sati.className}> verifying </em> prices with us </p>
              </div>

              <div className='desc-flex-col'>
                  <a href='/sign-up' className='sign-up-button'>Sign-Up</a>
              </div>
           </div>

           <div className='vec-img-container'>
              {herosectionData.length && (<img src={urlFor(herosectionData[2].image[0])} className='vec-img' alt="hero section image" />)}
           </div>

        </div>

        <div className='Brands-Section'>
           <div className={`${sati.className} Brands-Title`}>Brands
            {/* {herosectionData.length && (<img src={urlFor(herosectionData[2].image[0])} className='text-svg' alt="text underline on hover" />)} */}

           </div>

           <div className='Brands-container'>

            <a href="http://localhost:3000/search?query=apple" >
              <img src={urlFor(herosectionData[1].image[0])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=samsung">
              <img src={urlFor(herosectionData[1].image[1])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=google">
              <img src={urlFor(herosectionData[1].image[2])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=motorola">
              <img src={urlFor(herosectionData[1].image[3])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=oneplus">
              <img src={urlFor(herosectionData[1].image[4])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=xiaomi">
              <img src={urlFor(herosectionData[1].image[5])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=realme">
              <img src={urlFor(herosectionData[1].image[6])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=oppo">
              <img src={urlFor(herosectionData[1].image[7])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=vivo">
              <img src={urlFor(herosectionData[1].image[8])} className='brand-img' alt="brand images" />
            </a>
            <a href="http://localhost:3000/search?query=nothing">
              <img src={urlFor(herosectionData[1].image[9])} className='brand-img' alt="brand images" />
            </a>

           </div>
        </div>

        <div className='Features-Section'>
          <div className={`${sati.className} Feature-Title`}>Our Features</div>

          <div className='Features-Container'>
              <div className='feature-cards'>
                  {herosectionData.length && (<img src={urlFor(herosectionData[0].image[0])} className='feature-img' alt="hero section image" />)}

                  <div className='feature-desc'>Find the <em className={sati.className}> best time </em>to buy your next phone</div>
              </div>

              <div className='feature-cards'>
                  {herosectionData.length && (<img src={urlFor(herosectionData[0].image[1])} className='feature-img' alt="hero section image" />)}

                  <div className='feature-desc'>Get the  <em className={sati.className}> best deals </em> </div>
              </div>

              <div className='feature-cards'>
                  {herosectionData.length && (<img src={urlFor(herosectionData[0].image[2])} className='feature-img' alt="hero section image" />)}

                  <div className='feature-desc'>&nbsp;&nbsp;&nbsp;&nbsp;Compare & decide <em className={sati.className}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; easily </em> </div>
              </div>
          </div>
        </div>




        </>

  )
}

HomePage.getLayout = function getLayout(page){
    return <HomeLayout>{page}</HomeLayout>;
};


export const getServerSideProps = async () => {
  const query = '*[_type == "assets"]';
  const herosectionData = await client.fetch(query);

  return {
    props: { herosectionData }
  }
}