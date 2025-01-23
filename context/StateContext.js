import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { toast } from 'react-hot-toast';
import { client } from "@/lib/client.mjs";
import Router from "next/router";
import debounce from "lodash.debounce";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const [searchResults, setSearchResults] = useState([]);

  let foundProduct;
  let index;

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.amazon[3] * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if(checkProductInCart)
    {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      setCartItems(updatedCartItems);
    }
    else
    {
       product.quantity = quantity;

       setCartItems([...cartItems, {...product}]);
    }
    toast.success(`${qty} ${product.productName} added to the Wishlist`);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    })
  }

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id == product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.amazon * foundProduct.quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const SORT_OPTIONS = [
    {name: 'None', value: 'none'},
    {name: 'Price: Low to High', value: 'price-asc'},
    {name: 'Price: High to Low', value: 'price-desc'},
  ];

  const BRANDS = {
    id: "brands",
    name: "Brands",
    options: [
      {value: "Apple", label: "Apple"},
      {value: "Samsung", label: "Samsung"},
      {value: "Google Pixel", label: "Google"},
      {value: "Motorola", label: "Motorola"},
      {value: "Oneplus", label: "One Plus"},
      {value: "Xiaomi", label: "Xiaomi"},
      {value: "Realme", label: "Realme"},
      {value: "Oppo", label: "Oppo"},
      {value: "Vivo", label: "Vivo"},
      {value: "Nothing", label: "Nothing"},
    ]
  }

  const FEATURES = {
    id: "features",
    name: "Features",
    options: [
      {value: "In-display Fingerprint", label: "In-Display Fingerprint"},
      {value: "Fingerprint", label: "Fingerprint"},
      {value: "UFS 3 Storage", label: "UFS 3 Storage"},
      {value: "Memory Card Support", label: "Memory Card Support"},
      {value: "Expandable RAM", label: "Expandable RAM"},
      {value: "Waterproof", label: "Waterproof"},
    ],
  };

  const STORAGE = {
    id: "storage",
    name: "Storage",
    options: [
      {value: "64GB", label: "64 GB"},
      {value: "128GB", label: "128 GB"},
      {value: "256GB", label: "256 GB"},
      {value: "512GB", label: "512 GB"},
      {value: "1TB", label: "1 TB"},
    ],
  };

  const RAM = {
    id: "ram",
    name: "Ram",
    options: [
      {value: "4GB", label: "4 GB"},
      {value: "6GB", label: "6 GB"},
      {value: "8GB", label: "8 GB"},
      {value: "12GB", label: "12 GB"},
      {value: "16GB", label: "16 GB"},
    ],
  };

  const DISPLAY = {
    id: "display",
    name: "Display",
    options: [
      {value: "IPS LCD", label: "IPS LCD"},
      {value: "AMOLED", label: "AMOLED"},
      {value: "Super AMOLED", label: "Super AMOLED"},
      {value: "Foldable Display", label: "Foldable Display"},
    ],
  };

  const BATTERY = {
    id: "battery",
    name: "Battery",
    options: [
      {value: "3000mAh", label: "3000mAh & Above"},
      {value: "4000mAh", label: "4000mAh & Above"},
      {value: "5000mAh", label: "5000mAh & Above"},
      {value: "6000mAh", label: "6000mAh & Above"},
    ],
  };

  const REFRESH_RATE = {
    id: "refresh",
    name: "Refresh Rate",
    options: [
      {value: "60 Hz", label: "60 Hz"},
      {value: "90 Hz", label: "90 Hz"},
      {value: "120 Hz", label: "120 Hz"},
      {value: "144 Hz", label: "144 Hz"},
    ],
  };

  const PRICE_FILTERS = {
   id: "price",
   name: "Price",
   options: [
      {value: [0, 200000], label: "Any Price"},
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

  const DEFAULT_CUSTOM_PRICE = [0, 200000];

  const [filter, setFilter] = useState({
    brands: [''],
    features: [''],
    storage: [''],
    ram: [''],
    display: [''],
    battery: [''],
    refresh: [''],
    sort: 'none',
    price: {isCustom: false, range: DEFAULT_CUSTOM_PRICE},
  });

  const applyArrayFilter = ({ category, value }) => {
    const isFilterApplied = filter[category].includes(value);

    if (isFilterApplied)
    {
      setFilter((prev) => ({
        ...prev,
        [category]: prev[category].filter((v) => v !== value),
      }))
    }
    else
    {
      setFilter((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }))
    }
  }

  const [empty_commonProducts, setEmpty] = useState(false);

  // const debouncedSubmit = debounce(updateFilter(),400);
  // const _debouncedSubmit = useCallback(debouncedSubmit, []);

  useEffect(() => {
    const updateFilter = debounce(async () => {
      try
      {
        const filterquery = `*[_type in ["phone","samsung"] && (brand in $brands && features match (array::join($feature," ")) + '*'
                                                                                 && features match (array::join($storage," ")) + '*'
                                                                                 && features match (array::join($ram," ")) + '*'
                                                                                 && features match (array::join($battery," ")) + '*'
                                                                                 && features match (array::join($display," ")) + '*'
      )]`;
        const results = await client.fetch(filterquery, {brands: filter.brands,
                                                         feature: filter.features,
                                                         storage: filter.storage,
                                                         ram: filter.ram,
                                                         battery: filter.battery,
                                                         display: filter.display,
                                                        });
        // console.log(results);
        // setfilterProducts(results);

       const pricequery = `*[_type in ["phone","samsung"]] {...,
                                                          "amazon1": amazon,
                                                          "flipkart1": flipkart,
                                                          "croma1": croma,
                                                          "samsung1": samsung,
                                                          "amazon": amazon[3],
                                                          "flipkart": flipkart[3],
                                                          "croma": croma[3],
                                                          "samsung": samsung[3],
                                                        } |
                                                        {
                                                          ...,
                                                          "lowestPrice": math::min([
                                                            select(
                                                              amazon != null && amazon != 0 && (flipkart == null || flipkart == 0 || amazon <= flipkart) && (croma == null || croma == 0 || amazon <= croma) && (samsung == null || samsung == 0 || amazon <= samsung) => amazon,
                                                              flipkart != null && flipkart != 0 && (amazon == null || amazon == 0 || flipkart <= amazon) && (croma == null || croma == 0 || flipkart <= croma) && (samsung == null || samsung == 0 || flipkart <= samsung) => flipkart,
                                                              croma != null && croma != 0 && (amazon == null || amazon == 0 || croma <= amazon) && (flipkart == null || flipkart == 0 || croma <= flipkart) && (samsung == null || samsung == 0 || croma <= samsung) => croma,
                                                              samsung != null && samsung != 0 && (amazon == null || amazon == 0 || samsung <= amazon) && (flipkart == null || flipkart == 0 || samsung <= flipkart) && (croma == null || croma == 0 || samsung <= croma) => samsung
                                                            )
                                                          ]),
                                                        } |
                                                        {
                                                          ...,
                                                          "amazon": amazon1,
                                                          "flipkart": flipkart1,
                                                          "croma": croma1,
                                                          "samsung": samsung1,
                                                          "lowestPrice": lowestPrice,
                                                          "priceFilterMatch": select(
                                                            lowestPrice >= $price[0] && lowestPrice <= $price[1] => true,
                                                            false
                                                          ),
                                                        }`;

        const temp_results = await client.fetch(pricequery, {price: filter.price.range});

        const filtered_results = temp_results.filter((product) => product.priceFilterMatch);
        // console.log(temp_results);

        // Find common products from both query results
        let commonProducts;

        if(filtered_results && filtered_results.length > 0)
        {if(results && results.length > 0)
          {
            commonProducts = results.filter((result) => filtered_results.find((product) => product.productName === result.productName));
          }
          else
          {
           commonProducts = filtered_results;
          }
        }
        else if(results && results.length > 0)
        {
          commonProducts = results;
        }

        setfilterProducts(commonProducts);
        // console.log(commonProducts);
        // if (commonProducts && commonProducts.length > 0) {
        //   setfilterProducts(commonProducts);
        //   setEmpty(false);
        // } else {
        //   setEmpty(true);
        //   Router.push('/filter_notfound');
        // }
      }
      catch (error)
      {
        console.error("Error fetching filtered products:", error);
      }
    },500);

    updateFilter();

    return updateFilter.cancel;
  },[filter]);


  const [filterproducts, setfilterProducts] = useState([]);

  return (
    <Context.Provider value={{ showCart, setShowCart, cartItems, totalPrice, totalQuantities, qty, incQty, decQty, onAdd, onRemove,
    searchResults, setSearchResults, applyArrayFilter, DEFAULT_CUSTOM_PRICE, filter, setFilter, filterproducts, setfilterProducts, SORT_OPTIONS,
     BATTERY, BRANDS, DISPLAY, PRICE_FILTERS, STORAGE, RAM, REFRESH_RATE, FEATURES}}>
        {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);