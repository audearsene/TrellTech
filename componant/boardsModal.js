import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { createBoard, getTemplateBoards } from '../services';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BoardsModal = ({ selectedWorkspaceBoards, workspaceId, setModalVisibleBoards, modalVisibleBoards, renderBoardItem, handleViewWorkspace }) => {

  const [addBoard, setAddBoard] = useState(null);
  const [boardName, setBoardName] = useState('');

  const navigation = useNavigation();

  const AddBoard = (workspaceId) => {
    setAddBoard(workspaceId);
  }

  const createBoardHandler = async (workspaceId) => {
    try {
      await createBoard(boardName, workspaceId);
      setAddBoard(null);
      setBoardName('');
      handleViewWorkspace(workspaceId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
      

      <ScrollView>
        <View>  
          <Text style={{ ...styles.modalTitle, marginBottom: 30, marginTop: 20 }}>Boards associés</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => AddBoard(workspaceId)}
          >
            <Ionicons name="ios-add" size={26} color="#007AFF" style={{ marginRight: 5 }} />
            <Text style={styles.addButtonText}>Ajouter un board</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {navigation.navigate('modelBoard', {workspaceId}), setModalVisibleBoards(false)}}
          >
            <Ionicons name="ios-add" size={26} color="#007AFF" style={{ marginRight: 5 }} />
            <Text style={styles.addButtonText}>Utiliser un modèle</Text>
          </TouchableOpacity>
          {addBoard === workspaceId && (
            <>
              <TextInput 
                style={styles.textInputButton}
                placeholder="Nom du board"
                onChangeText={text => setBoardName(text)}
                value={boardName}
              />
              <TouchableOpacity 
                style={styles.createBoardButton} 
                onPress={() => {
                  createBoardHandler(workspaceId);
                }}
              >
                <Text style={styles.createBoardButtonText}>Créer</Text>
              </TouchableOpacity>
            </>
          )}
          
            <FlatList
          data={selectedWorkspaceBoards}
          renderItem={renderBoardItem}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          style={styles.flatListBoard}
            />
          
          <TouchableOpacity onPress={() => setModalVisibleBoards(false)}>
            <Text style={{ ...styles.createButtonText, marginTop: 30, marginBottom: 10 }}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
    modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '90%', 
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center', // Center the modal on the screen
  },
  modalTitle: {
    fontSize: 24, 
    fontWeight: 'bold',
    marginBottom: 20, 
    textAlign: 'center',
  },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 20,
        marginTop: 5,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#007AFF',
        justifyContent: 'center',
    },
    addButtonText: {
        color: '#007AFF', 
        fontWeight: 'bold', 
        fontSize: 18,
    },
    separator: {
        height: 1,
        marginVertical: 10,
        backgroundColor: 'white',
    }, 
    separator: {
        height: 90, // Hauteur de l'espace entre les éléments
        height: 1,
        marginVertical: 10,
        backgroundColor: 'white',
    },
    textInputButton: {
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      fontSize: 16, // Text size
    },
    createBoardButton: {
      backgroundColor: '#007BFF', // Button color
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      alignItems: 'center', // Center text horizontally
      justifyContent: 'center', // Center text vertically
    },
    createBoardButtonText: {
      color: '#fff', // Text color
      fontSize: 16, // Text size
    },
    createButtonText: {
      color: '#007AFF',
      marginTop: 10,
      textAlign: 'center',
      fontSize: 23,
    },
});

export default BoardsModal;
