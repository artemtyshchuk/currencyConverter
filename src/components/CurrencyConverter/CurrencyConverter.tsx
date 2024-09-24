import { useState } from "react";
import styles from "./CurrencyConverter.module.scss";
import { InputComponent } from "./InputComponent";
import { useFetchCurrencyConverterData } from "hooks/useFetchCurrencyConverterData";

export const CurrencyConverter = () => {
  const [amountFrom, setAmountFrom] = useState<string>("");
  const [amountTo, setAmountTo] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("UAH");

  const { data, defaultCurrency } = useFetchCurrencyConverterData();

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

  const handleAmountChange = (
    value: string,
    fromCurrency: string,
    toCurrency: string,
    setAmount: React.Dispatch<React.SetStateAction<string>>,
    setOtherAmount: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setAmount(value);
    const parsedValue = parseFloat(value);
    if (parsedValue === 0 || isNaN(parsedValue)) {
      setOtherAmount("");
    } else {
      const convertedValue = calculateConversion(
        parsedValue,
        fromCurrency,
        toCurrency
      );
      setOtherAmount(convertedValue.toFixed(2));
    }
  };

  const handleCurrencyChange = (
    newCurrency: string,
    currentAmount: string,
    fromCurrency: string,
    toCurrency: string,
    setCurrency: React.Dispatch<React.SetStateAction<string>>,
    setOtherAmount: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setCurrency(newCurrency);
    if (currentAmount) {
      const newConvertedValue = calculateConversion(
        parseFloat(currentAmount),
        fromCurrency,
        toCurrency
      ).toFixed(2);
      setOtherAmount(newConvertedValue);
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
          <InputComponent
            amount={amountFrom}
            currency={fromCurrency}
            handleAmountChange={(e) =>
              handleAmountChange(
                e.target.value,
                fromCurrency,
                toCurrency,
                setAmountFrom,
                setAmountTo
              )
            }
            handleCurrencyChange={(e) =>
              handleCurrencyChange(
                e.target.value,
                amountFrom,
                e.target.value,
                toCurrency,
                setFromCurrency,
                setAmountTo
              )
            }
          />
        </label>

        <label className={styles.inputContainer}>
          <InputComponent
            amount={amountTo}
            currency={toCurrency}
            handleAmountChange={(e) =>
              handleAmountChange(
                e.target.value,
                toCurrency,
                fromCurrency,
                setAmountTo,
                setAmountFrom
              )
            }
            handleCurrencyChange={(e) =>
              handleCurrencyChange(
                e.target.value,
                amountFrom,
                fromCurrency,
                e.target.value,
                setToCurrency,
                setAmountTo
              )
            }
          />
        </label>
      </div>
    </div>
  );
};
