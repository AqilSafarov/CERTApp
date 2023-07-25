import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'

const ReportWriting = () => {
  const [mainCategory, setMainCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [message, setMessage] = useState('')
  const [categoryError, setCategoryError] = useState(null)
  const [messageError, setMessageError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [subCategories, setSubCategories] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchReportType = async () => {
      const reportType = await AsyncStorage.getItem('@reportType')
      setMainCategory(reportType)
    }
    fetchReportType()
  }, [])

  useEffect(() => {
    if (mainCategory) {
      axios
        .get(
          `http://3.78.213.115:8000/report-types/${encodeURIComponent(
            mainCategory
          )}`
        )
        .then((response) => {
          setSubCategories(
            Object.entries(response.data).map(([value, label]) => ({
              value,
              label,
            }))
          )
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [mainCategory])

  const handleSubmit = async () => {
    if (!message) {
      setMessageError('Message field is required')
    } else {
      setMessageError(null)

      let reportData = {
        main_report_category: mainCategory,
        sub_report_category: subCategory,
        report_text: message,
        report_create_time: new Date().toISOString(),
      }

      try {
        const userToken = await AsyncStorage.getItem('userToken')
        const response = await axios.post(
          'http://3.78.213.115:8000/reports',
          reportData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />

      <View style={styles.section}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          Report Cybersecurity Incident
        </Text>
      </View>

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text>{subCategory || 'Select a subject'}</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {mainCategory && (
              <Picker
                selectedValue={subCategory}
                onValueChange={(itemValue) => setSubCategory(itemValue)}
              >
                {subCategories.map(({ value, label }) => (
                  <Picker.Item label={label} value={label} key={label} />
                ))}
              </Picker>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {categoryError && <Text style={{ color: 'red' }}>{categoryError}</Text>}

      <View>
        <TextInput
          style={styles.textArea}
          value={message}
          multiline
          numberOfLines={4}
          placeholder="Message*"
          onChangeText={(text) => setMessage(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.note}></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  section: {
    marginTop: 20,
    padding: 20,
  },
  textArea: {
    height: 150,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#15172b',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  note: {
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    padding: 10,
  },
})

export default ReportWriting
