import styles from "./CurrencyConverter.module.scss";

interface InputComponentProps {
  amount: string;
  currency: string;
  handleAmountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCurrencyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const InputComponent = ({
  amount,
  currency,
  handleAmountChange,
  handleCurrencyChange,
}: InputComponentProps) => {
  return (
    <>
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        placeholder="0"
        className={styles.input}
      />
      <select
        value={currency}
        className={styles.inputSelect}
        onChange={handleCurrencyChange}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="UAH">UAH</option>
      </select>
    </>
  );
};
