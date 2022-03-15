import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import SignalScreen from './SignalScreen';
import Output from './Output';

const numbers = [];

test('should render title DATASTREAMS', async () => { 

    render(<Output streams={[]}/>);
    const textElement = screen.getByText(/datastreams/i)
    expect(textElement).toBeInTheDocument();
    expect(textElement).toBeVisible();
});

test('should render title ACTIVE STREAMS', async () => { 

    render(<Output streams={[]}/>);
    const textElement = screen.getByText(/active streams/i)
    expect(textElement).toBeInTheDocument();
    expect(textElement).toBeVisible();
});

test('should render "start all"-text', async () => { 

    render(<Output streams={[]}/>);
    const textElement = screen.getByText(/start all/i)
    expect(textElement).toBeInTheDocument();
    expect(textElement).toBeVisible();
});

test('should render 2 buttons', async () => { 

    render(<Output streams={[]}/>);
    const buttonElement = screen.getAllByRole("button")
    expect(buttonElement).toHaveLength(2);
});
