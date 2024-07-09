import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import styles from "./SliderSkeleton.module.css"
export default function SliderSkeleton() {
  return (
    <div  className={styles.SliderSkeletonContainer}>
      <Skeleton sx={{ height: 300, width: '90%', borderRadius:"8px", marginTop:"-12rem" }}  animation="wave" className={styles.SliderSkeletonContainer__Skeleton}/>
     
    </div>
  );
}
