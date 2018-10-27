import React from 'react';
import {
  CoinSymbol, CoinHeaderGrid, ChangePct,
  TickerPrice
} from '../Style/coinStyle.js';

function CoinPriceHead(props) {
  const getPercentNumber = (number) => {
    number = (+number) * 100
    return +(number + '').slice(0, 4);
  }
  const getNumber = (number) => {
    return +(number + '').slice(0, 6);
  }
  return (
    <div>
      <CoinHeaderGrid>
        <div>{props.coin.Symbol}</div>
        <CoinSymbol><ChangePct red={props.change < 0}>{getPercentNumber(props.change)}%</ChangePct></CoinSymbol>
      </CoinHeaderGrid>
      <TickerPrice>${getNumber(props.price)}</TickerPrice>
    </div>
  )
}

export default CoinPriceHead;