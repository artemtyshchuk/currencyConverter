import { useEffect, useState } from "react";

export const useFetchCurrencyConverterData = () => {
  const [data, setData] = useState<{
    [key: string]: number;
  }>({});
  const [defaultCurrency] = useState<string>("USD");

  const apiKey = process.env.REACT_APP_EXCHANGE_API_KEY;

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

  return { data, defaultCurrency };
};
