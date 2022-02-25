import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { SignalButton } from './SignalButton';
import SignalScreen from './SignalScreen';


describe("Left Side (Signal Type: Random Signal)", () => {

    test('should render title SIGNAL TYPE', async () => { 
        render(<SignalScreen/>);
        const textElement = screen.getByText(/signal type/i);
        expect(textElement).toBeInTheDocument();
        expect(textElement).toBeVisible();
    });

    describe("Signal buttons", () => {

        function signalButtonRender(props) {
            render(<SignalButton name={props}/>);
            const buttonElement = screen.getByText(props);
            expect(buttonElement).toBeInTheDocument();
        }
        
    
        test('should render same text passed into props for Random Signal', async () => {
            signalButtonRender("RANDOM SIGNAL");
            //screen.debug();
        });


        function clickSignalButton(props) {
            render(<SignalScreen/>);
            const buttonElement = screen.getByRole("button", props);
            fireEvent.click(buttonElement);
        }


        //TODO
        test('should render text for signal configuration after clicking "RANDOM SIGNAL"-button', async () => {
            clickSignalButton({ name: "RANDOM SIGNAL"});
            
            const textElement1 = screen.getByText("signal name:");
            const textElement2 = screen.getByText("lower boundary:");
            const textElement3 = screen.getByText("upper boundary:");
            const textElement4 = screen.getByText("transmission frequency:");
            expect(textElement1).toBeVisible;
            expect(textElement2).toBeVisible;
            expect(textElement3).toBeVisible;
            expect(textElement4).toBeVisible;
        });

        function getAndExpectTextForSinusAndCosinus() {
            const textElement1 = screen.getByText("signal name:");
            const textElement2 = screen.getByText("frequency:");
            const textElement3 = screen.getByText("amplitude:");
            const textElement4 = screen.getByText("transmission frequency:");
            expect(textElement1).toBeVisible;
            expect(textElement2).toBeVisible;
            expect(textElement3).toBeVisible;
            expect(textElement4).toBeVisible;
        }
        
        test('should render text for signal configuration after clicking "SINUS SIGNAL"-button', async () => {
            clickSignalButton({ name: "SINUS SIGNAL"});

            getAndExpectTextForSinusAndCosinus();
        });


        test('should render text for signal configuration after clicking "COSINUS SIGNAL"-button', async () => {
            clickSignalButton({ name: "COSINUS SIGNAL"})

            getAndExpectTextForSinusAndCosinus();
        });

        test('should render text for signal configuration after clicking "SPIKED SIGNAL"-button', async () => {
            clickSignalButton({ name: "SPIKED SIGNAL"})
            
            const textElement1 = screen.getByText("signal name:");
            const textElement2 = screen.getByText("base:");
            const textElement3 = screen.getByText("distance:");
            const textElement4 = screen.getByText("size:");
            const textElement5 = screen.getByText("probability:");
            const textElement6 = screen.getByText("transmission frequency:");
            expect(textElement1).toBeVisible;
            expect(textElement2).toBeVisible;
            expect(textElement3).toBeVisible;
            expect(textElement4).toBeVisible;
            expect(textElement5).toBeVisible;
            expect(textElement6).toBeVisible;
        });

        test('should render text for signal configuration after clicking "NORM. DIST. SIGNAL"-button', async () => {
            clickSignalButton({ name: "NORM. DIST. SIGNAL"});
            
            const textElement1 = screen.getByText("signal name:");
            const textElement2 = screen.getByText("expected value:");
            const textElement3 = screen.getByText("standard deviation:");
            const textElement4 = screen.getByText("transmission frequency:");
            expect(textElement1).toBeVisible;
            expect(textElement2).toBeVisible;
            expect(textElement3).toBeVisible;
            expect(textElement4).toBeVisible;
        });

        test('should render same text passed into props for Sinus Signal', async () => {
            signalButtonRender("SINUS SIGNAL");
            screen.debug();
        });
        
        test('should render same text passed into props for Cosinus Signal', async () => {
            signalButtonRender("COSINUS SIGNAL");
            screen.debug();
        });
        
        test('should render same text passed into props for Spiked Signal', async () => {
            signalButtonRender("SPIKED SIGNAL");
            screen.debug();
        });
        
        test('should render same text passed into props for Distributed Signal', async () => {
            signalButtonRender("NORM. DIST. SIGNAL");
            screen.debug();
        });
    });
});


test('should render divider', async () => { 
    render(<SignalScreen/>);
    const separatorElement = screen.getByRole("separator")
    expect(separatorElement).not.toBeNull();
});

describe("Right Side (Signal Configuration: Random Signal)", () => {

    test('should render title SIGNAL CONFIGURATION', async () => { 
        render(<SignalScreen/>);
        const textElement = screen.getByText(/signal configuration/i)
        expect(textElement).toBeInTheDocument();
        expect(textElement).toBeVisible();
    });
    
    describe("Parameters for: Random Signal", () => {
        //TODO
    });
    
    test('should render label for "signal name"', async () => { 
        render(<SignalScreen/>);
        const textElement = screen.getByLabelText(/name/i)
        expect(textElement).toBeInTheDocument();
        expect(textElement).toBeVisible();
    });

    
    test('should render label for "lower boundary", "upper boundary" and "transmission frequency"', async () => { 
        render(<SignalScreen/>);
        const textElement = screen.getAllByLabelText(/value/i)
        expect(textElement.length).toBe(3);
    });
    
    test('should render create button', async () => { 
        render(<SignalScreen/>);
        const buttonElement = screen.getByText(/create/i)
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeVisible();
    });
});