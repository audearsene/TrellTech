import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { getTemplateBoards, createTempBoard} from '../services';
import { useNavigation } from '@react-navigation/native';

const ModelBoard = ({ route }) => {

    const { workspaceId  } = route.params;

    const [models, setModel] = useState();

    const navigation = useNavigation();

    const designBoard = async () => {
      const response = await getTemplateBoards();
      setModel(response);
    }
    useEffect(() => {
        designBoard();
    }, []);

    const renderModel = ({ item: model }) => (
        <TouchableOpacity style={styles.modelItem} onPress={() => {boardNameHandler(model["200"].id)}}>
            <Text style={styles.modelText}>{model["200"].name}</Text>
        </TouchableOpacity>
    )
    const createBoardHandler = async (boardName, modelId) => {
        try {
            console.log(workspaceId, modelId)
          const response = await createTempBoard(boardName, workspaceId, modelId);
          if (response.status == 200) {
            navigation.goBack();
          }
          handleViewWorkspace(workspaceId);
        } catch (error) {
          console.log(error);
        }
      }
    const boardNameHandler = async(modelId) => {
        Alert.prompt(
            'Nom du board',
            'Saisissez le nom de votre Tableau:',
            [
              {
                text: 'Annuler',
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: (boardName) => createBoardHandler(boardName, modelId),
              },
            ],
            'plain-text'
          );
    }
    return (
        <View style={styles.container}>

        <View style={styles.containerNavbar}>
        <View style={styles.navbar}>
          <View style={styles.logoContainer}>
            <Image source={require('../TLA-removebg-preview.png')} style={styles.logo} />
            <Text style={styles.textTrelLA}>TrelLA</Text>
          </View>
        </View>
      </View>
            <Text style={styles.title}>Modèles disponibles</Text>
            <FlatList
                data={models}
                renderItem={renderModel}
                keyExtractor={(item) => item["200"].id}
                contentContainerStyle={styles.flatListContainer}
            /> 
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginBottom: 30,
      marginTop: 20,
      color: '#007AFF', 
    },
    modelItem: {
      backgroundColor: '#f2f2f2', 
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 3,
  },
  
  modelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333', 
    textAlign: 'center', 
    textTransform: 'capitalize', 
    
},
    flatListContainer: {
        paddingHorizontal: 20,
        width: '100%',
    },
    containerNavbar: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 80, 
      margin: -20,
    },
    navbar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      width: '100%',
      backgroundColor: '#7aadc4',
      position: 'absolute', 
      top: 70, 
      right: -220, 
  },
  
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logo: {
      width: 180,
      height: 115,
    },
    textTrelLA: {
      fontSize: 45,
      fontWeight: 'bold',
      color: '#fff',
    },
});
export default ModelBoard;
