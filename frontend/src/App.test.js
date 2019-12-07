import React from "react";
import Enzyme, {shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";
import LeftColumn from "./containers/registration/leftColumn";

Enzyme.configure( { adapter: new EnzymeAdapter() } );

test( "Renders without crashing", () => {
    const wrapper = shallow( <App/> );
    expect( wrapper ).toBeTruthy();
} );

test( "Render leftColumn Container without issues", () => {
    const wrapper = shallow( <LeftColumn/> );
    const appComponent = wrapper.find( "[data-test='component-leftcolumn']" );
    expect( appComponent.length ).toBe( 1 );
} );

test( "Runs Axios registration function", () => {

} );

test( "Sends user input to redux", () => {

} );

test( "Takes user to the login page", () => {

} );
