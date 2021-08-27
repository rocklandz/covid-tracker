import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, centre }) => {
  return (
    <div
      className={`skeleton ${centre && 'centre'}`}
      style={{
        height: `${height}px` || '16px',
        width: `${width}%` || '100%',
      }}
    ></div>
  );
};

export default Skeleton;
