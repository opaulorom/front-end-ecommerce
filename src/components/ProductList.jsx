import React from 'react';
import styles from "./ProductList.module.css"
export default function ProductList({ products }) {
  return (
    <ul className={styles.productListContainer}>
      {products.map(product => (
        <li key={product.id} style={{
          border: "2px solid gray"
        }} className={styles.productListContainer__productcard}>
          <img src={product.variations[0].urls[0]} alt={product.name} className={styles.productListContainer__image} />
          <p className={styles.productListContainer__price}>Preço: R${product.variations[0].sizes[0].price.toFixed(2)}</p>

          <h3 className={styles.productListContainer__productName}>{product.name}</h3>

        </li>
      ))}
    </ul>
  );
}
