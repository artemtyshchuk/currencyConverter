import { useEffect, useState } from "react";
import styles from "./CurrencyConverter.module.scss";

const apiKey = process.env.REACT_APP_EXCHANGE_API_KEY;

export const CurrencyConverter = () => {
  const [amountFrom, setAmountFrom] = useState<string>("");
  const [amountTo, setAmountTo] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("UAH");
  const [defaultCurrency] = useState<string>("USD");
  const [data, setData] = useState<{
    [key: string]: number;
  }>({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${defaultCurrency}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const dataJson = await response.json();
      setData(dataJson.conversion_rates);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateConversion = (
    value: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    if (fromCurrency === defaultCurrency) {
      return value * data[toCurrency];
    } else if (toCurrency === defaultCurrency) {
      return value / data[fromCurrency];
    } else {
      const toBase = value / data[fromCurrency];
      return toBase * data[toCurrency];
    }
  };

  const handleAmountFromChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAmountFrom(value);
    if (parseFloat(value) === 0 || isNaN(parseFloat(value))) {
      setAmountTo("");
    } else {
      const convertedValue = calculateConversion(
        parseFloat(value),
        fromCurrency,
        toCurrency
      );
      setAmountTo(convertedValue.toFixed(2));
    }
  };

  const handleAmountToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountTo(value);
    if (parseFloat(value) === 0 || isNaN(parseFloat(value))) {
      setAmountFrom("");
    } else {
      const convertedValue = calculateConversion(
        parseFloat(value),
        toCurrency,
        fromCurrency
      );
      setAmountFrom(convertedValue.toFixed(2));
    }
  };

  const handleFromCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value;
    setFromCurrency(newCurrency);
    if (amountFrom) {
      const newConvertedValue = calculateConversion(
        parseFloat(amountFrom),
        newCurrency,
        toCurrency
      ).toFixed(2);
      setAmountTo(newConvertedValue);
    }
  };

  const handleToCurrencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCurrency = event.target.value;
    setToCurrency(newCurrency);
    if (amountFrom) {
      const newConvertedValue = calculateConversion(
        parseFloat(amountFrom),
        fromCurrency,
        newCurrency
      ).toFixed(2);
      setAmountTo(newConvertedValue);
    }
  };

  const handleResetButton = () => {
    setAmountFrom("");
    setAmountTo("");
  };

  return (
    <div className={styles.currencyConverter}>
      <div className={styles.currencyConverterHeader}>
        <h2 className={styles.title}>Currency Converter</h2>
        <button className={styles.resetButton} onClick={handleResetButton}>
          Reset
        </button>
      </div>
      <span className={styles.divider}></span>
      <div className={styles.currencyConverterBodyContainer}>
        <label className={styles.inputContainer}>
          <input
            type="text"
            value={amountFrom}
            onChange={handleAmountFromChange}
            placeholder="0"
            className={styles.input}
          />
          <select
            value={fromCurrency}
            className={styles.inputSelect}
            onChange={handleFromCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
        </label>

        <label className={styles.inputContainer}>
          <input
            type="text"
            value={amountTo}
            onChange={handleAmountToChange}
            placeholder="0"
            className={styles.input}
          />
          <select
            value={toCurrency}
            className={styles.inputSelect}
            onChange={handleToCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
        </label>
      </div>
    </div>
  );
};
