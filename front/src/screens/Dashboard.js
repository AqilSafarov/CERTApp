import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MyReportsScreen = () => {
  const reports = [
    { id: 1, title: 'Phishing email', status: 'Delivered   ', main_category:'Incident', sub_category:'Other', last_updated:'17.06.23 || 13:04', color: '#CACFD2' },
    { id: 2, title: 'Data Breach', status: 'Seen           ',main_category:'Data Concern',sub_category:'Other', last_updated:'17.06.23 || 13:04',color: '#67a2a8' },
    { id: 3, title: 'Data Stealing', status: 'In Progress',main_category:'Illegal Content',sub_category:'Other',last_updated:'17.06.23 || 13:04', color: '#e8a531' },
    { id: 4, title: 'Data Stealing', status: 'Solved        ',main_category:'Incident',sub_category:'Other',last_updated:'17.06.23 || 13:04', color: '#196F3D' },
  ];
  const navigation = useNavigation();

  const [expandedReports, setExpandedReports] = useState([]);

  const toggleReportExpand = (reportId) => {
    if (expandedReports.includes(reportId)) {
      setExpandedReports(expandedReports.filter((id) => id !== reportId));
    } else {
      setExpandedReports([...expandedReports, reportId]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <ScrollView style={styles.reportsContainer}>
        {reports.map((report) => (
          <TouchableOpacity
            key={report.id}
            style={styles.reportContainer}
            onPress={() => toggleReportExpand(report.id)}>
            <Text style={styles.reportTitle}>№ {report.id} || {report.main_category} </Text>
            <View style={[styles.reportContent, { backgroundColor: report.color }]}>
              <Text style={styles.reportStatus}>{report.status}</Text>
              {expandedReports.includes(report.id) && (
                <View style={styles.additionalInfo}>
                  <Text style={styles.additionalInfoText}>Subject:</Text>
                  <Text style={styles.additionalInfoText}>{report.sub_category}</Text>
                  <Text style={styles.additionalInfoText}>Last Updated:</Text>
                  <Text style={styles.additionalInfoText}>{report.last_updated}</Text>

                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ArticlePage')}>
          <Image style={styles.icon} source={require('../assets/suggestions_button.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportGeneral')}>
          <Image style={styles.icon} source={require('../assets/report_button.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('ProfilePage')}>
          <Image style={styles.icon} source={require('../assets/account_button.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  reportsContainer: {
    flex: 1,
    paddingVertical: 0,
  },
  title: {
    paddingTop: 40,
    fontSize: 24,             
    fontWeight: 'bold',
    color: '#15172b',
    marginBottom: 20,
  },
  reportContainer: {
    marginBottom: 15,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reportContent: {
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportStatus: {
    color: '#FFFFFF',

    fontSize: 16,
  },
  additionalInfo: {
    flex: 1,
    marginTop: 10,
    marginLeft: 20,
    padding: 0,
    borderRadius: 8,
  },
  additionalInfoText: {
    color: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#15172b',
    height: 75,
    width: 75,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default MyReportsScreen;
