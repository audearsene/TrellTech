import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getCardMembers, getMembersInBoard, addMembersToCard, getMember } from '../services';

const CardsModal = ({ setModalVisibleCards, card }) => {
    const [members, setMembers] = useState([]);
    const [cardMembers, setCardMembers] = useState ([]);
    const [showAddMembers, setShowAddMembers] = useState(false);

    useEffect(() => {
      getMembersInCard();
      getMembers();
    }, []);

    const getMembersInCard = async () => {
        const members = await getCardMembers(card.id);
        setCardMembers(members);
    };

    const getMembers = async () => {
      const members = await getMembersInBoard(card.idBoard);
      const membersDetailsPromises = members.map(member => getMember(member.id));
      const membersDetails = await Promise.all(membersDetailsPromises);
      setMembers(membersDetails);
      //console.log(membersDetails);
    }

    const addMemberToCard = async (memberId) => {
        const response = await addMembersToCard(card.id, memberId);
        if (response) {
            getMembersInCard();
        }
    }
 
    const renderAddMembers = () => {
        return (
            <View>
                <FlatList
                    horizontal= {true}
                    data={members}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => addMemberToCard(item.id)}>
                            <Image source={{ uri: item.avatarUrl + '/50.png' }} style={styles.profilePicture} />
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                >
                </FlatList>
            </View>
        );
    }

  return (
   <View>
  <Text style={styles.cardName}>{card.name}</Text>
  <TouchableOpacity onPress={() => setShowAddMembers(true)} style={styles.addButton}>
    <MaterialIcons name="group-add" size={24} color="#007AFF" />
    <Text style={styles.addButtonText}>Ajouter un membre</Text>
  </TouchableOpacity>
  {showAddMembers && renderAddMembers()}
  <Text style={styles.sectionTitle}>Membre(s) de la carte</Text>
  <FlatList
    horizontal={true}
    style={{ paddingTop: 10 }}
    data={cardMembers}
    renderItem={({ item }) => (
      <View>
        <Image source={{ uri: item.avatarUrl + '/50.png' }} style={styles.profilePicture} />
      </View>
    )}
  />
  <Text style={styles.sectionTitle}>Description</Text>
  <Text style={styles.description}>{card.desc}</Text>
  <TouchableOpacity onPress={() => setModalVisibleCards(false)}>
    <Text style={{ ...styles.createButtonText, marginTop: 30, marginBottom: 10 }}>Fermer</Text>
  </TouchableOpacity>
</View>

  );
};

const styles = StyleSheet.create({
    createButtonText: {
        color: '#007AFF',
        marginTop: 10,
        textAlign: 'center',
        fontSize: 23,
      },
      profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
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
        justifyContent: 'space-between',
      },
      addButtonText: {
          color: '#007AFF', 
          fontWeight: 'bold', 
          fontSize: 18,
      },
      cardName: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginBottom: 10,
        color: '#333', // Couleur du texte
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#007AFF', // Couleur du texte
      },
      description: {
        fontSize: 14,
        color: '#555', // Couleur du texte
      },
});

export default CardsModal;
