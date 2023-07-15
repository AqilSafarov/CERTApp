import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../components/Logo'
import { useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton';

const ReportGeneral = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      
      <Logo />
      <Text style={styles.title}>New Report</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportWriting')}>
        <Text style={styles.buttonText}>Report Cybersecurity Incident</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportWriting2')}>
        <Text style={styles.buttonText}>Raise a Personal Data Concern</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportWriting3')}>
        <Text style={styles.buttonText}>Report Illegal Content on the Internet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    height: 800,
    paddingTop: 150,
    padding: 20,
    width: 390,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  reportsContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#15172b',
    paddingBottom: 40,
  },
  button: {
    backgroundColor: '#15172b',
    width: 350,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#eee',
    fontSize: 18,
  },
});

export default ReportGeneral;