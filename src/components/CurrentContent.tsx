import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import CloudSvg from '../assets/svg/cloud.svg';
import SunSvg from '../assets/svg/sun.svg';
import RainSvg from '../assets/svg/rain.svg';
import SnowSvg from '../assets/svg/snow.svg';

export const renderImage = (weather: string) => {
  switch (weather) {
    case 'Clouds':
      return <CloudSvg width={35} height={35} />;
    case 'Clear':
      return <SunSvg width={35} height={35} />;
    case 'Rain':
      return <RainSvg width={35} height={35} />;
    default:
      return <SnowSvg width={35} height={35} />;
  }
};

const Content = ({data}: {data: Array<any>}) => {
  const keyExtractor = (item: any) => item?.dt;

  const renderItem = ({item}: {item: any}) => {
    const date = item.dt_txt.split(' ')[0].split('-');
    const time = item.dt_txt.split(' ')[1].split(':')[0];
    return (
      <View style={styles.itemWrapper}>
        <View>
          <Text style={styles.subText}>
            {date[2]}/{date[1]}
          </Text>
          <Text style={styles.subText}>{time}:00</Text>
        </View>
        {renderImage(item.weather[0].main)}
        <Text style={styles.subText}>{item?.weather[0]?.main}</Text>
      </View>
    );
  };

  const emptyComp = () => (
    <View style={styles.emptyComp}>
      <Text style={styles.emptyText}>
        Please choose up to 5 days from today
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={emptyComp}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    backgroundColor: '#e1eced',
    marginVertical: 10,
    borderRadius: 13,
    padding: 10,
  },
  itemWrapper: {
    height: '100%',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subText: {
    fontSize: 14,
  },
  emptyComp: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '500',
  },
});
export default Content;
