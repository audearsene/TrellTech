// Bouton

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const BoardItem = ({ item, navigation, onViewWorkspace, onModifyBoard, onDeleteBoard, setModalVisibleBoards }) => {

  return (
    <View style={styles.workspaceItem}>
      <View >
        <TouchableOpacity
          onPress={() => {navigation.navigate('BoardDetails', { board: item }) , setModalVisibleBoards(false)}}
        >
          <Text style={styles.boardName}>{item.name}</Text> 
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onModifyBoard(item.id)}>
          <MaterialIcons name="edit" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteBoard(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    workspaceItem: {
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F0F0F2',
        margin: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    boardName: {
        fontSize: 18,   
    },
});

export default BoardItem;
