import React, { useState } from 'react';
import styled from 'styled-components';
import { CSVLink } from "react-csv";
import ListItem from '../listItem/listItem';
import CoinGecko from 'coingecko-api';

const CoinGeckoClient = new CoinGecko();

const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  flex-wrap: wrap;
  list-style-type: none;
  background: rgba(0,0,0,.3);
  border-radius: 5px;
  border: 1px solid hsla(0,0%,100%,.2);
  margin: 10px;
  padding: 20px;
`;

const MyButton = styled.button`
  cursor: pointer;
  background-color: #fff;
  color: #000;
  font-size: 18px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 15px;
  padding: 10px;
  border: none;
  transition: all .5s;
  :hover{
    background-color: #d1d1d1;
  }

  @media (max-width: 700px) {
    font-size: 13px;
    padding: 5px;
  }

  @media (max-width: 540px) {
    font-size: 13px;
  }

`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 20px 45px;

  @media (max-width: 540px) {
    margin: 10px 0 10px 10px;
  }

  @media (max-width: 460px) {
    flex-direction: column
  }

`;

const MyDiv = styled.div`
  color: #c9c8c8;
  min-width: 250px;
  font-size: 23px;
  margin-left: 5px;

  @media (max-width: 1110px){
    min-width: 0;
    margin-right: 15px;
  }

  @media (max-width: 700px) {
    font-size: 18px;
  }

  @media (max-width: 540px) {
    font-size: 15px;
  }

`;

const VolumeSpan = styled.span`
  display: inline-block;
  text-align: center;
  min-width: 150px;
  min-height: 21px;
  color: #fff;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;

  @media (max-width: 540px) {
    font-size: 15px;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 1110px){
    justify-content: flex-start;
  }
`;

const CryptoList = ({state, detailState, totalVolume, setTotalVolume}) => {
  const [csvData, setCsvData] = useState([{}]);
  const [csvIsReady, setCsvIsReady] = useState(false);
  let   [listCount, setListCount] = useState(12);

  const headers = [
    { label: "Name:", key: "name" },
    { label: "Price:", key: "current_price" },
    { label: "Total Volume:", key: "total_volume" },
    { label: "Market capitalization:", key: "market_cap" },
  ];

  const countVolume = () => {
    setTotalVolume(totalVolume = 'loading...' );
    const func = async() => {
      setTotalVolume(totalVolume = null);
      let data = await CoinGeckoClient.coins.markets();
      data.data.forEach(item => {
        setTotalVolume(totalVolume += item.total_volume);
      })
    };
    setTimeout(() => func(), 1000);
  }

  const downloadResult = () => {
    setCsvData(state);
    setCsvIsReady(true);
  }

  const newState = state ? state : [{key: '0001', name: 'Loading...'}];
  const valume = totalVolume ? totalVolume : '';
  
  return (
    <div style={{padding: '20px', backgroundColor: '#333', color: '#fff'}}>
      API used: coingecko.com 
      <Content>
        <div style={{display: 'flex'}}>
          <MyButton style={{marginRight: '1px'}}
            onClick={() => countVolume()}>Count total volumes</MyButton>
          <VolumeSpan>{valume}</VolumeSpan>
        </div>
        <MyButton 
          style={{marginLeft: '50px'}}
          onClick={() => downloadResult()}>
          Generate data for upload
        </MyButton>
        {csvIsReady ? <CSVLink style={{color: '#fff'}} data={csvData} headers={headers}>Download CSV</CSVLink> : ''}
      </Content>
    <List>
      <Wrapper>
        <MyDiv>Name:</MyDiv> <MyDiv>Price:</MyDiv> <MyDiv>Total Volume:</MyDiv> <MyDiv>Market capitalization:</MyDiv>
      </Wrapper>
      {
        newState.map((item, index) => {
          if(index <= listCount){
            return <ListItem
                  key={item.name}
                  name={item.name}
                  price={item.current_price}
                  volume={item.total_volume}
                  image={item.image}
                  symbol={item.symbol}
                  capital={item.market_cap}
                  id={item.id}
                  detailState={detailState}
                  />
          } else {
            return null
          }
        })
      }
      <Div>
        {
          (listCount < 100) ? <MyButton
            onClick={() => setListCount(listCount += 10)}
            style={{maxWidth: '300px'}}>
            more cryptocurrency...
          </MyButton> : <MyButton
                          onClick={() => setListCount(12)}>
                          It's all now. Hide?
                        </MyButton>
        }
      </Div> 
    </List>
    </div>
  );
};

export default CryptoList;