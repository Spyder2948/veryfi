import React from 'react';
import Accordion from './Accordion';


const Filter = () => {
    // const [checkedOne, setCheckedOne] = React.useState(false);
    // const [checkedTwo, setCheckedTwo] = React.useState(false);

    // const handleChangeOne = () => {
    //   setCheckedOne(!checkedOne);
    // };

    // const handleChangeTwo = () => {
    //   setCheckedTwo(!checkedTwo);
    // };
    const SORT_OPTIONS = [
      {name: 'None', value: 'none'},
      {name: 'Price: Low to High', value: 'price-asc'},
      {name: 'Price: High to Low', value: 'price-desc'},
    ];

    const BRANDS = [
      {name: "Apple", selected: true, href: 'http://localhost:3000/search?query=Apple'},
      {name: "Samsung", selected: false, href: 'http://localhost:3000/search?query=Samsung'},
      {name: "Google", selected: false, href: 'http://localhost:3000/search?query=Google'},
      {name: "Motorola", selected: false, href: 'http://localhost:3000/search?query=Motorola'},
      {name: "One Plus", selected: false, href: 'http://localhost:3000/search?query=One+Plus'},
      {name: "Xiaomi", selected: false, href: 'http://localhost:3000/search?query=Xiaomi'},
      {name: "Realme", selected: false, href: 'http://localhost:3000/search?query=Realme'},
      {name: "Oppo", selected: false, href: 'http://localhost:3000/search?query=Oppo'},
      {name: "Vivo", selected: false, href: 'http://localhost:3000/search?query=Vivo'},
      {name: "Nothing", selected: false, href: 'http://localhost:3000/search?query=Nothing'},
    ];

    const FEATURES = {
      id: "features",
      name: "Features",
      options: [
        {value: "in-display-finger", label: "In-Display Fingerprint"},
        {value: "finger", label: "Fingerprint"},
        {value: "ufs3", label: "UFS 3 Storage"},
        {value: "memory-card", label: "Memory Card Support"},
        {value: "exp-ram", label: "Expandable RAM"},
        {value: "waterproof", label: "Waterproof"},
      ],
    };

    return (
    <>
    <div>
      <ul className='brands-filter'>
        {BRANDS.map((brand) => (
          <li key={brand.name}>
           <button type='button' disabled={!brand.selected} className='brand-btn'> {brand.name} </button>
          </li>
        ))}

      </ul>


    </div>



    {/* <div className='filter-section'>
        <div className='filter-title'>Filters</div>
        <div className='clear-filter'>Clear All</div>
    </div>

    <div className='filter-bar'>
       <div className='filter-subsection'>
          <div>
              <div className='filter-title'>Brands</div>
              <AiOutlineUp fill='#1a1a1a' size={22}/>
          </div>

          <div>
            <Checkbox
                label="Apple"
                value={apple}
                onChange={handleChangeOne}
            />
            <Checkbox
                label="Samsung"
                value={samsung}
                onChange={handleChangeTwo}
            />

          </div>

       </div>
       <div className='filter-subsection'>

       </div>
       <div className='filter-subsection'>

       </div>
       <div className='filter-subsection'>

       </div>
       <div className='filter-subsection'>

       </div>
    </div> */}

    </>

  )
}

// const Checkbox = ({ label, value, onChange }) => {
//     return (
//       <label>
//         <input type="checkbox" checked={value} onChange={onChange} />
//         {label}
//       </label>
//     );
//   };

export default Filter