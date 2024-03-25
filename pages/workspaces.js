import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import { getAllWorkspaces, createWorkspace, deleteWorkspace, modifyWorkspace, getWorkspaceBoards, deleteBoard, modifyBoard } from '../services';
import CreateWorkspaceModal from '../componant/createWorkspaceModal';
import BoardsModal from '../componant/boardsModal';
import WorkspaceItem from '../componant/workspaceItem';
import BoardItem from '../componant/boardItem';
import { Ionicons } from '@expo/vector-icons';

const Workspaces = ({ navigation }) => {
  const [workspaces, setWorkspaces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleBoards, setModalVisibleBoards] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [selectedWorkspaceBoards, setSelectedWorkspaceBoards] = useState([]);
  const [workspaceId, setWorkspaceId] = useState('');

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await getAllWorkspaces();
      setWorkspaces(response);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      await createWorkspace(newWorkspaceName);
      fetchWorkspaces();
      setModalVisible(false);
      setNewWorkspaceName('');
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  const handleDeleteWorkspace = async (id) => {
    try {
      const workspaceToDelete = workspaces.find((w) => w.id === id);
      Alert.alert(
        'Supprimer',
        `Voulez-vous supprimer l'espace de travail "${workspaceToDelete?.displayName}" ?`,
        [
          {
            text: 'Annuler',
            onPress: () => console.log('Annuler'),
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: async () => {
              await deleteWorkspace(id);
              fetchWorkspaces();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleDeleteBoard = async (id) => {
    try {
      const boardToDelete = selectedWorkspaceBoards.find((b) => b.id === id);
      Alert.alert(
        'Supprimer',
        `Voulez-vous supprimer le tableau "${boardToDelete?.name}" ?`,
        [
          {
            text: 'Annuler',
            onPress: () => console.log('Annuler'),
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: async () => {
              await deleteBoard(id);
              handleViewWorkspace(workspaceId);
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleModifyWorkspace = async (id) => {
    try {
      const newName = await askForNewWorkspaceName();
      if (newName) {
        await modifyWorkspace(id, newName);
        fetchWorkspaces();
      }
    } catch (error) {
      console.error('Error modifying workspace:', error);
    }
  };

  const handleModifyBoard = async (id) => {
    try {
      const newName = await askForNewBoardName();
      if (newName) {
        await modifyBoard(id, newName);
        handleViewWorkspace(workspaceId);
      }
    } catch (error) {
      console.error('Error modifying board:', error);
    }
  };

  const askForNewBoardName = () => {
    return new Promise((resolve, reject) => {
      Alert.prompt(
        'Renommer votre tableau',
        'Saisissez le nom de votre tableau :',
        [
          {
            text: 'Annuler',
            onPress: () => resolve(null),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (newName) => resolve(newName),
          },
        ],
        'plain-text',
        ''
      );
    });
  };

  const askForNewWorkspaceName = () => {
    return new Promise((resolve, reject) => {
      Alert.prompt(
        'Renommer votre workspace',
        'Veuillez saisir le nom de votre workspace :',
        [
          {
            text: 'Annuler',
            onPress: () => resolve(null),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (newName) => resolve(newName),
          },
        ],
        'plain-text',
        ''
      );
    });
  };

  const handleViewWorkspace = async (id) => {
    try {
      const boards = await getWorkspaceBoards(id);
      setWorkspaceId(id);
      setSelectedWorkspaceBoards(boards);
      setModalVisibleBoards(true);
    } catch (error) {
      console.error(`Error fetching workspace ${id} boards:`, error);
    }
  };

  const renderWorkspaceItem = ({ item }) => (
    <WorkspaceItem
      item={item}
      navigation={navigation}
      onViewWorkspace={handleViewWorkspace}
      onModifyWorkspace={handleModifyWorkspace}
      onDeleteWorkspace={handleDeleteWorkspace}
    />
  );

  const renderBoardItem = ({ item }) => (
    <BoardItem
      item={item}
      navigation={navigation}
      onViewWorkspace={handleViewWorkspace}
      onModifyBoard={handleModifyBoard}
      onDeleteBoard={handleDeleteBoard}
      setModalVisibleBoards={setModalVisibleBoards}
      modalVisibleBoards={modalVisibleBoards}
    />
  );

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

      <Text style={styles.title}>Workspaces & Boards </Text>

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Ionicons name="ios-add" size={26} color="#007AFF" style={{ marginRight: 5 }} />
          <Text style={styles.addButtonText}>Créer un workspace</Text>
        </TouchableOpacity>

      <FlatList
        data={workspaces}
        renderItem={renderWorkspaceItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CreateWorkspaceModal
              newWorkspaceName={newWorkspaceName}
              setNewWorkspaceName={setNewWorkspaceName}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              handleCreateWorkspace={handleCreateWorkspace}
            />
          </View>
        </View>
      </Modal> 

        <Modal
          visible={modalVisibleBoards}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisibleBoards(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <BoardsModal
                  selectedWorkspaceBoards={selectedWorkspaceBoards}
                  workspaceId={workspaceId}
                  setModalVisibleBoards={setModalVisibleBoards}
                  modalVisibleBoards={modalVisibleBoards}
                  renderBoardItem={renderBoardItem}
                  handleViewWorkspace={handleViewWorkspace}
                />
            </View>
          </View>
        </Modal>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 20,
  },
  flatList: {
    flexGrow: 1,
    padding: 15, 
    maxHeight: '55%',
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
  containerNavbar: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50, 
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
    backgroundColor: '#7aadc4',
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
    marginTop: 20, 
    marginLeft: 60,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
},
});
export default Workspaces;

