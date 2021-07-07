    
import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import App from './App';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders without errors', () => {
    render(<App />);
  });

  describe('Display', () => {
    it('should update strikes when dashboard button is clicked', () => {
      const { queryByText } = render(<App />);
      const strikeButton = queryByText(/strike$/i);
      expect(strikeButton).toBeTruthy();

      const strikeDisplay = queryByText(/strikes: \d/i);
      expect(strikeDisplay).toBeTruthy();

      fireEvent.click(strikeButton);
      expect(queryByText(/strikes: 1/i)).toBeTruthy();
    });

    it('should update balls when dashboard button is clicked', () => {
      const { queryByText } = render(<App />);
      const ballsButton = queryByText(/ball$/i);
      expect(ballsButton).toBeTruthy();

      const ballsDisplay = queryByText(/balls: \d/i);
      expect(ballsDisplay).toBeTruthy();

      fireEvent.click(ballsButton);
      expect(queryByText(/balls: 1/i)).toBeTruthy();
    });
  });
  
  describe('Count Rules', () => {
    it('should correctly reset balls and strikes at 3 strikes', () => {
      const { queryByText } = render(<App />);
      const strikeButton = queryByText(/strike$/i);
      expect(strikeButton).toBeTruthy();
      const ballsButton = queryByText(/ball$/i);
      expect(strikeButton).toBeTruthy();

      const strikeDisplay = queryByText(/strikes: \d/i);
      expect(strikeDisplay).toBeTruthy();
      const ballsDisplay = queryByText(/balls: \d/i);
      expect(ballsDisplay).toBeTruthy();
      
      fireEvent.click(ballsButton);
      fireEvent.click(strikeButton);
      fireEvent.click(strikeButton);
      fireEvent.click(strikeButton);

      expect(queryByText(/balls: 0/i)).toBeTruthy();
      expect(queryByText(/strikes: 0/i)).toBeTruthy();
    });
    it('should reset balls and strikes at 4 balls', () => {
      const { queryByText } = render(<App />);
      const strikeButton = queryByText(/strike$/i);
      expect(strikeButton).toBeTruthy();
      const ballsButton = queryByText(/ball$/i);
      expect(ballsButton).toBeTruthy();

      const strikeDisplay = queryByText(/strikes: \d/i);
      expect(strikeDisplay).toBeTruthy();
      const ballsDisplay = queryByText(/balls: \d/i);
      expect(ballsDisplay).toBeTruthy();
      
      fireEvent.click(strikeButton);
      fireEvent.click(ballsButton);
      fireEvent.click(ballsButton);
      fireEvent.click(ballsButton);
      fireEvent.click(ballsButton);

      expect(queryByText(/balls: 0/i)).toBeTruthy();
      expect(queryByText(/strikes: 0/i)).toBeTruthy();
    });
    it('should reset balls and strikes on a hit', () => {
      const { queryByText } = render(<App />);
      const hitButton = queryByText(/hit$/i);
      expect(hitButton).toBeTruthy();
      const strikeButton = queryByText(/strike$/i);
      expect(strikeButton).toBeTruthy();
      const ballsButton = queryByText(/ball$/i);
      expect(ballsButton).toBeTruthy();

      fireEvent.click(strikeButton);
      fireEvent.click(ballsButton);
      fireEvent.click(hitButton);

      expect(queryByText(/balls: 0/i)).toBeTruthy();
      expect(queryByText(/strikes: 0/i)).toBeTruthy();
    });
    it('should increase strikes up to a maximum of two on fouls', () => {
      const { queryByText } = render(<App />);
      const foulButton = queryByText(/foul$/i);
      expect(foulButton).toBeTruthy();

      fireEvent.click(foulButton);
      expect(queryByText(/strikes: 1/i)).toBeTruthy();
      fireEvent.click(foulButton);
      expect(queryByText(/strikes: 2/i)).toBeTruthy();
      fireEvent.click(foulButton);
      expect(queryByText(/strikes: 2/i)).toBeTruthy();
    });
  });
});