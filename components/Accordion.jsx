import React, { useState } from 'react';
import { Kalam } from 'next/font/google';
import { useStateContext } from '@/context/StateContext';

const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

const Accordion = ({ title, content}) => {
  const [isActive, setIsActive] = useState(true);

  const { filter, applyArrayFilter } = useStateContext();

  // console.log(filter);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className={sati.className}>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <ul className="accordion-content"> {content.options.map((option,id) => (
        <li key={option.value} className='filter-options'>
            <input type="checkbox" name="" id={`${content.id}-${id}`} className='filter-checkbox'
            onChange={() => {
                applyArrayFilter({
                  category: content.id,
                  value: option.value
                })
              }}
            checked={filter[content.id].includes(option.value)}
            />
            <label htmlFor={`${content.id}-${id}`} className='filter-checkbox-label'> {option.label} </label>
        </li>
      ))}

      </ul>}
    </div>
  );
};

export default Accordion;