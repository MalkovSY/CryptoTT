import React, { useState } from 'react';
import styled from 'styled-components';
import maskStrLength10 from '../../services';

const InDetail = styled.li`
  font-size: 23px;
  color: #fff;
  background: rgba(0,0,0,.3);
  border-radius: 5px;
  padding: 10px 0px;

  @media (max-width: 700px) {
    font-size: 16px;
  }
  
  @media (max-width: 540px) {
    font-size: 13px;
  }

  @media (max-width: 460px) {
    max-width: 250px;
  }
  
`;

const InDetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 23px;
  color: #fff;
  background: rgba(0,0,0,.3);
  border: 1px solid hsla(0,0%,100%,.2);
  border-radius: 5px;
  padding: 10px 0px;
  margin: 5px 0px;
  cursor: pointer;
  &.activated{
    border: none;
    background: none;
    padding: 0;
  }

  @media (max-width: 1120px) {
    justify-content: flex-start;
  }

  @media (max-width: 700px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }

  @media (max-width: 460px) {
    flex-direction: column
  }

`;

const TextInDetails = styled.span`
  display: flex;
  min-width: 250px;
  font-size: 23px;
  margin-left: 5px;

  @media (max-width: 1120px) {
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

const TextDetails = styled.div`
  margin-left: 10px;
  font-size: 23px;

  @media (max-width: 700px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }

`;

const TextDetailsContent = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 10px 5px;
  
`;

const TextDetailsContentItem = styled.div`
  font-size: 18px;
  min-width: 250px;

  @media (max-width: 700px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }

`;

const MyImg = styled.img`
  max-width: 25px;
  max-height: 25px;
  margin-right: 10px;

`;

const MyButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 15px;
  padding: 7px;
  border: none;
  transition: all .5s;
  :hover{
    background-color: #d1d1d1;
  }

  @media (max-width: 700px) {
    font-size: 16px;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }

`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  padding-bottom: 25px;
  background: rgba(0,0,0,.3);
  border-radius: 5px;

  @media (max-width: 460px) {
    max-width: 250px;
  }

`;

const Wrapper = styled.div`
  margin: 20px 5px;
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 5px 0;
`;

const WrapperDetailsContentItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 950px;
  margin: 20px 10px;

  @media (max-width: 1110px) {
    flex-direction: column;
  }

`;

const InDetails = ({image, name, symbol, price, volume, capital, active, setActive, datails}) => {
  let [tickersCount, setTickersCount] = useState(10);

  const Details = () => {
    return (
    <Wrapper>
      <WrapperDetailsContentItem>
        <TextDetailsContentItem>Twitter followers: {datails.community_data.twitter_followers}</TextDetailsContentItem>
        <TextDetailsContentItem>Developer score: {datails.developer_score}</TextDetailsContentItem>
        <TextDetailsContentItem>Hashing algorithm: {datails.hashing_algorithm}</TextDetailsContentItem>
        <TextDetailsContentItem>Community score: {datails.community_score}</TextDetailsContentItem>
        <TextDetailsContentItem>Liquidity score: {datails.liquidity_score}</TextDetailsContentItem>
        <TextDetailsContentItem>Genesis: {datails.genesis_date}</TextDetailsContentItem>
      </WrapperDetailsContentItem>
      <TextDetails>
      Tickers:
        {
          datails.tickers.map((item, index) => {
            if(index <= tickersCount){
              return <TextDetailsContent key={index}>
                      <TextDetailsContentItem>{maskStrLength10(item.market.name)}</TextDetailsContentItem>
                      <TextDetailsContentItem>Usd: {item.converted_last.usd}$</TextDetailsContentItem>
                      <TextDetailsContentItem>Volume: {item.volume}</TextDetailsContentItem>
                      <TextDetailsContentItem>Trade: <a style={{color: '#fff'}} href={item.trade_url}>{maskStrLength10(item.market.name)}.com</a></TextDetailsContentItem>
                      <TextDetailsContentItem>Trust Score: <span style={{color: `${item.trust_score}`}}>{item.trust_score}</span></TextDetailsContentItem>
                     </TextDetailsContent>
            } else {
              return null
            }
          })
        }
      </TextDetails>
    </Wrapper>    
    )
  }
  
  return (
    <>
    <InDetail>
      <InDetailHeader 
        onClick={() => setActive(!active)}
        className={active ? 'activated' : ''}>
        <TextInDetails>
          <MyImg src={image} alt='logo'/>
          {name} / {symbol}
        </TextInDetails>
        <TextInDetails>
          {price}$
        </TextInDetails>
        <TextInDetails>
          {volume}
        </TextInDetails>
        <TextInDetails>
          {capital}$
        </TextInDetails>
      </InDetailHeader>
        {
          datails ? <Details/> : 'Loading ...'
        }
    </InDetail>
    <Div>
      <MyButton onClick={()=> setTickersCount(tickersCount += 10)}>
        more tickers...
      </MyButton>
      <MyButton onClick={() => setActive(!active)}>
        roll up
      </MyButton>
    </Div>
    </>
  )
};

export default InDetails;