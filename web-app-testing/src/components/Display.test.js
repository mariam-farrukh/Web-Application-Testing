import React from 'react';
import { render } from '@testing-library/react' 
import '@testing-library/react/cleanup-after-each';
import Display from './Display';

describe('<Display />', () => {
    it('renders Display!', () => {
        render(<Display />);
    });
    it('renders strikes', () => {
        const strikes = 2;
        const displayStrikes = render(<Display strikes={strikes} />);
        displayStrikes.getByText(new RegExp(`Strikes: ${strikes}`,'i'));
    });
    it('renders balls', () => {
        const balls = 3;
        const displayBalls = render(<Display balls={balls} />);
        displayBalls.getByText(new RegExp(`Balls: ${balls}`,'i')); 
    });
});