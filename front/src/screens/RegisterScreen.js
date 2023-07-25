import React, { useState } from 'react'
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
import BackButton from '../components/BackButton'

const SignUp = () => {
  const navigation = useNavigation()

  const [firstName, setFirstName] = useState({ value: '', error: '' })
  const [lastName, setLastName] = useState({ value: '', error: '' })
  const [organization, setOrganization] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [phone, setPhone] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  })

  const isValidEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  const isValidPassword = (password) => {
    return password.length >= 6
  }

  const isValidPhoneNumber = (phone) => {
    return /^\d+$/.test(phone)
  }

  const handleSubmit = async () => {
    let formValid = true

    if (!isValidEmail(email.value)) {
      setEmail({ value: email.value, error: 'Invalid email!' })
      formValid = false
    }

    if (!isValidPassword(password.value)) {
      setPassword({
        value: password.value,
        error: 'Password must be at least 6 characters long!',
      })
      formValid = false
    }

    if (password.value !== confirmPassword.value) {
      setConfirmPassword({
        value: confirmPassword.value,
        error: 'Passwords do not match!',
      })
      formValid = false
    }

    if (!isValidPhoneNumber(phone.value)) {
      setPhone({
        value: phone.value,
        error: 'Phone number must contain only digits!',
      })
      formValid = false
    }

    if (firstName.value === '') {
      setFirstName({ value: firstName.value, error: 'First name is required!' })
      formValid = false
    }

    if (lastName.value === '') {
      setLastName({ value: lastName.value, error: 'Last name is required!' })
      formValid = false
    }

    if (!formValid) {
      return
    }

    const jsonData = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      phone: phone.value,
      organization: organization.value,
    }

    try {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      })
      const response = await fetch('http://3.78.213.115:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail)
      }

      console.log('Registration successful')
    } catch (error) {
      alert('Registration failed: ' + error.message)
      
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <BackButton goBack={navigation.goBack} />

      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.form}>
        <TextInput
          style={[styles.input, firstName.error ? styles.errorInput : {}]}
          placeholder="First Name*"
          value={firstName.value}
          onChangeText={(text) => setFirstName({ value: text, error: '' })}
          required
        />
        {firstName.error ? (
          <Text style={styles.errorText}>{firstName.error}</Text>
        ) : null}

        <TextInput
          style={[styles.input, lastName.error ? styles.errorInput : {}]}
          placeholder="Last Name*"
          value={lastName.value}
          onChangeText={(text) => setLastName({ value: text, error: '' })}
          required
        />
        {lastName.error ? (
          <Text style={styles.errorText}>{lastName.error}</Text>
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Organization"
          value={organization.value}
          onChangeText={(text) => setOrganization({ value: text, error: '' })}
        />

        <TextInput
          style={[styles.input, email.error ? styles.errorInput : {}]}
          placeholder="Email*"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          autoCompleteType="off"
          required
        />
        {email.error ? (
          <Text style={styles.errorText}>{email.error}</Text>
        ) : null}

        <TextInput
          style={[styles.input, phone.error ? styles.errorInput : {}]}
          placeholder="Phone*"
          value={phone.value}
          onChangeText={(text) => setPhone({ value: text, error: '' })}
          keyboardType="number-pad"
          required
        />
        {phone.error ? (
          <Text style={styles.errorText}>{phone.error}</Text>
        ) : null}

        <TextInput
          style={[styles.input, password.error ? styles.errorInput : {}]}
          placeholder="Password*"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          secureTextEntry={true}
          autoCompleteType="off"
          required
        />
        {password.error ? (
          <Text style={styles.errorText}>{password.error}</Text>
        ) : null}

        <TextInput
          style={[styles.input, confirmPassword.error ? styles.errorInput : {}]}
          placeholder="Confirm Password*"
          value={confirmPassword.value}
          onChangeText={(text) =>
            setConfirmPassword({ value: text, error: '' })
          }
          secureTextEntry={true}
          autoCompleteType="off"
          required
        />
        {confirmPassword.error ? (
          <Text style={styles.errorText}>{confirmPassword.error}</Text>
        ) : null}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.note}></Text>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  form: {
    width: '80%',
  },
  input: {
    width: '100%',
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    marginBottom: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    width: '100%',
    height: 44,
    padding: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  note: {
    marginTop: 10,
    color: '#888',
    fontSize: 12,
  },
})

export default SignUp
