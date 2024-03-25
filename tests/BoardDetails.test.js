import React from 'react';
import { render } from '@testing-library/react-native';
import BoardDetails from '../pages/boardDetails';

test('renders BoardDetails component without crashing', () => {
  const mockRoute = { params: { board: { id: '123', name: 'Test Board' } } };
  const mockNavigation = { setOptions: jest.fn() };

  render(<BoardDetails route={mockRoute} navigation={mockNavigation} />);
});
