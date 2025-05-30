// App.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Sample data for 24 pages across different categories
const guidePages = [
  // Switches
  { id: 1, title: 'Smart Light Switch Setup', category: 'switches', content: 'Learn how to install and configure your smart light switches...' },
  { id: 2, title: 'Dimmer Switch Controls', category: 'switches', content: 'Master the art of controlling dimmer switches remotely...' },
  { id: 3, title: 'Multi-Gang Switch Configuration', category: 'switches', content: 'Configure multiple switches in one panel...' },
  { id: 4, title: 'Switch Scheduling', category: 'switches', content: 'Set up automated schedules for your switches...' },
  
  // Devices
  { id: 5, title: 'Smart Thermostat Setup', category: 'devices', content: 'Connect and configure your smart thermostat...' },
  { id: 6, title: 'Security Camera Installation', category: 'devices', content: 'Install and set up your IoT security cameras...' },
  { id: 7, title: 'Smart Doorbell Configuration', category: 'devices', content: 'Configure your smart doorbell system...' },
  { id: 8, title: 'Smart Lock Programming', category: 'devices', content: 'Program and manage your smart door locks...' },
  { id: 9, title: 'Motion Sensor Setup', category: 'devices', content: 'Install and calibrate motion sensors...' },
  { id: 10, title: 'Smart Smoke Detector', category: 'devices', content: 'Connect your smart smoke detection system...' },
  
  // Spaces
  { id: 11, title: 'Living Room Automation', category: 'spaces', content: 'Create a smart living room environment...' },
  { id: 12, title: 'Bedroom Smart Setup', category: 'spaces', content: 'Automate your bedroom for comfort and convenience...' },
  { id: 13, title: 'Kitchen Automation Guide', category: 'spaces', content: 'Smart kitchen appliances and automation...' },
  { id: 14, title: 'Bathroom Smart Features', category: 'spaces', content: 'Implement smart features in your bathroom...' },
  { id: 15, title: 'Home Office Automation', category: 'spaces', content: 'Create an efficient smart home office...' },
  { id: 16, title: 'Garage Smart System', category: 'spaces', content: 'Automate your garage door and lighting...' },
  
  // Remotes
  { id: 17, title: 'Universal Remote Setup', category: 'remotes', content: 'Configure your universal smart remote...' },
  { id: 18, title: 'Voice Control Integration', category: 'remotes', content: 'Set up voice commands for your devices...' },
  { id: 19, title: 'Mobile App Remote Control', category: 'remotes', content: 'Use your smartphone as a remote control...' },
  { id: 20, title: 'Smart Hub Remote Features', category: 'remotes', content: 'Maximize your smart hub remote capabilities...' },
  
  // Scenes
  { id: 21, title: 'Morning Routine Scene', category: 'scenes', content: 'Create an automated morning routine...' },
  { id: 22, title: 'Evening Wind-Down Scene', category: 'scenes', content: 'Set up a relaxing evening automation...' },
  { id: 23, title: 'Away Mode Scene', category: 'scenes', content: 'Configure security when you are away...' },
  { id: 24, title: 'Entertainment Scene', category: 'scenes', content: 'Create the perfect entertainment atmosphere...' },
];

const categories = [
  { key: 'all', label: 'All', icon: 'apps' },
  { key: 'switches', label: 'Switches', icon: 'toggle' },
  { key: 'devices', label: 'Devices', icon: 'hardware-chip' },
  { key: 'spaces', label: 'Spaces', icon: 'home' },
  { key: 'remotes', label: 'Remotes', icon: 'radio' },
  { key: 'scenes', label: 'Scenes', icon: 'film' },
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredPages = guidePages.filter(page => {
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory;
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openPage = (page) => {
    setSelectedPage(page);
    setModalVisible(true);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.key && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(item.key)}
    >
      <Ionicons 
        name={item.icon} 
        size={20} 
        color={selectedCategory === item.key ? '#fff' : '#4A90E2'} 
      />
      <Text style={[
        styles.categoryText,
        selectedCategory === item.key && styles.categoryTextActive
      ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const renderGuidePage = ({ item }) => (
    <TouchableOpacity style={styles.pageCard} onPress={() => openPage(item)}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>{item.title}</Text>
        <View style={[styles.categoryBadge, styles[`${item.category}Badge`]]}>
          <Text style={styles.categoryBadgeText}>
            {categories.find(cat => cat.key === item.category)?.label}
          </Text>
        </View>
      </View>
      <Text style={styles.pagePreview} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.pageFooter}>
        <Ionicons name="chevron-forward" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>IoT Home Guide</Text>
        <Text style={styles.headerSubtitle}>Smart Home Automation Manual</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search guides..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filter */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.key}
        style={styles.categoryList}
        contentContainerStyle={styles.categoryListContent}
      />

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsCount}>
          {filteredPages.length} guide{filteredPages.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Guide Pages List */}
      <FlatList
        data={filteredPages}
        renderItem={renderGuidePage}
        keyExtractor={(item) => item.id.toString()}
        style={styles.pagesList}
        contentContainerStyle={styles.pagesListContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Page Detail Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {selectedPage && (
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="arrow-back" size={24} color="#4A90E2" />
              </TouchableOpacity>
              <Text style={styles.modalTitle} numberOfLines={2}>
                {selectedPage.title}
              </Text>
            </View>
            <ScrollView style={styles.modalContent}>
              <View style={[styles.categoryBadge, styles[`${selectedPage.category}Badge`], styles.modalBadge]}>
                <Text style={styles.categoryBadgeText}>
                  {categories.find(cat => cat.key === selectedPage.category)?.label}
                </Text>
              </View>
              <Text style={styles.modalText}>
                {selectedPage.content}
              </Text>
              <Text style={styles.modalText}>
                This is a comprehensive guide that will walk you through step-by-step instructions 
                for setting up and managing your IoT devices. Follow along with the detailed 
                explanations and troubleshooting tips provided.
              </Text>
              <Text style={styles.modalText}>
                Key features covered in this guide:
                {'\n'}• Easy setup process
                {'\n'}• Configuration options
                {'\n'}• Troubleshooting common issues
                {'\n'}• Best practices and tips
                {'\n'}• Integration with other devices
              </Text>
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6c757d',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
  },
  categoryList: {
    marginBottom: 8,
  },
  categoryListContent: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#4A90E2',
  },
  categoryButtonActive: {
    backgroundColor: '#4A90E2',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsCount: {
    fontSize: 14,
    color: '#6c757d',
  },
  pagesList: {
    flex: 1,
  },
  pagesListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  pageCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  pageTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginRight: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'uppercase',
  },
  switchesBadge: {
    backgroundColor: '#28a745',
  },
  devicesBadge: {
    backgroundColor: '#17a2b8',
  },
  spacesBadge: {
    backgroundColor: '#ffc107',
  },
  remotesBadge: {
    backgroundColor: '#6f42c1',
  },
  scenesBadge: {
    backgroundColor: '#fd7e14',
  },
  pagePreview: {
    fontSize: 14,
    color: '#6c757d',
    lineHeight: 20,
    marginBottom: 12,
  },
  pageFooter: {
    alignItems: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    marginRight: 16,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
  },
  modalContent: {
    flex: 1,
    padding: 20,
  },
  modalBadge: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#2c3e50',
    marginBottom: 16,
  },
});