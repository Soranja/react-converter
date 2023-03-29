import './App.css';
import CurrencyInput from './components/CurrencyInput';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('CNY');
  const [toCurrency, setToCurrency] = useState('USD');
  const [rates,  setRates] = useState([]);
  
  useEffect(() => {
    axios.get('https://api.freecurrencyapi.com/v1/latest?apikey=iYGmVGhm6aX8FsNYZR4h5x4Q5m0K0vSPJ86kbOpR')
    
      .then(response => {setRates(response.data.data)})
  }, []);

  // API with AMD: https://www.exchangerate-api.com

  useEffect(() => {
    if (!!rates) {
      handleFromAmountChange(1);
    };
  }, [rates]);

  function format(number) {
    return number.toFixed(5);
  };

  function handleFromAmountChange (fromAmount) {
    setToAmount(format (fromAmount * rates[toCurrency] / rates[fromCurrency]));
    setFromAmount(fromAmount);
  };

  function handleFromCurrencyChange (fromCurrency) {
    setToAmount(format (fromAmount * rates[toCurrency] / rates[fromCurrency]));
    setFromCurrency(fromCurrency);
  };

  function handleToAmountChange (toAmount) {
    setFromAmount(format (toAmount * rates[fromCurrency] / rates[toCurrency]));
    setToAmount(toAmount);
  };

  function handleToCurrencyChange (toCurrency) {
    setFromAmount(format (toAmount * rates[fromCurrency] / rates[toCurrency]));
    setToCurrency(toCurrency);
  };


  return (
    <div className="App">
      <h1>Cash Cash, Money Money...</h1>
      <h2>What can I do for you, ma honey?</h2>
       <CurrencyInput 
        onAmountChange={handleFromAmountChange} 
        onCurrencyChange={handleFromCurrencyChange}
        currencies={Object.keys(rates)} 
        amount={fromAmount} 
        currency={fromCurrency}/>

       <CurrencyInput 
        onAmountChange={handleToAmountChange}
        onCurrencyChange={handleToCurrencyChange}
        currencies={Object.keys(rates)} 
        amount={toAmount} 
        currency={toCurrency}/>

    </div>
  );
}

export default App;
