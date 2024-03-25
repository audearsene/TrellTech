import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react'
import NavBar from '../componant/navBar';

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <NavBar />
        <Image
          source={require('../TableauTrello.jpg')} 
          style={styles.tableauImage}
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.middleText}>
            Bienvenue dans TrelLA, un projet inspiré par Trello.
          </Text>
        </View>

        <Image
          source={require('../Workspace.jpg')} 
          style={styles.workspaceImage}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  tableauImage: {
    width: '90%',
    height: 300, 
    marginTop: 75, 
    resizeMode: 'cover', 
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7aadc4',
    padding: 20,
    marginVertical: 10, 
  },
  middleText: {
    fontSize: 26,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#fff',
    fontFamily: 'Arial', 
  },
  workspaceImage: {
    width: '90%',
    height: 300, 
    margin: 10,
    resizeMode: 'cover', 
  },
});

export default Home