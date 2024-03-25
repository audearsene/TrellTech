import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BoardPage = () => {
  const [lists, setLists] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState('');

  const handleCreateList = () => {
    const newList = { id: Math.random().toString(), name: newListName };
    setLists([...lists, newList]);
    setModalVisible(false);
    setNewListName('');
  };

  const handleDeleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
  };

  const renderListItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => handleModifyList(item.id)}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDeleteList(item.id)}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const handleModifyList = (id) => {
    // Implement logic to modify list item
    Alert.alert('Modify List', `Modify list with id: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Board Page</Text>

      <FlatList
        data={lists}
        renderItem={renderListItem}
        keyExtractor={(item) => item.id}
        style={styles.listContainer}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>

      {/* Modal to create new list */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter List Name"
              value={newListName}
              onChangeText={(text) => setNewListName(text)}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
              <Text style={styles.createButtonText}>Create List</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listContainer: {
    flexGrow: 1,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  listItemText: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BoardPage;
