// src/screens/booking/BookingScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const BookingScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('current');
  const [searchText, setSearchText] = useState('');

  // Mock data for bookings
  const currentBookings = [
    {
      id: 1,
      carName: 'Tesla Model 3',
      carImage: require('../../assets/tesla.jpeg'),
      location: 'Mumbai, Maharashtra',
      startDate: '2024-07-06',
      endDate: '2024-07-08',
      status: 'active',
      price: 2500,
      bookingId: 'BK001',
    },
    {
      id: 2,
      carName: 'BMW X5',
      carImage: require('../../assets/bmwx5.webp'),
      location: 'Delhi, India',
      startDate: '2024-07-10',
      endDate: '2024-07-12',
      status: 'confirmed',
      price: 3200,
      bookingId: 'BK002',
    },
  ];

  const pastBookings = [
    {
      id: 3,
      carName: 'Audi A4',
      carImage: require('../../assets/audi14.webp'),
      location: 'Bangalore, Karnataka',
      startDate: '2024-06-15',
      endDate: '2024-06-17',
      status: 'completed',
      price: 2800,
      bookingId: 'BK003',
      rating: 4.8,
    },
    {
      id: 4,
      carName: 'Mercedes C-Class',
      carImage: require('../../assets/tesla.jpeg'),
      location: 'Chennai, Tamil Nadu',
      startDate: '2024-05-20',
      endDate: '2024-05-22',
      status: 'completed',
      price: 3500,
      bookingId: 'BK004',
      rating: 4.9,
    },
  ];

  const getStatusColor = status => {
    switch (status) {
      case 'active':
        return '#10b981';
      case 'confirmed':
        return '#3b82f6';
      case 'completed':
        return '#64748b';
      default:
        return '#6366f1';
    }
  };

  const getStatusText = status => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  const handleBookingAction = (booking, action) => {
    switch (action) {
      case 'view':
        Alert.alert('Booking Details', `View details for ${booking.carName}`);
        break;
      case 'modify':
        Alert.alert('Modify Booking', `Modify booking for ${booking.carName}`);
        break;
      case 'cancel':
        Alert.alert(
          'Cancel Booking',
          `Are you sure you want to cancel booking for ${booking.carName}?`,
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => console.log('Booking cancelled') },
          ],
        );
        break;
      case 'rebook':
        navigation.navigate('CarDetails', { car: booking });
        break;
      default:
        break;
    }
  };

  const renderBookingCard = booking => (
    <View key={booking.id} style={styles.bookingCard}>
      <View style={styles.bookingHeader}>
        <Image source={booking.carImage} style={styles.bookingCarImage} />
        <View style={styles.bookingInfo}>
          <Text style={styles.bookingCarName}>{booking.carName}</Text>
          <View style={styles.bookingLocation}>
            <Icon name="location-on" size={14} color="#6366f1" />
            <Text style={styles.bookingLocationText}>{booking.location}</Text>
          </View>
          <View style={styles.bookingStatus}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(booking.status) },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: getStatusColor(booking.status) },
              ]}
            >
              {getStatusText(booking.status)}
            </Text>
          </View>
        </View>
        <View style={styles.bookingPrice}>
          <Text style={styles.priceText}>₹{booking.price}</Text>
          <Text style={styles.priceUnit}>total</Text>
        </View>
      </View>

      <View style={styles.bookingDates}>
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>Start Date</Text>
          <Text style={styles.dateValue}>
            {new Date(booking.startDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.dateSeparator} />
        <View style={styles.dateItem}>
          <Text style={styles.dateLabel}>End Date</Text>
          <Text style={styles.dateValue}>
            {new Date(booking.endDate).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.bookingId}>
        <Text style={styles.bookingIdText}>
          Booking ID: {booking.bookingId}
        </Text>
      </View>

      {booking.rating && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Your Rating: </Text>
          <View style={styles.ratingStars}>
            {[...Array(5)].map((_, index) => (
              <Icon
                key={index}
                name="star"
                size={16}
                color={
                  index < Math.floor(booking.rating) ? '#fbbf24' : '#e5e7eb'
                }
              />
            ))}
            <Text style={styles.ratingValue}>{booking.rating}</Text>
          </View>
        </View>
      )}

      <View style={styles.bookingActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleBookingAction(booking, 'view')}
        >
          <Icon name="visibility" size={18} color="#6366f1" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>

        {booking.status === 'active' || booking.status === 'confirmed' ? (
          <>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleBookingAction(booking, 'modify')}
            >
              <Icon name="edit" size={18} color="#10b981" />
              <Text style={styles.actionButtonText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleBookingAction(booking, 'cancel')}
            >
              <Icon name="cancel" size={18} color="#ef4444" />
              <Text style={styles.actionButtonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleBookingAction(booking, 'rebook')}
          >
            <Icon name="refresh" size={18} color="#10b981" />
            <Text style={styles.actionButtonText}>Book Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const filteredCurrentBookings = currentBookings.filter(booking =>
    booking.carName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredPastBookings = pastBookings.filter(booking =>
    booking.carName.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications" size={24} color="#1e293b" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#64748b" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search bookings..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'current' && styles.activeTab]}
          onPress={() => setActiveTab('current')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'current' && styles.activeTabText,
            ]}
          >
            Current Bookings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'past' && styles.activeTab]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'past' && styles.activeTabText,
            ]}
          >
            Past Bookings
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bookings List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'current' ? (
          filteredCurrentBookings.length > 0 ? (
            filteredCurrentBookings.map(renderBookingCard)
          ) : (
            <View style={styles.emptyState}>
              <Icon name="event-busy" size={64} color="#64748b" />
              <Text style={styles.emptyStateTitle}>No Current Bookings</Text>
              <Text style={styles.emptyStateText}>
                You don't have any active bookings at the moment.
              </Text>
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate('Home')}
              >
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={styles.exploreButtonGradient}
                >
                  <Text style={styles.exploreButtonText}>Explore Cars</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )
        ) : filteredPastBookings.length > 0 ? (
          filteredPastBookings.map(renderBookingCard)
        ) : (
          <View style={styles.emptyState}>
            <Icon name="history" size={64} color="#64748b" />
            <Text style={styles.emptyStateTitle}>No Past Bookings</Text>
            <Text style={styles.emptyStateText}>
              Your booking history will appear here once you complete your first
              trip.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Icon name="search" size={20} color="#6366f1" />
          <Text style={styles.quickActionText}>Find Cars</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => Alert.alert('Support', 'Contact support for help')}
        >
          <Icon name="help" size={20} color="#6366f1" />
          <Text style={styles.quickActionText}>Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#6366f1',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  activeTabText: {
    color: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bookingCarImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  bookingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookingCarName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  bookingLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingLocationText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  bookingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookingPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  priceUnit: {
    fontSize: 12,
    color: '#64748b',
  },
  bookingDates: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  dateItem: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  dateSeparator: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  bookingId: {
    marginBottom: 12,
  },
  bookingIdText: {
    fontSize: 12,
    color: '#64748b',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingText: {
    fontSize: 14,
    color: '#64748b',
  },
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 4,
  },
  bookingActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1e293b',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  exploreButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  exploreButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  quickActionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginHorizontal: 8,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginLeft: 6,
  },
});

export default BookingScreen;
