import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Header from './Header';

test('should render header with string "datastream generator"', async () => { 
    render(<Header/>);
    const textElement = screen.getByRole("banner");
    expect(textElement).toBeInTheDocument();
    expect(textElement.textContent).toBe('datastream generator');
    screen.debug();

});