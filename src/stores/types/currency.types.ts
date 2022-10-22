export interface CurrencyState {
  from: Currency;
  to: Currency;
}

interface Currency {
  value: number;
  type: string;
}

export interface CurrencyData {
  alphaCode: string;
  code: string;
  date: string;
  inverseRate: number;
  name: string;
  numericCode: string;
  rate: number;
}
