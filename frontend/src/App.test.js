import React from "react";
import Enzyme, {shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import LeftColumn from "./containers/registration/leftColumn";
import App from "./App";

Enzyme.configure( { adapter: new EnzymeAdapter() } );

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @param state
 * @returns {ShallowWrapper}
 */

const setup = ( props = {}, state = null ) => {
    return shallow( <LeftColumn {...props}/> );
};

test( "Renders without crashing", () => {
    const wrapper = shallow( <App/> );
    expect( wrapper ).toBeTruthy();
} );

test( "Render leftColumn Container without issues", () => {
    const wrapper = setup();
    const appComponent = wrapper.find( "[data-test='component-leftcolumn']" );
    expect( appComponent.length ).toBe( 1 );
} );

test( "Runs Axios registration function", () => {

} );

test( "Sends user input to redux", () => {

} );

test( "Takes user to the login page", () => {

} );
