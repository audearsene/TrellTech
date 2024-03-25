import { API_token, API_key } from '@env';
import axios from 'axios';

//Créer un nouvel espace de travail(entrer le nom de l'espace)
export const createWorkspace = async (name) => {
    try {
        const response = await axios.post(
            'https://api.trello.com/1/organizations', {},
            {
                params: {
                    key: API_key,
                    token: API_token,
                    displayName: name,
                }
            }
        );
        
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};


//Modifier un espace de travail(recupérer l'id de l'espace)
export const modifyWorkspace = async(id, newName) =>{
    try {
        const response = await axios.put(`https://api.trello.com/1/organizations/${id}`, {},
            {
                params: {
                    key: API_key,
                    token: API_token,
                    displayName: newName,
                }
            }
        );
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Supprimer un espace de travail
export const deleteWorkspace = async(id) =>{

    try{
        const response = await axios.delete(`https://api.trello.com/1/organizations/${id}`, {
        params: {
            key: API_key,
            token: API_token,
        }
    })

        return response.data;

    }catch (error) {
        return { error: true, message: error.message };
}
};

//Récupérer un espace de travaille
export const getAWorkspace = async(name) =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/organizations/${id}`, {
                params: {
                    key: API_key,
                    token: API_token,
                    displayName: name,
                }
            })
            // console.log(response.data)
                return response.data;
    }catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer un espace de travaille
export const getAllWorkspaces = async() =>{
    try{
        const response = await axios.get(`https://api.trello.com/1/members/me/organizations`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })
        
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer les membres d'un espace de travail
export const getMembersWorkspaces = async(id) =>{
    try{
        const response = await axios.get(`https://api.trello.com/1/organizations/${id}/members`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })
        
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

export const getMember = async (memberId) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/members/${memberId}`, {
        params: {
            key: API_key,
            token: API_token,
        },
        });
        return response.data;
    } catch (error) {
        console.error(error, error.response.data)
    }
};

//Créer un nouveau tableau(entrer le nom du tableau)
export const createBoard = async(boardName, workspaceId) =>{
    try{
        const response = await axios.post(`https://api.trello.com/1/boards`, {}, {
        params: {
            name: boardName,
            idOrganization: workspaceId,
            key: API_key,
            token: API_token,
        }
    })

    return response.data;
    }catch (error) {
        return { error: true, message: error.message };
    }
};

//Créer un nouveau tableau avec un model(entrer le nom du tableau)
export const createTempBoard = async(boardName, workspaceId, modelId) =>{
    try{
        const response = await axios.post(`https://api.trello.com/1/boards`, {}, {
        params: {
            name: boardName,
            idOrganization: workspaceId,
            idBoardSource: modelId,
            key: API_key,
            token: API_token,
        }
    })

    //console.log(response);
    return response;
    }catch (error) {
        return { error: true, message: error.message };
    }
};

//Modifier un tableau(recupérer l'id du tableau)
export const modifyBoard = async(id, newName) =>{
    try{
        const response = await axios.put(`https://api.trello.com/1/boards/${id}`, {}, {
        params: {
            name: newName,
            key: API_key,
            token: API_token,
        }
    })

        return response.data;
    }catch (error) {
        return { error: true, message: error.message };
    }
};

