import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [dollars, setDollars] = useState([]);
  const onChange = (event) => setDollars(event.target.value);
  useEffect(() => {
    fetch(" https://api.coinpaprika.com/v1/tickers?limit=200")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  console.log(coins.name);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <input
            type="number"
            placeholder="보유중인 시드머니를 입력하세요 $단위"
            style={{ width: "370px" }}
            value={dollars}
            onChange={onChange}
          ></input>
          <br />
          <h3>현재 코인들의 시세 확인하기</h3>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <br/>
          <h3>보유중인 시드머니로 구매할 수 있는 코인의 양(실수)</h3>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}):
                {dollars / coin.quotes.USD.price} {coin.symbol}
              </option>
            ))}
          </select>
          <br />
          <h3>보유중인 시드머니로 구매할 수 있는 코인의 양(정수)</h3>
          <select>
            {coins.map((coin) => (
              <option key={coin.id}>
                {coin.name} ({coin.symbol}):
                {parseInt(dollars / coin.quotes.USD.price)}개 구매가능
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
