import axios from "axios";
import { useEffect, useState } from "react";
import { ICurrencyType } from "~/types";

const BASE_URL_HNB = "https://api.hnb.hr/tecajn/v2";

interface IExchangeType {
  [ICurrencyType.EUR]: number;
  [ICurrencyType.USD]: number;
  [ICurrencyType.YEN]: number;
}

export const useExchangeRate = () => {
  const [list, setList] = useState<IExchangeType>({
    [ICurrencyType.EUR]: 0,
    [ICurrencyType.USD]: 0,
    [ICurrencyType.YEN]: 0,
  });

  const fetchData = async () => {
    try {
      const { data } = await axios.get(BASE_URL_HNB);
      const rates = data.reduce(
        (
          previousValue: IExchangeType,
          currentValue: {
            srednji_tecaj: string;
            jedinica: string;
            valuta: string;
          }
        ) => {
          const rate =
            parseFloat(currentValue.srednji_tecaj.replace(",", ".")) /
            parseInt(currentValue.jedinica);
          if (currentValue.valuta === "JPY") {
            return { ...previousValue, [ICurrencyType.YEN]: rate };
          }
          if (currentValue.valuta === ICurrencyType.EUR) {
            return { ...previousValue, [ICurrencyType.EUR]: rate };
          }
          if (currentValue.valuta === ICurrencyType.USD) {
            return { ...previousValue, [ICurrencyType.USD]: rate };
          }
          return previousValue;
        },
        {
          [ICurrencyType.EUR]: 0,
          [ICurrencyType.USD]: 0,
          [ICurrencyType.YEN]: 0,
        }
      );
      setList(rates);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateExchangeRate = (
    initialCurrency: ICurrencyType,
    endCurrency: ICurrencyType
  ) => {
    return list[initialCurrency] / list[endCurrency];
  };

  const calculateAmount = (
    amount: string,
    initialCurrency: ICurrencyType,
    endCurrency: ICurrencyType
  ): number => {
    const exchangeRate = calculateExchangeRate(initialCurrency, endCurrency);
    return parseFloat(amount) * exchangeRate;
  };

  return { calculateAmount, calculateExchangeRate };
};
