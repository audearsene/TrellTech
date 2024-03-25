import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image, Modal, Alert, ImageBackground } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { modifyBoard, getLists, createBoardList, modifyList, archiveList, getCardsList, createCard } from '../services';
import CreateListModal from '../componant/createListModal'
import CreateCardModal from '../componant/createCardModal';
import CardsModal from '../componant/cardsModal';
 
const BoardDetails = ({ navigation, route }) => {
  const { board } = route?.params;
  const [boardName, setBoardName] = useState(board.name);
  const [modalVisible, setModalVisible] = useState(false);
  const [listName, setListName] = useState('');
  const [lists, setLists] = useState([]);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [modalVisibleCards, setModalVisibleCards] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cardName, setCardName] = useState('');
  const [selectedList, setSelectedList] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    navigation.setOptions({ 
      title: boardName,
      headerRight: () => (
        <TouchableOpacity onPress={handleModifyBoardName}>
          <MaterialIcons name="edit" size={24} color="orange" />
        </TouchableOpacity>
      ),
     });
}, [boardName]);
 
  useEffect(() => {
    loadBoardDetails();
  }, []);

  
  useEffect(() => {
    if (board.prefs && board.prefs.backgroundImage) {
      setBackgroundImg(board.prefs.backgroundImage);
    }
  }, [board]);
 
  const loadBoardDetails = async () => {
    try {
      const boardDetails = await getLists(board.id);
      const listsWithCards = await Promise.all(boardDetails.map(async (list) => {
        const cards = await getCardsList(list.id);
        return { ...list, cards };
      }));
      setLists(listsWithCards);
    } catch (error) {
      console.error('Error loading board details:', error);
    }
  };
 
  const handleModifyBoardName = async () => {
    try {
      const newName = await askForNewBoardName();
      if (newName) {
        await modifyBoard(board.id, newName);
        setBoardName(newName);
        loadBoardDetails();
      }
    } catch (error) {
      console.error('Error modifying board name:', error);
    }
  };
  
  const askForNewBoardName = () => {
    return new Promise((resolve, reject) => {
      Alert.prompt(
        'Modifier le tableau',
        'Enter the new name for the board:',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(null),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: (newName) => resolve(newName),
          },
        ],
        'plain-text',
        boardName,
      );
    });
  };
 
  const handleCreateCard = async () => {
    try {
      const response = await createCard(selectedList, cardName);
      console.log('response', response);
      //renderLists();
      loadBoardDetails();
      setVisible(false);
      setCardName('');
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };
 
  const handleCreateList = async () => {
    try {
      await createBoardList(board.id, listName);
      //renderLists();
      loadBoardDetails();
      setModalVisible(false);
      setListName('');
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };
 
  const handleModifyListName = async (listId) => {
    try {
      const newListName = await askForNewListName();
      if (newListName) {
        await modifyList(listId, newListName);
        loadBoardDetails();
      }
    } catch (error) {
      console.error('Error modifying list:', error);
    }
  };
 
  const askForNewListName= () => {
    return new Promise((resolve, reject) => {
      Alert.prompt(
        'Renommer votre liste',
        'Veuillez saisir le nom de votre liste :',
        [
          {
            text: 'Annuler',
            onPress: () => resolve(reject),
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

  const handleDeleteList = async (list) => {
    try {
      //const boardToDelete = selectedWorkspaceBoards.find((b) => b.id === id);
      Alert.alert(
        'Supprimer',
        `Voulez-vous archiver la liste "${list.name}" ?`,
        [
          {
            text: 'Annuler',
            onPress: () => console.log('Annuler'),
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: async () => {
              const response = await archiveList(list.id);
              console.log('response', response);
              loadBoardDetails();
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const renderLimitedText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    }
    return text;
  };
 
  const renderLists = () => {
    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {lists.map((list) => (
            <View key={list.id} style={styles.listContainer}>
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>{list.name}</Text>
                <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => {setVisible(true), setSelectedList(list.id)}}>
                  <Ionicons name="ios-add" size={26} color="#007AFF" style={{ marginRight: 5 }} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {handleModifyListName(list.id)}}>
                    <MaterialIcons name="edit" size={24} color="orange" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDeleteList(list)}>
                    <MaterialIcons name="delete" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
              <ScrollView>
                {list.cards.map((card) => (
                  <TouchableOpacity onPress={() => {setModalVisibleCards(true), setCard(card)}}>
                    <View key={card.id} style={styles.cardContainer}>
                      <Text style={styles.cardItemText}>{renderLimitedText(card.name, 40)}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
                
              </ScrollView>
            </View>
          ))}
        </ScrollView>
    );
  };
 
  return (
    <ImageBackground source={{ uri: backgroundImg }} style={styles.backgroundImage}>
      <View style={styles.container}>
        {/* <View style={styles.containerNavbar}>
          <View style={styles.navbar}>
            <View style={styles.logoContainer}>
              <Image source={require('../TLA-removebg-preview.png')} style={styles.logo} />
              <Text style={styles.textTrelLA}>TrelLA</Text>
            </View>
          </View>
        </View> */}

        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Ionicons name="ios-add" size={26} color="#007AFF" style={{ marginRight: 5 }} />
          <Text style={styles.addButtonText}>Ajouter une liste</Text>
        </TouchableOpacity>

        <Modal
          visible={visible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CreateCardModal
                cardName={cardName}
                setCardName={setCardName}
                visible={visible}
                setVisible={setVisible}
                handleCreateCard={handleCreateCard}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <CreateListModal
                listName={listName}
                setListName={setListName}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                handleCreateList={handleCreateList}
              />
            </View>
          </View>
        </Modal>

        <Modal
          visible={modalVisibleCards}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisibleCards(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <CardsModal
                setModalVisibleCards={setModalVisibleCards}
                card={card}

                />
            </View>
          </View>
        </Modal>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {renderLists()}
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    padding: 20,
  },
  
  boardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  boardNameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  listContainer: {
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  listItem: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  listItemText: {
    fontSize: 16,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  cardContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    
  },
  cardItemText: {
    maxWidth: 150,
    fontSize: 14,
    flex: 1, 
  },
  // containerNavbar: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingTop: 50,
  //   margin: -20,
  // },
  containerNavbar: {
    backgroundColor: '#fff',
    marginHorizontal: -20,
    marginVertical: -20
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
    marginRight: -10,
    marginLeft: -25,
  },
  textTrelLA: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginLeft: 60,
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
backgroundImage: {
  flex: 1,
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
});
 
export default BoardDetails;