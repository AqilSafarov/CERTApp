import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import BackButton from '../components/BackButton'

const ArticlePage = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <BackButton goBack={navigation.goBack} />

      <Image
        source={require('../assets/ArticlePage.jpg')}
        style={styles.image}
      />
      <Text style={styles.title}>Fake Lotteries Promoted on Social Media</Text>
      <Text style={styles.paragraph}>
        Advertisements related to fake lotteries are being shared on social
        media, promoting a counterfeit device called the "m10" electronic
        wallet, which is claimed to be a product of PashaPay organization.
      </Text>
      <Text style={styles.paragraph}>
        Citizens are asked to visit a fake website named "m10hediyye.com" to
        participate in the lottery by entering their mobile numbers and later
        inputting the confirmation code sent to their numbers.
      </Text>
      <Text style={styles.paragraph}>
        The Electronic Security Service advises citizens not to trust such
        advertisements and, when encountering information about any campaign
        conducted by a organization, to first establish contact with the
        organization or verify the information by visiting the official website
        of the organization.
      </Text>
      <Text style={styles.paragraph}>
        Do not share the security code sent to your mobile number with anyone,
        and avoid entering it through suspicious links.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
  },
})

export default ArticlePage
