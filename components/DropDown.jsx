import React from 'react'
import { Kalam } from 'next/font/google';


const sati = Kalam({
  subsets: ['latin'],
  weight: ['400', '700']
});

const DropDown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {onClick: handleOpen,})}
      {open ? ( <ul className="menu">
                  {menu.map((menuItem, index) => (

              <li key={index} className="menu-item">
                {React.cloneElement(menuItem,{onClick:()=>{menuItem.props.onClick();
                                                          setOpen(false);
                                                          },})
                }
              </li>


          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default DropDown;