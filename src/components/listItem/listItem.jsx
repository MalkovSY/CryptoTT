import React, { useState } from 'react';
import InDetails from './inDetails';
import WithoutDetails from './withoutDetails';
import CoinGecko from 'coingecko-api';
const CoinGeckoClient = new CoinGecko();

const ListItem = ({name, price, volume, image, symbol, capital, id, detailState,}) => {
  const [active, setActive] = useState(false);
  const [datails, setDatails] = useState(false);
  
  const clicked = async (e) => {
    let detailData = await CoinGeckoClient.coins.fetch(e, {});
    await setDatails(detailData.data)
  }
  
  return (
    <div>
      {active ? 
        <InDetails
          image={image}
          name={name}
          symbol={symbol}
          price={price}
          volume={volume}
          capital={capital}
          detailState={detailState}
          active={active}
          setActive={setActive}
          datails={datails}
          /> : 
        <WithoutDetails
          id={id}
          image={image}
          name={name}
          symbol={symbol}
          price={price}
          volume={volume}
          capital={capital}
          clicked={clicked}
          active={active}
          setActive={setActive}
          />}
    </div>
  );
};

export default ListItem;