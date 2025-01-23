import React, { useState } from 'react';
import { Kalam } from 'next/font/google';
import { useStateContext } from '@/context/StateContext';
import classNames from 'classnames';
import SliderDemo from './ui/SliderDemo';

const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

const PriceAccordion = ({ title, content}) => {
  const [isActive, setIsActive] = useState(true);

  const {filter, setFilter, DEFAULT_CUSTOM_PRICE, updateFilter } = useStateContext();

  const PRICE_FILTERS = {
    id: "price",
    name: "Price",
    options: [
       {value: [0, 10000], label: "Under 10k"},
       {value: [10001, 15000], label: "Under 15k"},
       {value: [15001, 20000], label: "Under 20k"},
       {value: [20001, 30000], label: "Under 30k"},
       {value: [30001, 40000], label: "Under 40k"},
       {value: [40001, 50000], label: "Under 50k"},
       {value: [50001, 60000], label: "Under 60k"},
       {value: [60001, 70000], label: "Under 70k"},
       {value: [70001, 90000], label: "Under 90k"},

    ]
   };

   const minPrice = Math.min(filter.price.range[0], filter.price.range[1]);
   const maxPrice = Math.max(filter.price.range[0], filter.price.range[1]);
  //  console.log(filter);

  // const debouncedSubmit = debounce(updateFilter(),400);
  // const _debouncedSubmit = useCallback(debouncedSubmit, []);

  return (
    <div className="accordion-item">
      <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
        <div className={sati.className}>{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>
      {isActive && <ul className="accordion-content"> {content.options.map((option,id) => (
        <li key={option.label} className='filter-options'>
            <input type="radio" name="" id={`${content.name}-${id}`} className='filter-checkbox'
            onChange={() => {
               setFilter((prev) => ({
                ...prev,
                price: {
                    isCustom: false,
                    range: [...option.value]
                }
               }))
              //  _debouncedSubmit();
              }}
            checked={!filter.price.isCustom && filter.price.range[0] === option.value[0] && filter.price.range[1] === option.value[1]}/>
            <label htmlFor={`${content.name}-${id}`} className='filter-checkbox-label'> {option.label} </label>
        </li>
      ))}
        <li className='filter-options josh-op'>
            <div>
            <input type="radio" name="" id={`${content.name}-${PRICE_FILTERS.options.length}`} className='filter-checkbox'
            onChange={() => {
               setFilter((prev) => ({
                ...prev,
                price: {
                    isCustom: true,
                    range: [0, 200000]
                }
               }))
              //  _debouncedSubmit();
              }}
            checked={filter.price.isCustom}/>
            <label htmlFor={`${content.name}-${PRICE_FILTERS.options.length}`} className='filter-checkbox-label'> Custom </label>

            </div>
            <div className='custom-slider-container'>
                <p className='slider-title'>Select Price Range</p>
                <div className='slider-title'>
                &#8377;{filter.price.isCustom ? minPrice.toFixed(0) : filter.price.range[0].toFixed(0)} &nbsp;-&nbsp;
                &#8377;{filter.price.isCustom ? maxPrice.toFixed(0) : filter.price.range[1].toFixed(0)}
                </div>
            </div>

            <SliderDemo
                    className={classNames("SliderRoot",{"opacity" : !filter.price.isCustom})}
                    disabled={!filter.price.isCustom}
                    onValueChange={(range) => {
                      const [newMin, newMax] = range

                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: true,
                          range: [newMin, newMax],
                        },
                      }))

                      // _debouncedSubmit()
                    }}
                    value={filter.price.isCustom ? filter.price.range : DEFAULT_CUSTOM_PRICE}
                    min={DEFAULT_CUSTOM_PRICE[0]}
                    defaultValue={DEFAULT_CUSTOM_PRICE}
                    max={DEFAULT_CUSTOM_PRICE[1]}
                    step={500}

                  />

        </li>
      </ul>}
    </div>
  );
};

export default PriceAccordion;