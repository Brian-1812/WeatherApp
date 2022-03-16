import React, {useEffect, useState} from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {groupByDay, convertToCelsius} from '../utils';
import {renderImage} from './CurrentContent';

const Content = ({data}: {data: any}) => {
  const [groupedData, setGroupedData] = useState<any[]>([]);
  useEffect(() => {
    setGroupedData(groupByDay(data));
  }, [data]);

  const renderItem = ({item}: {item: any}) => {
    return (
      <View style={styles.item}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.itemText}>
            {item.dt_txt.split(' ')[1].slice(0, 5)}
          </Text>
          {renderImage(item.weather[0].main)}
          <Text style={styles.itemText}>{item.weather[0].main}</Text>
        </View>
        <View>
          <Text style={styles.itemText}>Wind</Text>
          <Text style={styles.subText}>{item.wind.speed} m/s</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.itemText}>Temperature</Text>
          <Text style={styles.subText}>
            {convertToCelsius(item.main.temp)} °C
          </Text>
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({section}: {section: any}) => (
    <View style={styles.headerWrapper}>
      <Text style={styles.sectionHeader}>
        {new Date(section.data[0].dt * 1000).toDateString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={groupedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerWrapper: {
    backgroundColor: '#f5f5f5',
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
    borderBottomWidth: 0.4,
    paddingVertical: 5,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
  },
});
export default Content;
