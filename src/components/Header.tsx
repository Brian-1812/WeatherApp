import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch} from '../hooks';
import {
  fetchCurrent,
  fetchWeekly,
  IWeatherCurrent,
} from '../redux/features/weatherSlice';
import {convertToCelsius} from '../utils';

interface IProps {
  city: string | null;
  weather: IWeatherCurrent | null;
}

const Header = (props: IProps) => {
  const {city, weather} = props;
  const dispatch = useAppDispatch();
  const [cityInput, setCityInput] = useState('');
  const InputRef = useRef<any>(null);

  const submit = () => {
    dispatch(fetchCurrent(cityInput));
    dispatch(fetchWeekly(cityInput));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather</Text>
      <TextInput
        ref={InputRef}
        value={cityInput}
        placeholder="Search for a city..."
        onChangeText={setCityInput}
        style={[styles.cityInput]}
        onSubmitEditing={submit}
      />
      <View style={styles.weatherWrapper}>
        <View style={styles.weatherRow}>
          <Text style={styles.cityLabel}>{city ?? 'Select city'}</Text>
          {!!weather && (
            <Text style={styles.temp}>
              {weather?.temp ? convertToCelsius(weather?.temp) : '--'}°C
            </Text>
          )}
        </View>
        <View style={styles.weatherRow}>
          <Text style={styles.subText}>
            Humidity: {weather?.humidity ?? '--'} %
          </Text>
          <Text style={styles.subText}>
            Pressure: {weather?.pressure ?? '--'} hPa
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 5,
  },
  cityLabel: {
    fontSize: 32,
    color: '#fff',
  },
  cityInput: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    fontSize: 18,
    borderWidth: 0.4,
    borderRadius: 7,
    marginVertical: 10,
  },
  weatherWrapper: {
    width: '100%',
    borderRadius: 12,
    justifyContent: 'center',
    padding: 13,
    backgroundColor: '#1995a6',
  },
  weatherRow: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  temp: {
    fontSize: 28,
    color: '#fff',
  },
  subText: {
    fontSize: 19,
    marginTop: 20,
    color: '#fff',
  },
});

export default Header;
