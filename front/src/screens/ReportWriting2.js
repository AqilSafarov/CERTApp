import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import BackButton from '../components/BackButton';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const DataConcern = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [subjectError, setSubjectError] = useState(null);
  const [messageError, setMessageError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!message) {
      setMessageError('Message field is required');
    } else {
      setMessageError(null);
    }

    if (!subject) {
      setSubjectError('Subject field is required');
    } else {
      setSubjectError(null);
    }

    // If both subject and message are filled, proceed with the form submission
    if(subject && message) {
      // Your form submission code here
      console.log("Form Submitted");
    }
  };

  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />
      
      <View style={styles.section}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Raise A Personal Data Concern</Text>
      </View> 

      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text>{subject || "Select a Subject"}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Picker
              selectedValue={subject}
              onValueChange={(itemValue) => setSubject(itemValue)}
            >

              <Picker.Item label="Illegal collection of personal data" value="Illegal collection of personal data" />
              <Picker.Item label="Illegal processing of personal data" value="Illegal processing of personal data" />
              <Picker.Item label="Failure to ensure the protection of personal data" value="Failure to ensure the protection of personal data" />
               <Picker.Item label="Other" value="Other" />
               </Picker>
           <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {subjectError && <Text style={{color: 'red'}}>{subjectError}</Text>}

      <View style={styles.input}>
        <TextInput
          placeholder="Message*"
          value={message}
          onChangeText={(text) => setMessage(text)}
          multiline
        />
        {messageError && <Text style={{color: 'red'}}>{messageError}</Text>}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text>Attach file</Text>
        {/* Implement file upload functionality here */}
      </View>

      <View style={styles.section}>
        <Text style={styles.note}>* - asterisks indicate fields that must be filled in</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  section: {
    marginTop: 20,
    padding: 20,
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
    padding: 10,
  },
});

export default DataConcern;
