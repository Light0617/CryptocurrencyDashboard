import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from './style.js';

export const SearchContainer = styled.div`
  margin-top: 40px;
  display: grid;
  grid-gap: 20px;
`;

export const SearchInput = styled.input`
  ${backgroundColor2} 
  color: #1163c9;
  border: 1px solid;
  ${fontSize2} 
  margin: 5px;
  height: 25px;
  place-self: center left;
`;