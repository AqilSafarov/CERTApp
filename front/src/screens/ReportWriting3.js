import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import BackButton from '../components/BackButton';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Illegalcontent = () => {
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
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Report Illegal Content on the Internet</Text>
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
          <Picker.Item label="Information on the promotion and financing of terrorism, as well as open calls for terror" value="Information on the promotion and financing of terrorism, as well as open calls for terror" />
          <Picker.Item label="Information on promotion of violence and religious extremism, and open encouragement of national, racial or religious hatred and enmity" value="Information on promotion of violence and religious extremism, and open encouragement of national, racial or religious hatred and enmity" />
          <Picker.Item label="Information on violently changing the constitutional order of the state, violating territorial integrity, forcibly seizing or retaining power" value="Information on violently changing the constitutional order of the state, violating territorial integrity, forcibly seizing or retaining power" />
          <Picker.Item label="Information on open calls for organizing riots" value="Information on open calls for organizing riots" />
          <Picker.Item label="Information constituting a state secret" value="Information constituting a state secret" />
          <Picker.Item label="Information on the procedure and methods of manufacturing firearms, their components, ammunition and explosives" value="Information on the procedure and methods of manufacturing firearms, their components, ammunition and explosives"/>
          <Picker.Item label="Information on the procedure and methods of manufacturing and use of narcotic drugs and psychotropic substances and their precursors" value="Information on the procedure and methods of manufacturing and use of narcotic drugs and psychotropic substances and their precursors" />
          <Picker.Item label="Information pertaining to pornography, including child pornography" value="8" />
          <Picker.Item label="Information encouraging organisation of gambling and other illegal betting games and participation in such games" value="9" />
          <Picker.Item label="Information promoting suicide as a solution to problems" value="Information promoting suicide as a solution to problems" />
          <Picker.Item label="Information of an offensive and libellous nature, as well as information violating privacy" value="Information of an offensive and libellous nature, as well as information violating privacy" />
          <Picker.Item label="Information infringing intellectual property rights" value="Information infringing intellectual property rights" />
          <Picker.Item label="Other information, the dissemination of which is prohibited by the laws of the Republic of Azerbaijan" value="Other information, the dissemination of which is prohibited by the laws of the Republic of Azerbaijan" />
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

export default Illegalcontent;