//Supprimer un tableau
export const deleteBoard = async(id) =>{
    try {
        const response = await axios.delete(`https://api.trello.com/1/boards/${id}`, {
        params: {
            key: API_key,
            token: API_token,
        }
    })

        return response.data;
    }catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer un tableau
export const getABoard = async(id) =>{
    try{
        const response = await axios.get(`https://api.trello.com/1/boards/${id}`, {
        params: {
            key: API_key,
            token: API_token,
        }
    })

    
        return response.data;
    }catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer les tableaux d'un espace de travail
export const getBoards = async() =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/members/me/boards`, {
        params: {
            key: API_key,
            token: API_token,
        }
    })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer les tableaux d'un espace de travail
export const getWorkspaceBoards = async(id) =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/organizations/${id}/boards`, {
        params: {
            key: API_key,
            token: API_token,
        }
    })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Créer une nouvelle liste(entrer le nom de la liste)
export const createList = async(listName) =>{
    try{
        const response = await axios.post(`https://api.trello.com/1/lists`, {}, {
        params: {
            key: API_key,
            token: API_token,
            name: listName,
        }
    })
        return response.data;
    } catch (error) { 
        console.error(error,error.response.data);
}
};
//Créer une list dans un tableau
export const createBoardList = async(boardId, listName) =>{
    try{
        const response = await axios.post(`https://api.trello.com/1/boards/${boardId}/lists`, {}, {
        params: {
            key: API_key,
            token: API_token,
            name: listName,
        }
    })

        return response.data;
    
    } catch (error) {
        return { error: true, message: error.message };
}
};

//Modifier une liste(recupérer l'id de la list)
export const modifyList = async(id, newName) =>{
    try{
        const response = await axios.put(`https://api.trello.com/1/lists/${id}`, {}, {
            params: {
                name: newName,
                key: API_key,
                token: API_token,
            }
        })
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Archiver une liste
export const archiveList = async(id) =>{
    try {
        const response = await axios.put(`https://api.trello.com/1/lists/${id}/closed`, {}, {
            params: {
                value: true,
                key: API_key,
                token: API_token,
            }
        })
            return response.data;
    } catch (error) {
        return { error: true, message: error.response.data };
    }
};

//Récupérer les listes d'un tableau(id du tableau)
export const getLists = async(id) =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${id}/lists`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer une listes d'un tableau(id de la liste)
export const getAList = async(id) =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/lists/${id}`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Créer une nouvelle carte(entrer le nom de la carte)
export const createCard = async(listId, cardName) =>{
    try {
        const response = await axios.post(`https://api.trello.com/1/cards`, {}, {
            params: {
                name: cardName,
                key: API_key,
                token: API_token,
                idList: listId,
            }
        })
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

//Modifier une carte(recupérer l'id de la carte)
export const modifyCard = async(id, newName) =>{
    try {
        const response = await axios.put(`https://api.trello.com/1/cards/${id}`, {}, {
            params: {
                name: newName,
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Supprimer une carte
export const deleteCard = async(id) =>{
    try {
        const response = await axios.delete(`https://api.trello.com/1/cards/${id}`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer les cartes d'une liste(id de la liste)
export const getCardsList = async(id) =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/lists/${id}/cards`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//ajouter un utilisateur dans un espace de travail
export const userJoin = async(id, email) =>{
    try {
        const response = await axios.put(`https://api.trello.com/1/organizations/${id}/members`, {}, {
            params: {
                email: email,
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

//Récupérer les tableaux d'un espace de travail
export const getTemplateBoards = async() =>{
    try {
        const response = await axios.get(`https://trello.com/1/batch?urls=%2F1%2Fboard%2F5c4efa1d25a9692173830e7f%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F5ec98d97f98409568dd89dff%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F5994bf29195fa87fb9f27709%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F5e6005043fbdb55d9781821e%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F5b78b8c106c63923ffe26520%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F5aaafd432693e874ec11495c%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F591ca6422428d5f5b2794aee%3Ffields%3Did%252Cname%252Cprefs,%2F1%2Fboard%2F5994be8ce20c9b37589141c2%3Ffields%3Did%252Cname%252Cprefs`)
        //console.log (response);
        //console.log (JSON.stringify(response.data,null,2));
        return response.data;
    } catch (error) {
        return { error: true, message: error.message };
    }
};

export const getCardMembers = async(id) =>{
    try {
        const response = await axios.get(`https://api.trello.com/1/cards/${id}/members`, {
            params: {
                key: API_key,
                token: API_token,
            }
        })

        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const getMembersInBoard = async (boardId) => {
    try {
        const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/members`, {
        params: {
            key: API_key,
            token: API_token,
        },
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const addMembersToCard = async(id, memberId) =>{
    try {
        const response = await axios.post(`https://api.trello.com/1/cards/${id}/idMembers`, {
            value: memberId,
            key: API_key,
            token: API_token,
        })
        return response.data;
    } catch (error) {
        console.log(error.response.data);
    }
};