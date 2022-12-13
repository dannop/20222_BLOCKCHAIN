import Moment from 'moment';

export const groupBy = (xs: any, key: any) => {
  return xs.reduce((rv: any, x: any) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const sum = (array: any, key: string) => {
  return array.reduce((a: any, b: any) => a + (b[key] || 0), 0);
}

export const filteredSum = (array: any, key: string, filterArray: any) => {
  return array.reduce((acc: any, obj: any) => {
    if (obj[filterArray[0]] === filterArray[1])
        return acc + (obj[key] || 0)
    else 
        return acc
  }, 0);
}

export const formatReqDate = (date: string) => {
  return Moment(date).format('MM/DD/YYYY');
}

export const formatLocalDate = (date: string) => {
  return Moment(date).format('DD/MM/YYYY');
}

export const formatCalendarDate = (date: string) => {
  return Moment(date).format('YYYY-MM-DD');
}

export const formatCurrency = (value: any, precision=2) => {
  var translation = localStorage.getItem('translation');
  var currency = 'BRL';

  if (translation) {
    translation = translation.replace('_', '-');
    if (translation === 'en') currency = 'USD';
    else if (translation === 'es') currency = 'EUR';
  } else translation = 'pt-BR';
  
  return new Intl.NumberFormat(translation, {
    style: 'currency',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
    currency}).format(value);
}

export const formatDecimal = (value: any, precision=2) => {
  var translation = localStorage.getItem('translation');
  
  if (translation){
    translation = translation.replace('_', '-');
  } else translation = 'pt-BR';

  return new Intl.NumberFormat(translation, {
    style: 'decimal',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision}).format(value);
}

export const getPhoneMask = (phone: string) => {
  return phone.length <= 14 ? "(99) 9999-99999" : "(99) 99999-9999";
};

export const currencyToFloat = (value: string) => {
    return parseFloat(value.replace('R$', '').replaceAll('.', '').replace(',', '.'))
}

export const removePhoneMask = (phone: string) => {
  return phone.replace('(', '').replace(')', '').replace('-', '').replace(' ', '');
}

export const reduceCharLength = (name: string) => {
  if (name.length > 20) return `${name.substring(0, 20)} ...`;
  else return name;
}