import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const CreateWorkspaceModal = ({ newWorkspaceName, setNewWorkspaceName, setModalVisible, handleCreateWorkspace }) => {
  return (
    
      <View>
        <Text style={styles.modalTitle}>Nouvel espace de travail</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de l'espace de travail"
          value={newWorkspaceName}
          onChangeText={setNewWorkspaceName}
        />
        <View style={[styles.modalButtonsContainer, { justifyContent: 'flex-end' }]}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#FF3B30', marginLeft: 10 }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#007AFF' }]}
            onPress={handleCreateWorkspace}
          >
            <Text style={styles.buttonText}>Créer</Text>
          </TouchableOpacity>
        </View>
      </View>
    
  );
};

const styles = StyleSheet.create({
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        marginBottom: 30,
      },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
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
});

export default CreateWorkspaceModal;
