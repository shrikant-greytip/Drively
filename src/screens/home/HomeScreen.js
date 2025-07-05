// src/screens/home/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;


const HomeScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [cars, setCars] = useState([]);
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    loadCars();
  }, []);
  const carImages = {
    tesla: require('../../assets/tesla.jpeg'),
    bmw: require('../../assets/bmwx5.webp'),
    audi: require('../../assets/audi14.webp'),
  };
  

  const loadCars = () => {
    // Mock car data
    const mockCars = [
      {
        id: 1,
        name: 'Tesla Model 3',
        price: 89,
        rating: 4.9,
        image: carImages?.tesla,
        location: 'Pune, Maharashtra',
        type: 'Electric',
        features: ['Auto', 'AC', 'GPS'],
      },
      {
        id: 2,
        name: 'BMW X5',
        price: 150,
        rating: 4.8,
        image: carImages?.bmw,
        location: 'Mumbai, Maharashtra',
        type: 'SUV',
        features: ['Auto', 'AC', 'GPS', 'Leather'],
      },
      {
        id: 3,
        name: 'Audi A4',
        price: 120,
        rating: 4.7,
        image: carImages?.audi,
        location: 'Pune, Maharashtra',
        type: 'Sedan',
        features: ['Auto', 'AC', 'GPS'],
      },
    ];

    setCars(mockCars);
    setFeaturedCars(mockCars.slice(0, 3));
  };

  const renderCarCard = ({ item }, isFeatured = false) => (
    <TouchableOpacity
      style={[
        styles.carCard,
        isFeatured ? styles.featuredCard : styles.fullWidthCard,
      ]}
      onPress={() => navigation.navigate('CarDetails', { car: item })}
    >
      <Image source={item.image} style={styles.carImage} />
      <View style={styles.carInfo}>
        <Text style={styles.carName}>{item.name}</Text>
        <Text style={styles.carLocation}>{item.location}</Text>
        <View style={styles.carFeatures}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <View style={styles.carFooter}>
          <View style={styles.rating}>
            <Icon name="star" size={16} color="#fbbf24" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.price}>₹{item.price}/day</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subtitle}>Find your perfect ride</Text>

          <View style={styles.searchContainer}>
            <Icon
              name="search"
              size={20}
              color="#666"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search cars, locations..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="map" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Near Me</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="favorite" size={24} color="#6366f1" />
            <Text style={styles.actionText}>Favorites</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Icon name="history" size={24} color="#6366f1" />
            <Text style={styles.actionText}>History</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Cars</Text>
          <FlatList
            data={featuredCars}
            renderItem={({ item }) => renderCarCard({ item }, true)}
            keyExtractor={item => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Cars</Text>
          <FlatList
            data={cars}
            renderItem={({ item }) => renderCarCard({ item }, false)}
            keyExtractor={item => item.id.toString()}
            numColumns={1}
            scrollEnabled={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: '#6366f1',
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  featuredList: {
    paddingRight: 20,
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredCard: {
    width: 280,
    marginRight: 16,
  },
  fullWidthCard: {
    width: screenWidth - 40, // 20 padding on each side
    alignSelf: 'center',
  },

  carImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#e5e7eb',
  },
  carInfo: {
    padding: 16,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  carLocation: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  carFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  featureTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#64748b',
  },
  carFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748b',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
});

export default HomeScreen;
