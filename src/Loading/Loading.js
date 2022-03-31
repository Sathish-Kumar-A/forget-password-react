import React from 'react';

export const Loading = () => {
  return (
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <div className='spinner-border text-success'></div>
        <h4 className='mt-3'>Loading...</h4>
    </div>
  )
}
