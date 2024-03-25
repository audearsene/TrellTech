import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAllBoards, getWorkspaceBoards } from '../services'; // Importez la fonction getAllBoards depuis votre service

const BoardScreen = ({ navigation }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = async () => {
    try {
      const allBoards = await getWorkspaceBoards();
      setBoards(allBoards);
    } catch (error) {
      console.error('Error loading boards:', error);
    }
  };

  const renderBoardItem = ({ item }) => (
    <TouchableOpacity
      style={styles.boardItem}
      onPress={() => navigation.navigate('BoardDetails', { boardId: item.id })}
    >
      <Text style={styles.boardName}>{item.name}</Text>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Boards</Text>
      <FlatList
        data={boards}
        renderItem={renderBoardItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  boardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  boardName: {
    fontSize: 16,
  },
});

export default BoardScreen;
