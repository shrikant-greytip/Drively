import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const INITIAL_REGION = {
  latitude: -1.286389,
  longitude: 36.817223,
  latitudeDelta: 0.2,
  longitudeDelta: 0.2,
};
const carImages = {
  tesla: require('../../assets/tesla.jpeg'),
  bmw: require('../../assets/bmwx5.webp'),
  audi: require('../../assets/audi14.webp'),
};
const MOCK_CARS = [
  {
    id: 1,
    name: 'Tesla Model 3',
    price: 89,
    latitude: -1.286389,
    longitude: 36.817223,
    image: carImages.tesla,
  },
  {
    id: 2,
    name: 'BMW X5',
    price: 150,
    latitude: -4.0435,
    longitude: 39.6682,
    image: carImages.tesla,
  },
  {
    id: 3,
    name: 'Audi A4',
    price: 120,
    latitude: -0.0917,
    longitude: 34.767956,
    image: carImages.tesla,
  },
  {
    id: 4,
    name: 'Toyota Prado',
    price: 100,
    latitude: -1.3,
    longitude: 36.8,
    image: carImages.tesla,
  },
  {
    id: 5,
    name: 'Mazda Demio',
    price: 60,
    latitude: -1.3292,
    longitude: 36.7156,
    image: carImages.tesla
  },
];

const SearchScreen = ({ navigation }) => {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    setCars(MOCK_CARS);
    requestLocationPermission();
  }, []);

 

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'We need access to your location to show nearby cars.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  };

  const fitMapToCars = () => {
    if (mapRef.current && cars.length > 0) {
      mapRef.current.fitToCoordinates(
        cars.map(car => ({
          latitude: car.latitude,
          longitude: car.longitude,
        })),
        {
          edgePadding: { top: 100, right: 100, bottom: 200, left: 100 },
          animated: true,
        },
      );
    }
  };

  const handleMarkerPress = car => {
    console.log('Marker pressed:', car.name);
    setSelectedCar(car); 
     
  };

  const handleViewDetails = () => {
    if (selectedCar) {
      navigation.navigate('CarDetails', { car: selectedCar });
    }
  };

  const handleLocationButtonPress = () => {
    
    fitMapToCars();
    setSelectedCar(null); 
  };
console.log('this work')
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={INITIAL_REGION}
      >
        {cars.map(car => (
          <Marker
            key={car.id}
            coordinate={{ latitude: car.latitude, longitude: car.longitude }}
            onPress={() => handleMarkerPress(car)} 
          >
            <View style={styles.markerContainer}>
              <View style={styles.marker}>
                <Icon name="directions-car" size={20} color="#fff" />
              </View>
              <Text style={styles.markerPrice}>₹{car.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      {selectedCar && (
        <View style={styles.carDetails}>
          <View style={styles.carInfo}>
            <Text style={styles.carName}>{selectedCar.name}</Text>
            <Text style={styles.carPrice}>₹{selectedCar.price}/day</Text>
          </View>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={handleViewDetails}
          >
            <Text style={styles.viewButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.currentLocationButton}
        onPress={handleLocationButtonPress}
      >
        <Icon name="my-location" size={24} color="#6366f1" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerContainer: { alignItems: 'center' },
  marker: {
    backgroundColor: '#6366f1',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  markerPrice: {
    backgroundColor: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 4,
  },
  carDetails: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  carInfo: { flex: 1 },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: '600',
  },
  viewButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  currentLocationButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default SearchScreen;
