import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/react/cleanup-after-each';
import Dashboard from './Dashboard';

describe('<Dashboard />', () => {
  it('renders dashboard!', () => {
    render(<Dashboard />);
  });
  it('renders buttons', () => {
    const dashboardButtons = render(<Dashboard />);
    dashboardButtons.getByText(new RegExp(`Strike`, 'i'));
    dashboardButtons.getByText(new RegExp(`Ball`, 'i'));
    dashboardButtons.getByText(new RegExp(`Foul`, 'i'));
    dashboardButtons.getByText(new RegExp(`Hit`, 'i'));
  });
  it('runs callbacks', () => {
    let target;
    const callback = name => () => (target = name);
    const dashboardRender = render(
        <Dashboard 
            strike = {callback('Strike')}
            ball = {callback('Ball')}
            foul = {callback('Foul')}
            hit = {callback('Hit')}
        />
    );
    const fireButtons = ['Strike', 'Ball', 'Foul', 'Hit'].map(name => dashboardRender.getByText(new RegExp(name, 'i')));
    fireButtons.forEach(fireButton => {
      fireEvent.click(fireButton);
      expect(target).toBe(fireButton.textContent);
    });
  });
});