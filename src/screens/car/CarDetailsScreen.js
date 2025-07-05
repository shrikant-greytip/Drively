// src/screens/car/CarDetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const CarDetailsScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const carImages = [
    require('../../assets/tesla.jpeg'),
    require('../../assets/bmwx5.webp'),
    require('../../assets/audi14.webp'),
  ];

  const features = [
    { icon: 'ac-unit', name: 'AC' },
    { icon: 'bluetooth', name: 'Bluetooth' },
    { icon: 'usb', name: 'USB Port' },
    { icon: 'radio', name: 'Radio' },
    { icon: 'gps-fixed', name: 'GPS' },
    { icon: 'camera', name: 'Camera' },
  ];

  const handleBookNow = () => {
    navigation.navigate('BookingConfirmation', { car });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.favoriteButton}>
            <Icon name="favorite-border" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Car Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={event => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setSelectedImageIndex(index);
            }}
          >
            {carImages.map((image, index) => (
              <Image key={index} source={image} style={styles.carImage} />
            ))}
          </ScrollView>

          <View style={styles.imageIndicator}>
            {carImages.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Car Info */}
        <View style={styles.carInfo}>
          <View style={styles.carHeader}>
            <View>
              <Text style={styles.carName}>{car.name}</Text>
              <Text style={styles.carType}>{car.type || 'Sedan'}</Text>
            </View>
            <View style={styles.rating}>
              <Icon name="star" size={20} color="#fbbf24" />
              <Text style={styles.ratingText}>{car.rating}</Text>
            </View>
          </View>

          <View style={styles.location}>
            <Icon name="location-on" size={16} color="#6366f1" />
            <Text style={styles.locationText}>{car.location}</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{car.price}</Text>
            <Text style={styles.priceUnit}>/day</Text>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Icon name={feature.icon} size={24} color="#6366f1" />
                  <Text style={styles.featureName}>{feature.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Perfect for city drives and long trips. This well-maintained
              vehicle offers comfort, safety, and style. Fully insured and
              regularly serviced.
            </Text>
          </View>

          {/* Host Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Host</Text>
            <View style={styles.hostInfo}>
              <Image
                source={{ uri: 'https://via.placeholder.com/50x50' }}
                style={styles.hostImage}
              />
              <View style={styles.hostDetails}>
                <Text style={styles.hostName}>John Doe</Text>
                <Text style={styles.hostRating}>⭐ 4.9 (120 trips)</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Icon name="message" size={20} color="#6366f1" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            <View style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewerName}>Sarah M.</Text>
                <Text style={styles.reviewRating}>⭐ 5.0</Text>
              </View>
              <Text style={styles.reviewText}>
                Great car! Very clean and comfortable. Host was very responsive.
              </Text>
              <Text style={styles.reviewDate}>2 days ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.bookingSection}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.bookButtonGradient}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 25,
  },
  favoriteButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 12,
    borderRadius: 25,
  },
  imageContainer: {
    position: 'relative',
  },
  carImage: {
    width: width,
    height: 250,
    backgroundColor: '#e5e7eb',
  },
  imageIndicator: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
  },
  carInfo: {
    padding: 20,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  carType: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#92400e',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#64748b',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  priceUnit: {
    fontSize: 16,
    color: '#64748b',
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureName: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 22,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e5e7eb',
  },
  hostDetails: {
    flex: 1,
    marginLeft: 12,
  },
  hostName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  hostRating: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  contactButton: {
    padding: 12,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
  },
  reviewItem: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  reviewRating: {
    fontSize: 12,
    color: '#64748b',
  },
  reviewText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9ca3af',
  },
  bookingSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  bookButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  bookButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CarDetailsScreen;
