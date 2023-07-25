import React, { useState, useEffect, useCallback } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import BackButton from '../components/BackButton'

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [organization, setOrganization] = useState('')
  const [position, setPosition] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  const updateUser = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      const response = await axios.patch(
        'http://3.78.213.115:8000/users/me/',
        {
          first_name: firstName,
          last_name: lastName,
          organization,
          position,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      console.log('User updated:', response.data)
    } catch (error) {
      console.log('Error updating user:', error)
    }
  }, [firstName, lastName, organization, position, email, phone])


  const updatePassword = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken')
      const response = await axios.patch(
        'http://3.78.213.115:8000/users/me/password',
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      console.log('User password updated:', response.data)
    } catch (error) {
      console.log('Error updating user password:', error)
    }
  }, [password])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken')
        const response = await axios.get('http://3.78.213.115:8000/users/me/', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        const userData = response.data
        setFirstName(userData.first_name)
        setLastName(userData.last_name)
        setOrganization(userData.organization)
        setPosition(userData.position)
        setEmail(userData.email)
        setPhone(userData.phone)
      } catch (error) {
        console.log('Error fetching user data:', error)
      }
    }
    fetchData()
  }, [])

  const handleSubmit = () => {
    updateUser()
    console.log('Form submitted')
  }

  const handleChangePassword = () => {
    updatePassword()
    console.log('Change Password clicked')
  }

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken')
      navigation.navigate('LoginScreen')
    } catch (error) {
      console.log('Error while logging out:', error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />

        <Text style={styles.title}>Profile</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            value={organization}
            onChangeText={setOrganization}
            placeholder="Organization"
          />
          <TextInput
            style={styles.input}
            value={position}
            onChangeText={setPosition}
            placeholder="Position"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="Password"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#254A60',
  },
  form: {
    width: '100%',
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
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
  logoutButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
})

export default ProfilePage
