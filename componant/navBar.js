import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const NavBar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const navigation = useNavigation(); 
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };

    const navigateToWorkspaces = () => {
      navigation.navigate('Workspaces'); 
      setMenuVisible(false); 
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.navbar}>
          <View style={styles.logoContainer}>
            <Image source={require('../TLA-removebg-preview.png')} style={styles.logo} />
            <Text style={styles.textTrelLA}>TrelLA</Text>
          </View>
  
          <TouchableOpacity style={styles.menuIconContainer} onPress={toggleMenu}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
  
          {menuVisible && (
            <View style={[styles.menuContainer, styles.menuVisible]}>
              <TouchableOpacity
                style={styles.fullWidthButton}
                onPress={navigateToWorkspaces}
              >
                <Text style={styles.menuButtonText}>Mes workspaces</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  
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
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      width: '100%',
      backgroundColor: '#7aadc4',
    },
    menuIconContainer: {
      padding: 20,
      margin: 30,
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 180,
      height: 115,
      marginRight: -35,
      marginLeft: -25,
    },
    textTrelLA: {
      fontSize: 45,
      fontWeight: 'bold',
      color: '#fff',
      marginTop: 25, 
      marginLeft: 35,
    },
    menuContainer: {
      flexDirection: 'column',
      position: 'absolute',
      top: 150,
      left: 20, 
      width: '100%',
      backgroundColor: 'pink ',
      padding: 10,
      zIndex: 10,
    },
    menuVisible: {
      marginTop: -20,
    },
    fullWidthButton: {
      marginBottom: 10,
      paddingVertical: 8,
      paddingHorizontal: 16,
      backgroundColor: '#7aadc4',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%', 
    },
    menuButtonText: {
      fontSize: 24,
      color: 'white',

    },
    tableauImage: {
      width: '90%',
      height: 300, 
      marginTop: 150, 
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
      fontSize: 20,
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

  export default NavBar;