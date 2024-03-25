import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Modal, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import WorkspaceMembersList, { fetchMembersList } from './workspaceMembersList'; 
import { userJoin } from '../services';

const WorkspaceItem = ({ item, navigation, onViewWorkspace, onModifyWorkspace, onDeleteWorkspace }) => {
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  

  const handleViewMembers = () => {
    setShowMembersModal(true);
  };

  const handleToggleAddMemberForm = () => {
    setShowAddMemberForm(!showAddMemberForm);
  };

  const fetchMembersList = async () => {
    try {
      const response = await getMembersWorkspaces(workspaceId);
      if (response.error) {
        console.error('Error fetching members:', response.message);
      } else {
        setMembers(response);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddMembers = async () => {
    //console.log('Ajout du membre:', newMemberEmail);
    if (newMemberEmail.trim() !== '') {
      const response = await userJoin(item.id, newMemberEmail);
      if (!response.error) {
        console.log('Membre ajouté avec succès:', response);
        setNewMemberEmail('');
        setRefreshKey(refreshKey + 1);
      } else {
        console.error('Erreur lors de l\'ajout du membre:', response.message);
      }
    } else {
      console.error('Veuillez saisir le nom et l\'email du nouveau membre');
    }
  };

  return (
    <View style={styles.workspaceItem}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={() => onViewWorkspace(item.id)} >
          <Text style={styles.workspaceName}>{item.displayName}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleViewMembers}>
          <MaterialIcons name="group-add" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onModifyWorkspace(item.id)}>
          <MaterialIcons name="edit" size={24} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDeleteWorkspace(item.id)}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>
      </View>

      {/* Modal pour afficher les membres du workspace */}
      <Modal
        visible={showMembersModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMembersModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Membres du Workspace</Text>
            <TouchableOpacity style={styles.addButton} onPress={handleToggleAddMemberForm}>
              <MaterialIcons name="group-add" size={26} color="#007AFF" style={{ marginRight: 5 }} />
              <Text style={styles.addButtonText}>
                {showAddMemberForm ? "Masquer le formulaire" : "Ajouter un membre"}</Text>
            </TouchableOpacity>
            {/* Affichage conditionnel du formulaire d'ajout de membre */}
            {showAddMemberForm && (
              <>
                <TextInput
                  style={styles.textInputButton}
                  placeholder="Email du nouveau membre"
                  value={newMemberEmail}
                  onChangeText={setNewMemberEmail}
                  placeholderTextColor={'#000'}
                />
                <TouchableOpacity onPress={handleAddMembers} style={styles.addButton} >
                  <Text style={styles.addButtonText} >Ajouter</Text>
                </TouchableOpacity>
              </>
            )}
            <WorkspaceMembersList workspaceId={item.id} key={refreshKey}/>
            {/* Bouton pour afficher ou masquer le formulaire d'ajout de membre */}
            <TouchableOpacity onPress={() => setShowMembersModal(false)} style={styles.closeButton}>
              <Text style={{ ...styles.createButtonText, marginTop: 30, marginBottom: 10 }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  textContainer: {
    flex: 1,
  },
  workspaceName: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
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
  createButtonText: {
    color: '#007AFF',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 23,
  },
  textInputButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    borderColor: '#007AFF',
    borderWidth: 1,
    fontSize: 16, // Text size
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default WorkspaceItem;
