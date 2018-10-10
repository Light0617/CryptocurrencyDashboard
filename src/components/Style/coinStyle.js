
import styled, { css } from 'styled-components';
import {
  subtleBoxShadow,
  greenBoxShadow,
  redBoxShadow,
  lightBlueBackground
} from './style.js';

export const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 40px;
`;

export const CoinTile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 20px; 
	&:hover{
		cursor: pointer; 
		${greenBoxShadow}
  }
  ${props =>
    props.favorite &&
    css`
      &:hover {
        cursor: pointer;
        ${redBoxShadow};
      }
  `}	

  ${props =>
    props.dashboardFavorite &&
    css`
      ${greenBoxShadow} &:hover {
        pointer-events: none;
      }
    `}
    
  ${props =>
    props.chosen &&
    !props.favorite &&
    css`
      pointer-events: none;
      opacity: 0.4;
  `}
`;


export const CoinHeaderGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  ${CoinTile}:hover & {
    display: block;
    color: red;
  }
`;