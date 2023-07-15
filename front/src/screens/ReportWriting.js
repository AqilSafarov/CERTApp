import React, { useState } from 'react'
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
import { IconButton } from 'react-native-paper'
import { Platform, Alert, PermissionsAndroid } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
// var ImagePicker = require('react-native-image-picker');

// import ImagePicker from 'react-native-image-crop-picker';


//last update
const ReportWriting = () => {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [subjectError, setSubjectError] = useState(null)
  const [messageError, setMessageError] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const navigation = useNavigation()

  const handleSubmit = () => {
    if (!message) {
      setMessageError('Message field is required')
    } else {
      setMessageError(null)
    }

    if (!subject) {
      setSubjectError('Subject field is required')
    } else {
      setSubjectError(null)
    }

    // If both subject and message are filled, proceed with the form submission
    if (subject && message) {
      // Your form submission code here
      console.log('Form Submitted')
    }
    
  }
  // openDocumentFile = async () => {
  //   try {
  //     const res = await DocumentPicker.pick({
  //       type: [DocumentPicker.types.images],
  //     })

  //     console.log(res.uri)
  //     console.log(res.type)
  //     console.log(res.name)
  //     console.log(res.size)
  //   } catch (err) {
  //     if (DocumentPicker.isCancel(err)) {
  //       // Handle cancelled file picker action
  //     } else {
  //       throw err
  //     }
  //   }
  // }

// const selectImage = () => {
//   const options = {
//     maxWidth: 2000,
//     maxHeight: 2000,
//     storageOptions: {
//       skipBackup: true,
//       path: 'images'
//     }
//   };
//   ImagePicker.launchImageLibrary(options, response => {
//     if (response.didCancel) {
//       console.log('User cancelled image picker');
//     } else if (response.error) {
//       console.log('ImagePicker Error: ', response.error);
//     } else if (response.customButton) {
//       console.log('User tapped custom button: ', response.customButton);
//     } else {
//       const  uri = image?.uri;
//       console.log(source);
//       setImage(response);
//     }
//   });
// };
// const openGallery=async()=>{
//   const images=await launchImageLibrary(options);
//   console.log(images)
// }

// const ImageUpload=(navigation)=>{
//   const[images,setImages]=useState([]);
//   useLayoutEffect(()=>{
//     const handleUpload=()=>{
//       launchImageLibrary.showImagePicker({maxWidth:500,maxHeight:500}, (reponse)=>{
//         if(reponse.didCancel){
//           return;
//         }
//         const img={
//           uri:reponse.uri,
//           type:reponse.type,
//           name:reponse.fileName || reponse.uri.substr(reponse.uri.lastIndexOf("/")+1),
//         };
//         setImages(prevImages=>prevImages.concat(img));

//       })
//     }
//     navigation.setOptions({
//       headerRight:()=><IconButton icon="plus" />,
//     });
    
//   },[navigation] );
// }
const onSelectImage = async () => {
  const permissionStatus =
    Platform.OS === 'android'
      ? await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs access to your camera',
          }
        )
      : true;

  if (permissionStatus || Platform.OS === 'ios') {
    showImagePicker();
  } else {
    console.log('Camera permission denied');
  }
};

const showImagePicker = () => {
  Alert.alert('Profile Picture', 'Choose an option', [
    { text: 'Camera', onPress: onCamera },
    { text: 'Gallery', onPress: onGallery },
    { text: 'Cancel', onPress: () => {} },
  ]);
};

const onCamera = () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled camera picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      // Handle the selected image from camera
      console.log(response);
    }
  });
};

const onGallery = () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 500,
    maxWidth: 500,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      // Handle the selected image from gallery
      console.log(response);
    }
  });
};


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
        <Text>{subject || 'Select a subject'}</Text>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Picker
              selectedValue={subject}
              onValueChange={(itemValue) => setSubject(itemValue)}
            >
              <Picker.Item label="Select a subject" value="Select a subject" />
              <Picker.Item
                label="Infection with malware (Trojan, ransomware, worm, etc.)"
                value="Infection with malware (Trojan, ransomware, worm, etc.)"
              />
              <Picker.Item label="Phishing" value="Phishing" />
              <Picker.Item label="DoS/DDoS" value="DoS/DDoS" />
              <Picker.Item
                label="Hacked social network account"
                value="Hacked social network account"
              />
              <Picker.Item
                label="Fake social network account"
                value="Fake social network account"
              />
              <Picker.Item label="Cyberfraud" value="Cyberfraud" />
              <Picker.Item label="Web defacement" value="Web defacement" />
              <Picker.Item
                label="Network intrusion"
                value="Network intrusion"
              />
              <Picker.Item label="Data stealing" value="Data stealing" />
              <Picker.Item
                label="Suspicious e-mail attachment and link"
                value="Suspicious e-mail attachment and link"
              />
              <Picker.Item label="Other" value="Other" />
            </Picker>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {subjectError && <Text style={{ color: 'red' }}>{subjectError}</Text>}

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
      
      {/* <View style={styles.section}>
        <TouchableOpacity>
        <Button title="Attach file" onPress={openGallery}></Button>

          </TouchableOpacity>
      </View> */}

     <View style={styles.section}>
        <TouchableOpacity>
          
        <Button title="Attach file" onPress={onSelectImage}></Button>

          </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>


        {/* <View style={styles.section}>
          <TouchableOpacity onPress={() => this.openDocumentFile()}>
            <Text>Attach file</Text>
          </TouchableOpacity>
        </View> */}

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
    padding: 10,
  },
})

export default ReportWriting
