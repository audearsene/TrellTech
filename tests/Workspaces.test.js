//import React from 'react';
//import Workspaces from '../pages/workspaces';
import { createWorkspace} from '../services';
import axios from 'axios';

jest.mock('axios');

describe('Workspaces component', () => {
  // beforeEach(() => {
  //   axios.post.mockClear();
  // });

  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it('create workspace', async () => {
    const workspaceName = "Test1234";
    const dataresponse = { data : { displayName : workspaceName }};
    axios.post.mockResolvedValue(dataresponse);

    const response = await createWorkspace(workspaceName);

    expect(response).toEqual(dataresponse.data);
  });

  it('create board', async () => {
    const boardName = "Test124";
    const dataresponse = { data : { displayName : boardName }};
    axios.post.mockResolvedValue(dataresponse);

    const response = await createWorkspace(boardName);

    expect(response).toEqual(dataresponse.data);
  });

});
