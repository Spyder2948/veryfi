import React from 'react';
import { AiOutlineUp } from 'react-icons/ai';


const Filter = () => {
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(false);

    const handleChangeOne = () => {
      setCheckedOne(!checkedOne);
    };

    const handleChangeTwo = () => {
      setCheckedTwo(!checkedTwo);
    };

    return (
    <>
    <div className='filter-section'>
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
    </div>

    </>

  )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
  };

export default Filter