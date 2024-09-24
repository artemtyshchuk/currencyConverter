import { useState, useEffect } from "react";
import { CurrencyApiResponse } from "types";

const apiKey = process.env.REACT_APP_EXCHANGE_API_KEY;

export const useFetchHeaderData = (currencies: string[]) => {
  const [data, setData] = useState<{
    [key: string]: CurrencyApiResponse | null;
  }>({});

  const fetchData = async () => {
    try {
      const fetchedRates: { [key: string]: CurrencyApiResponse | null } = {};

      for (const currency of currencies) {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${currency}`);
        }
        const dataJson = await response.json();
        fetchedRates[currency] = dataJson;
      }

      setData(fetchedRates);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [currencies]);

  return { data };
};
