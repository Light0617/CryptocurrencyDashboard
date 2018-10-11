import React from 'react';
import {
  CoinSymbol, CoinHeaderGrid, ChangePct,
  TickerPrice
} from '../Style/coinStyle.js';

function CoinPriceHead(props) {
  const getNumber = (number) => {
    return +(number + '').slice(0, 7);
  }
  return (
    <div>
      <CoinHeaderGrid>
        <div>{props.coin.Symbol}</div>
        <CoinSymbol><ChangePct red={props.change < 0}>{getNumber(props.change)}%</ChangePct></CoinSymbol>
      </CoinHeaderGrid>
      <TickerPrice>${getNumber(props.price)}</TickerPrice>
    </div>
  )
}

export default CoinPriceHead;