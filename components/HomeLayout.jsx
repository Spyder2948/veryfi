import React from 'react'
import Head from 'next/head';
import { Encode_Sans_Semi_Expanded } from 'next/font/google';
// import Link from 'next/link';
// import Footer from './Footer';
import { Fira_Sans } from 'next/font/google';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';

const fira = Fira_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800']
});

const enco = Encode_Sans_Semi_Expanded({
  subsets: ['latin'],
  weight: ['400', '600', '700']
});


const HomeLayout = ({children}) => {
  return (
    <>
    <div className={fira.className}>

      <Head>
          <title>Veryfi</title>
      </Head>

      <header>

        <div className="verify_container">
            <a href='/' className='sign-up-hidden'>Shop Now</a>

            <a className={enco.className} href="/">VERYFI </a>

            <a href='/shop' className='sign-up-button'>Shop Now</a>
        </div>

      </header>

      <main>
        {children}
      </main>



      <footer>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='wave-svg'>
        <path fill="#ff9900" fillOpacity="1"
        d="M0,288L120,240C240,192,480,96,720,80C960,64,1200,128,1320,160L1440,192L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z">
        </path>
      </svg>

      <div className='Footer-Section'>

              <div className='sub-footer-section'>
                  <div className='contact-form'>Contact-form</div>
                  <form className='form' method='post' action="/subscribe">
                    <input type="email" className='text-bar' name="email" id="email" placeholder='Enter your Email'/>
                    <textarea name="customer-query" className='text-area' id="cus_query" cols="30" rows="10" placeholder='Our Team will get back to you asap:)'></textarea>
                    <button className='submit-btn' type="submit">Submit</button>
                  </form>
              </div>

              <div className='sub-footer-section'>
                  <div className='subfooter-title'>Budget Phone</div>
                  <div className='subfooter-desc'>
                    <a className='phone-range' href="">Under 10k</a>
                    <a className='phone-range' href="">Under 15k</a>
                    <a className='phone-range' href="">Under 20k</a>
                  </div>
              </div>
              <div className='sub-footer-section'>
                  <div className='subfooter-title'>Mid-Range Phone</div>
                  <div className='subfooter-desc'>
                    <a className='phone-range' href="">Under 30k</a>
                    <a className='phone-range' href="">Under 40k</a>
                    <a className='phone-range' href="">Under 50k</a>
                  </div>
              </div>
              <div className='sub-footer-section'>
                  <div className='subfooter-title'>Flagship Phone</div>
                  <div className='subfooter-desc'>
                    <a className='phone-range' href="">Under 70k</a>
                    <a className='phone-range' href="">Under 90k</a>
                  </div>
              </div>

      </div>
      <div className='homepage-footer'>
                <p>2024 Veryfi All rights reserved</p>
                <p className='icons'>
                  <AiFillInstagram className='social-icons'/>
                  <AiOutlineTwitter className='social-icons'/>
                </p>
      </div>


      </footer>


    </div>

      </>
  )
}

export default HomeLayout;