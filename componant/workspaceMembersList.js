import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getMembersWorkspaces } from '../services'; 

const WorkspaceMembersList = ({ workspaceId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembersWorkspaces(workspaceId);
      if (response.error) {
        console.error('Error fetching members:', response.message);
      } else {
        setMembers(response);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View >
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          data={members}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.memberItem}>
              <Text style={styles.memberName}>{item.fullName}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export const fetchMembersList = async (workspaceId) => {
  let members = [];
  try {
    const response = await getMembersWorkspaces(workspaceId);
    if (response.error) {
      console.error('Error fetching members:', response.message);
    } else {
      members = response;
    }
  } catch (error) {
    console.error('Error fetching members:', error);
  }
  return members;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  memberItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  memberName: {
    fontSize: 16,
  },
});

export default WorkspaceMembersList;
