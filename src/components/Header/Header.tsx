import { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { CurrencyApiResponse } from "types";
import usaFlag from "assets/usaFlag.png";
import euFlag from "assets/euFlag.png";

const apiKey = process.env.REACT_APP_EXCHANGE_API_KEY;
const func = (curr: string) => {
  return `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${curr}`;
};

export const Header = () => {
  const [data, setData] = useState<{
    USD: CurrencyApiResponse | null;
    EUR: CurrencyApiResponse | null;
  }>({
    USD: null,
    EUR: null,
  });

  const fetchData = async () => {
    try {
      const responseUSD = await fetch(func("USD"));
      const responseEUR = await fetch(func("EUR"));

      if (!responseUSD.ok || !responseEUR.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonUSD = (await responseUSD.json()) as CurrencyApiResponse;
      const jsonEUR = (await responseEUR.json()) as CurrencyApiResponse;

      setData({
        USD: jsonUSD,
        EUR: jsonEUR,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const roundToTwo = (num: number | string) => {
    if (typeof num === "number") {
      return num.toFixed(2);
    }
  };

  const usdUah = roundToTwo(data.USD?.conversion_rates["UAH"] || "N/A");
  const eurUah = roundToTwo(data.EUR?.conversion_rates["UAH"] || "N/A");

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Currency Converter</h1>
      <div className={styles.currentCoursesContainer}>
        <div className={styles.currentCourseContainer}>
          <img src={usaFlag} alt="usa flag" className={styles.flag} />
          <p className={styles.currentCourse}>{`USD/UAH: ${usdUah}`}</p>
        </div>
        <div className={styles.currentCourseContainer}>
          <img src={euFlag} alt="eu flag" className={styles.flag} />
          <p className={styles.currentCourse}>{`EUR/UAH: ${eurUah}`}</p>
        </div>
      </div>
    </div>
  );
};
