import _ from 'lodash';

export const convertToCelsius = (kelvin: number) => {
  return Math.round(kelvin - 273.15);
};

export const groupByDay = (list: any[]) => {
  const data = _.groupBy(list, (item: any) => {
    const date = new Date(item.dt * 1000).getDate().toString();
    return date;
  });
  const newData = Object.keys(data).map(key => ({label: key, data: data[key]}));
  return newData;
};
