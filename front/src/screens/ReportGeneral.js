import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Logo from '../components/Logo'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../components/BackButton'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReportWriting from './ReportWriting'

const ReportGeneral = () => {
  const navigation = useNavigation()

  const [reportTypes, setReportTypes] = useState([])

  useEffect(() => {
    axios
      .get('http://3.78.213.115:8000/report-types')
      .then((response) => {
        setReportTypes(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the report types!', error)
      })
  }, [])

  const handleReportTypeSelection = async (type) => {
    try {
      await AsyncStorage.setItem('@reportType', type)
      navigation.navigate(ReportWriting)
    } catch (e) {
      console.error('Failed to save the report type to AsyncStorage', e)
    }
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />

      <Logo />
      <Text style={styles.title}>New Report</Text>
      {reportTypes.map((type, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => handleReportTypeSelection(type)}
        >
          <Text style={styles.buttonText}>{type}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

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
})

export default ReportGeneral
