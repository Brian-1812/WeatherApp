import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAppSelector} from '../../hooks';
import Header from '../../components/Header';
import CurrentContent from '../../components/CurrentContent';
import WeeklyContent from '../../components/WeeklyContent';

const Home = () => {
  //ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  // redux state
  const weatherState = useAppSelector(state => state.weather);

  const [date, setDate] = useState<Date | null>(null);
  const [weatherDated, setWeatherDated] = useState<Array<any>>(
    weatherState.weekly.slice(0, 8),
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    if (date) {
      const [day, month, year] = [
        date?.getDate(),
        date?.getMonth(),
        date?.getFullYear(),
      ];
      const newWeatherDated = weatherState.weekly.filter(item => {
        const newDate = new Date(item.dt * 1000);
        const [cDay, cMonth, cYear] = [
          newDate.getDate(),
          newDate.getMonth(),
          newDate.getFullYear(),
        ];
        return cDay === day && cMonth === month && cYear === year;
      });
      setWeatherDated(newWeatherDated);
    }
  }, [date]);

  // const handleClosePress = () => bottomSheetRef.current?.close();
  const handleOpenPress = () => bottomSheetRef.current?.expand();
  const snapPoints = useMemo(() => ['90%'], []);
  // const handleSheetChanges = useCallback((index: number) => {
  //   console.log('handleSheetChanges', index);
  // }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async (date: Date) => {
    setDate(date);
    hideDatePicker();
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <Header city={weatherState.city} weather={weatherState?.current} />
        <View style={styles.dateWrapper}>
          <Text style={styles.subTitle}>
            Weather {date ? `on ${date.toDateString()}` : 'for 24 hours'}
          </Text>
          <TouchableOpacity
            onPress={showDatePicker}
            style={styles.datePickerWrapper}>
            <Text>{date ? date?.toLocaleDateString() : 'Select date'}</Text>
          </TouchableOpacity>
        </View>
        {<CurrentContent data={weatherDated} />}
        <TouchableOpacity
          onPress={handleOpenPress}
          style={[styles.datePickerWrapper, {backgroundColor: '#098036'}]}>
          <Text style={styles.buttonText}>Show full 5 day weather</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          // onChange={handleSheetChanges}
        >
          <WeeklyContent data={weatherState.weekly} />
        </BottomSheet>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  city: {
    fontSize: 23,
    color: '#0044ff',
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 42,
    fontWeight: '700',
    color: 'red',
    alignSelf: 'center',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  datePickerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1995a6',
    borderRadius: 7,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
