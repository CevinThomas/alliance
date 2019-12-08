import React from "react";
import Enzyme, {shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import Heading from "./heading";
import {checkProps, findByTestAttr} from "../../../test/testUtils";

Enzyme.configure( { adapter: new EnzymeAdapter() } );

//TODO: Test so that it displays the correct H element depending on props, also the correct text

const setup = ( props = {} ) => {
    return shallow( <Heading {...props} /> );
};

test( "Renders without crashing", () => {
    const wrapper = setup();
    const component = findByTestAttr( wrapper, "component-heading" );
    expect( component.length ).toBe( 1 );
} );

test( "Displays correct H element from props", () => {
    const wrapper = setup( { type: "h2" } );
    const component = findByTestAttr( wrapper, "component-heading" );
    expect( component.containsMatchingElement( <h2/> ) ).toBeTruthy();
} );

test( "Displays correct title from props", () => {
    const wrapper = setup( { title: "Test title", type: "h2" } );
    const component = findByTestAttr( wrapper, "component-heading" );
    expect( component.text() ).toEqual( "Test title" );
} );

test( "Does not throw a warning with expected props", () => {
    const expectedProps = { title: false, type: false };
    checkProps( Heading, expectedProps );
} );
