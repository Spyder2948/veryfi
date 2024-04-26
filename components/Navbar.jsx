import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { Encode_Sans_Semi_Expanded } from 'next/font/google';
import { Cart } from "./";
import { useStateContext } from '@/context/StateContext';
import { UserButton, SignedOut } from '@clerk/nextjs';
import { FaCircleUser } from "react-icons/fa6";
import SearchInput from './SearchInput';
import router, { useRouter } from "next/router";

const enco = Encode_Sans_Semi_Expanded({
  subsets: ['latin'],
  weight: ['400','600','700']
});

const Navbar = () => {
  const {showCart, setShowCart, totalQuantities, setSearchResults } = useStateContext();

  const {
    query: { query: queryFromUrl },
  } = useRouter();

  // a state to store the search string
  const [searchString, setSearchString] = useState(
    typeof queryFromUrl === "string" ? queryFromUrl : ""
  );

  async function getResponse() {
    // query should be the URL that your search will be executed on.
    const query = `http://localhost:3000/api/search?query=${searchString}`;
    const response = await fetch(query, {
      method: "GET",
    });

    const data = await response.json(); // Extracting data as a JSON Object from the response
    setSearchResults(data);
  }

  const handleClickUser = async () => {
    if (searchString === "" || searchString.trim() === "") return;
    getResponse();
    router.push({
      pathname: "../search",
      query: { query: searchString },
    });
  };

  useEffect(() => {
    if (searchString !== "") {
      handleClickUser();
    }
  }, []);

  return (
    <div className='navbar-container'>

        <Link className={enco.className} href="/shop">VERYFI </Link>

       <SearchInput
       value={searchString}
       onChange={e => setSearchString(e.target.value)}
       onClick={handleClickUser}
        />

        <span className='user-container'>
          <button type='button' className='cart-icon search-link' onClick={() => setShowCart(true)}>
            <AiOutlineShopping/>
            <span className="cart-item-qty">{totalQuantities}</span>
          </button>

          <SignedOut>
              <a href='/sign-in'>
                <FaCircleUser className='user-sign-in' size={35} fill='#fff'/>
              </a>
          </SignedOut>

          <UserButton

              afterSignOutUrl="/"
              appearance={{
                variables: {
                  colorPrimary: "white",
                  colorText: "white",
                  fontFamily: "__Fira_Sans_505ce6, __Fira_Sans_Fallback_505ce6",
                  fontSize: "20px",
                  fontWeight: "400"
                }
              }}
          />
        </span>


        {showCart && <Cart/>}

        {/* <Link className='hidden-title' href="/">VERYFI </Link> */}

      {/* <nav className="navigation">
        <a href="/" className="nav-link">Brands</a>
        <a href="/" className="nav-link">Category</a>
        <a href="/" className="nav-link">Contact Us</a>
      </nav> */}


    </div>
  )
}

export default Navbar;