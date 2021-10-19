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
  background-color: #a6b9f7;
  border-radius: 5px;
  border: 2px solid #2020e9;
  margin: 10px;
  padding: 20px;
`;

const MyButton = styled.button`
  cursor: pointer;
  background-color: #2020e9;
  color: #fff;
  font-size: 18px;
  border-radius: 5px;
  margin-left: 10px;
  margin-right: 15px;
  padding: 10px;
  border: none;
  transition: all .5s;
  :hover{
    background-color: #3434f7;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0 20px 45px;
`;

const MyDiv = styled.div`
  color: #0a0aad;
  min-width: 250px;
  font-size: 23px;
  margin-left: 5px;
`;

const VolumeSpan = styled.span`
  display: inline-block;
  text-align: center;
  min-width: 150px;
  min-height: 21px;
  color: #0a0aad;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
`;

const CryptoList = ({state, totalVolume, setTotalVolume}) => {
  const [csvData, setCsvData] = useState([{}]);
  const [csvIsReady, setCsvIsReady] = useState(false);
  const headers = [
    { label: "Name:", key: "name" },
    { label: "Price:", key: "current_price" },
    { label: "Total Volume:", key: "total_volume" },
    { label: "Market capitalization:", key: "market_cap" },
  ];
  console.log(state)

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
    setCsvData(state)
    setCsvIsReady(true);
  }

 const newState = state ? state : [{key: '0001', name: 'Loading...'}];
 const valume = totalVolume ? totalVolume : '';

  return (
    <div style={{padding: '20px'}}>
      API used: coingecko.com 
      <Content>
        <div style={{display: 'flex'  }}>
          <MyButton style={{marginRight: '1px'}}
            onClick={() => countVolume()}>Count total volumes</MyButton>
          <VolumeSpan>{valume}</VolumeSpan>
        </div>
        <MyButton 
          style={{marginLeft: '50px'}}
          onClick={() => downloadResult()}>
          Generate data for upload
        </MyButton>
        {csvIsReady ? <CSVLink data={csvData} headers={headers}>Download CSV</CSVLink> : ''}
      </Content>
    <List>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <MyDiv>Name:</MyDiv> <MyDiv>Price:</MyDiv> <MyDiv>Total Volume:</MyDiv> <MyDiv>Market capitalization:</MyDiv>
      </div>
      {newState.map(item => {
        return <ListItem
                  key={item.symbol}
                  name={item.name}
                  price={item.current_price}
                  volume={item.total_volume}
                  image={item.image}
                  symbol={item.symbol}
                  capital={item.market_cap}
                  />
      })} 
    </List>
    </div>
  );
};

export default CryptoList;