import React from 'react';
import styled from 'styled-components';

const WithoutDetail = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 23px;
  color: #0a0aad;
  background: rgba(0,0,0,.3);
  border: 1px solid hsla(0,0%,100%,.2);
  border-radius: 5px;
  padding: 10px 0;
  margin: 5px 0px;
  transition: all .3s;
  cursor: pointer;
  :hover{
    background-color: #302e2e;
  }
  
  @media (max-width: 1110px) {
    justify-content: flex-start;
    max-width: 900px;
  }

  @media (max-width: 460px) {
    flex-direction: column;
  }

  @media (max-width: 460px) {
    max-width: 250px;
  }
  
`;

const TextWithoutDetails = styled.span`
  display: flex;
  color: #fff;
  min-width: 250px;
  font-size: 23px;
  margin-left: 5px;
  @media (max-width: 1110px) {
    min-width: 0;
    margin-right: 15px;
  }

  @media (max-width: 700px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }
  
`;


const MyImg = styled.img`
  max-width: 25px;
  margin-right: 10px;
`;

const WithoutDetails = ({image, name, symbol, price, volume, capital, clicked, id, active, setActive, }) => {  

  return (
    <WithoutDetail onClick={() => {
      setActive(!active);
      clicked(id);
      }}>
      <TextWithoutDetails>
        <MyImg src={image} alt='logo'/>
        {name} / {symbol}
      </TextWithoutDetails>
      <TextWithoutDetails>
        {price}$
      </TextWithoutDetails>
      <TextWithoutDetails>
        {volume}
      </TextWithoutDetails>
      <TextWithoutDetails>
        {capital}$
      </TextWithoutDetails>
    </WithoutDetail>
  )
};

export default WithoutDetails;