import React from 'react';
import styles from "./CategorySubcategories.module.css";
import { Link } from 'react-router-dom';
import IconToggle from './IconToggle';

export default function ProductList({ products, image, search, displayedPrice, isFavorite, productId, size }) {
  
    return (
    <ul>
        

         <li
         key={products._id}
         className={styles.ProductsContainer__li}
       >

         <Link
           to={{
             pathname: `/products/${productId}`,
             search: search,
           }}
           style={{ color: 'black', textDecoration: 'none' }}
         >
           <img
             src={image}
             alt={products.name}
             className={styles.ProductsContainer__image}
           />
           <div
             style={{
               display: 'flex',
               flexDirection: 'column',
               marginBottom: '4rem',
               marginLeft: '1rem',
             }}
           >
             <span
               style={{
                 fontSize: '1rem',
                 fontWeight: '700',
                 fontFamily: 'poppins, sans-serif',
               }}
             >
               R$ {displayedPrice}
             </span>
             <span
               style={{
                 overflow: 'hidden',
                 textOverflow: 'ellipsis',
                 whiteSpace: 'nowrap',
                 width: '15vw',
                 color: 'rgb(114, 114, 114)',
                 fontSize: '.8rem',
               }}
             >
               {products.name}
             </span>
             <span>     {size}</span>
           </div>
         </Link>
         <div
           style={{
             position: 'absolute',
             top: '-5%',
             right: '0',
             zIndex: 5,
             marginBottom: '5rem',
             width: '3rem',
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
           }}
         >
           <IconToggle
             productId={productId}
             isFavorite={isFavorite}
           />
         </div>
       </li>


    </ul>
  );
}