import React from 'react';
import Skeleton from './Skeleton/Skeleton';

const SkeletonStats = () => {
  return (
    <div>
      <Skeleton width={50} height={22} centre />
      <Skeleton width={70} height={30} centre />
      <Skeleton width={80} height={50} centre />
      <Skeleton width={40} height={30} centre />
      <div className='divider'></div>
      <Skeleton width={50} height={22} centre />
      <Skeleton width={50} height={48} centre />
      <Skeleton width={40} height={30} centre />
    </div>
  );
};

export default SkeletonStats;
