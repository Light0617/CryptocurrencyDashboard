import React from 'react';
import {
  CoinSymbol, CoinHeaderGrid
} from '../Style/coinStyle.js';

function CoinHead(props) {
  return (
    <div>
      <CoinHeaderGrid>
        <div>{props.coin.CoinName}</div>
        <CoinSymbol>{props.coin.Symbol}</CoinSymbol>
      </CoinHeaderGrid>
      <img
        alt={props.coin.Symbol}
        style={{ height: '50px' }}
        src={`http://cryptocompare.com/${props.coin.ImageUrl}`}
      />
    </div>
  )
}

export default CoinHead;