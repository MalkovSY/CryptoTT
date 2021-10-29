import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CryptoList from './components/cryptoList/cryptoList';
import CoinGecko from 'coingecko-api';
import { getData } from './reducer/reposReducer';

import './index.css';

const CoinGeckoClient = new CoinGecko();

function App() {
  let [totalVolume, setTotalVolume] = useState(null);

  const state = useSelector(state => state.repos.items);
  const detailState = useSelector(state => state.repos.detailItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const func = async() => {
      let data = await CoinGeckoClient.coins.markets();
      await dispatch(getData(data))
    };
    func()
  }, [dispatch])

  return (
    <CryptoList 
      state={state}
      detailState={detailState}
      totalVolume={totalVolume} 
      setTotalVolume={setTotalVolume}
      />
  );
}

export default App;
