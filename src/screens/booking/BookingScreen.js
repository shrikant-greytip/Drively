import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const BookingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Screen</Text>
      <Button
        title="Go to Car Details"
        onPress={() => navigation.navigate('CarDetails')}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
export default BookingScreen;