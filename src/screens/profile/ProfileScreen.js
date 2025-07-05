// src/screens/profile/ProfileScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    joinDate: 'January 2023',
    totalTrips: 24,
    totalDistance: '1,250 km',
    favoriteCarType: 'Sedan',
    rating: 4.8,
  });

  const [editForm, setEditForm] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    location: userInfo.location,
  });

  const statsData = [
    {
      label: 'Total Trips',
      value: userInfo.totalTrips.toString(),
      icon: 'directions-car',
    },
    {
      label: 'Distance Traveled',
      value: userInfo.totalDistance,
      icon: 'straighten',
    },
    { label: 'Member Since', value: userInfo.joinDate, icon: 'calendar-today' },
    { label: 'Rating', value: userInfo.rating.toString(), icon: 'star' },
  ];

  const menuItems = [
    {
      title: 'Personal Information',
      icon: 'person',
      onPress: () => setEditModalVisible(true),
      hasArrow: true,
    },
    {
      title: 'Payment Methods',
      icon: 'payment',
      onPress: () =>
        Alert.alert('Payment Methods', 'Manage your payment methods'),
      hasArrow: true,
    },
    {
      title: 'Driving License',
      icon: 'credit-card',
      onPress: () =>
        Alert.alert('Driving License', 'Manage your driving license'),
      hasArrow: true,
    },
    {
      title: 'Trip History',
      icon: 'history',
      onPress: () => navigation.navigate('Booking'),
      hasArrow: true,
    },
    {
      title: 'Favorite Cars',
      icon: 'favorite',
      onPress: () => Alert.alert('Favorite Cars', 'View your favorite cars'),
      hasArrow: true,
    },
    {
      title: 'Refer Friends',
      icon: 'share',
      onPress: () => Alert.alert('Refer Friends', 'Share the app with friends'),
      hasArrow: true,
    },
  ];

  const settingsItems = [
    {
      title: 'Push Notifications',
      icon: 'notifications',
      component: (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
          thumbColor={notificationsEnabled ? '#fff' : '#fff'}
        />
      ),
    },
    {
      title: 'Location Services',
      icon: 'location-on',
      component: (
        <Switch
          value={locationEnabled}
          onValueChange={setLocationEnabled}
          trackColor={{ false: '#e5e7eb', true: '#6366f1' }}
          thumbColor={locationEnabled ? '#fff' : '#fff'}
        />
      ),
    },
    {
      title: 'Privacy Policy',
      icon: 'privacy-tip',
      onPress: () => Alert.alert('Privacy Policy', 'View privacy policy'),
      hasArrow: true,
    },
    {
      title: 'Terms of Service',
      icon: 'description',
      onPress: () => Alert.alert('Terms of Service', 'View terms of service'),
      hasArrow: true,
    },
    {
      title: 'Help & Support',
      icon: 'help',
      onPress: () => Alert.alert('Help & Support', 'Get help and support'),
      hasArrow: true,
    },
    {
      title: 'About App',
      icon: 'info',
      onPress: () => Alert.alert('About App', 'Drively App v1.0.0'),
      hasArrow: true,
    },
  ];

  const handleSaveProfile = () => {
    setUserInfo({
      ...userInfo,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      location: editForm.location,
    });
    setEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully');
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          }),
      },
    ]);
  };

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={index}
      style={styles.menuItem}
      onPress={item.onPress}
    >
      <View style={styles.menuItemLeft}>
        <View style={styles.menuItemIcon}>
          <Icon name={item.icon} size={20} color="#6366f1" />
        </View>
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      {item.component ||
        (item.hasArrow && (
          <Icon name="chevron-right" size={20} color="#64748b" />
        ))}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient colors={['#6366f1', '#8b5cf6']} style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>My Profile</Text>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => Alert.alert('Settings', 'App settings')}
            >
              <Icon name="settings" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Profile Info */}
          <View style={styles.profileInfo}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/80x80' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <Icon name="camera-alt" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileDetails}>
              <Text style={styles.userName}>{userInfo.name}</Text>
              <Text style={styles.userEmail}>{userInfo.email}</Text>
              <View style={styles.userRating}>
                <Icon name="star" size={16} color="#fbbf24" />
                <Text style={styles.ratingText}>{userInfo.rating}</Text>
                <Text style={styles.ratingLabel}>User Rating</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {statsData.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name={stat.icon} size={24} color="#6366f1" />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#10b981', '#059669']}
              style={styles.quickActionGradient}
            >
              <Icon name="directions-car" size={20} color="#fff" />
              <Text style={styles.quickActionText}>Book a Car</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction}>
            <LinearGradient
              colors={['#3b82f6', '#1d4ed8']}
              style={styles.quickActionGradient}
            >
              <Icon name="history" size={20} color="#fff" />
              <Text style={styles.quickActionText}>My Trips</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Menu Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.menuContainer}>
            {menuItems.map(renderMenuItem)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.menuContainer}>
            {settingsItems.map(renderMenuItem)}
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Icon name="close" size={24} color="#64748b" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalContent}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Full Name</Text>
                <TextInput
                  style={styles.formInput}
                  value={editForm.name}
                  onChangeText={text =>
                    setEditForm({ ...editForm, name: text })
                  }
                  placeholder="Enter your full name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                  style={styles.formInput}
                  value={editForm.email}
                  onChangeText={text =>
                    setEditForm({ ...editForm, email: text })
                  }
                  placeholder="Enter your email"
                  keyboardType="email-address"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Phone Number</Text>
                <TextInput
                  style={styles.formInput}
                  value={editForm.phone}
                  onChangeText={text =>
                    setEditForm({ ...editForm, phone: text })
                  }
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Location</Text>
                <TextInput
                  style={styles.formInput}
                  value={editForm.location}
                  onChangeText={text =>
                    setEditForm({ ...editForm, location: text })
                  }
                  placeholder="Enter your location"
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveProfile}
              >
                <LinearGradient
                  colors={['#6366f1', '#8b5cf6']}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  settingsButton: {
    padding: 8,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 6,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  userRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 4,
  },
  ratingLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: -20,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    marginHorizontal: '1%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 8,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  quickAction: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickActionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  quickActionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
    marginLeft: 8,
  },
  bottomPadding: {
    height: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1e293b',
  },
  modalActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default ProfileScreen;
