import React from 'react';
import { PaddingBlue } from '../Style/coinStyle.js';

function CoinBigPic({currentCoin}) {
  if(!currentCoin) return <div/>
  return (
    <PaddingBlue>
      <h2 style={{textAlign: 'center'}}>
        {currentCoin.Name}
      </h2>
      <img alt={currentCoin.Name} style={{ height: '200px', display: 'block', margin: 'auto' }}
        src={`http://cryptocompare.com/${ currentCoin.ImageUrl}`}
      />
    </PaddingBlue>
  )
}

export default CoinBigPic;