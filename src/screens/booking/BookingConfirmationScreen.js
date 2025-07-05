// src/screens/booking/BookingConfirmationScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';

const BookingConfirmationScreen = ({ route, navigation }) => {
  const { car } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 24 * 60 * 60 * 1000),
  );
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const calculateDays = () => {
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    const subtotal = car.price * days;
    const tax = subtotal * 0.18; // 18% GST
    const serviceFee = 99;
    return {
      subtotal,
      tax,
      serviceFee,
      total: subtotal + tax + serviceFee,
    };
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      'Booking Confirmed!',
      `Your booking for ${car.name} has been confirmed. You will receive a confirmation email shortly.`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home'),
        },
      ],
    );
  };

  const pricing = calculateTotal();

  return (
    <View style={styles.container}>

      <ScrollView style={styles.scrollView}>
        {/* Car Summary */}
        <View style={styles.carSummary}>
          <View style={styles.carInfo}>
            <Text style={styles.carName}>{car.name}</Text>
            <Text style={styles.carLocation}>{car.location}</Text>
          </View>
          <Text style={styles.carPrice}>₹{car.price}/day</Text>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trip Dates</Text>

          <View style={styles.dateContainer}>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Icon name="calendar-today" size={20} color="#6366f1" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>Start Date</Text>
                <Text style={styles.dateValue}>
                  {startDate.toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Icon name="calendar-today" size={20} color="#6366f1" />
              <View style={styles.dateInfo}>
                <Text style={styles.dateLabel}>End Date</Text>
                <Text style={styles.dateValue}>
                  {endDate.toLocaleDateString()}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.tripDuration}>
            <Text style={styles.durationText}>
              Trip Duration: {calculateDays()} day
              {calculateDays() > 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        {/* Additional Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Any special requests or notes..."
            value={additionalNotes}
            onChangeText={setAdditionalNotes}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Pricing Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing Breakdown</Text>
          <View style={styles.pricingContainer}>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>
                ₹{car.price} × {calculateDays()} day
                {calculateDays() > 1 ? 's' : ''}
              </Text>
              <Text style={styles.pricingValue}>₹{pricing.subtotal}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Service Fee</Text>
              <Text style={styles.pricingValue}>₹{pricing.serviceFee}</Text>
            </View>
            <View style={styles.pricingRow}>
              <Text style={styles.pricingLabel}>Tax (18% GST)</Text>
              <Text style={styles.pricingValue}>₹{pricing.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.pricingDivider} />
            <View style={styles.pricingRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{pricing.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              • Valid driving license required
            </Text>
            <Text style={styles.termsText}>
              • Fuel to be returned at same level
            </Text>
            <Text style={styles.termsText}>
              • No smoking inside the vehicle
            </Text>
            <Text style={styles.termsText}>
              • Late return charges: ₹200/hour
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.confirmSection}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirmBooking}
        >
          <LinearGradient
            colors={['#6366f1', '#8b5cf6']}
            style={styles.confirmButtonGradient}
          >
            <Text style={styles.confirmButtonText}>
              Confirm Booking - ₹{pricing.total.toFixed(2)}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      <DatePicker
        modal
        open={showStartDatePicker}
        date={startDate}
        mode="date"
        onConfirm={date => {
          setShowStartDatePicker(false);
          setStartDate(date);
        }}
        onCancel={() => setShowStartDatePicker(false)}
      />

      <DatePicker
        modal
        open={showEndDatePicker}
        date={endDate}
        mode="date"
        onConfirm={date => {
          setShowEndDatePicker(false);
          setEndDate(date);
        }}
        onCancel={() => setShowEndDatePicker(false)}
      />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  carSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  carLocation: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
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
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dateButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dateInfo: {
    marginLeft: 12,
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
  tripDuration: {
    backgroundColor: '#f1f5f9',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  notesInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 14,
    color: '#1e293b',
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  pricingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pricingLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  pricingValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  pricingDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  termsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  termsText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  confirmSection: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  confirmButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BookingConfirmationScreen;
