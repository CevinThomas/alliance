const name = "Cevin";
const email = "cevin.thomas.ny@gmail.com";
const password = "Nygiants1";

const validateInput = ( name, email, password, callback ) => {
    let errorObject = {};

    if ( name.trim().length <= 0 ) {
        errorObject = { validated: false, errorMessage: "Fields cannot be empty" };
        return callback( errorObject );
    }
    if ( email.length <= 0 || password.length <= 0 ) {
        return errorObject = { validated: false, errorMessage: "Fields cannot be empty" };
    } else if ( password.length <= 6 ) {
        errorObject = { validated: false, errorMessage: "Password must be longer than 6 characters" };
        return callback( errorObject );
    } else {
        errorObject = { validated: true };
        return callback( errorObject );
    }
};

test( "Should return true (Validated)", () => {
    validateInput( "Cevin", "cevin.thomas.ny@gmail.com", "Nygiants1", ( validated ) => {
        expect( validated.validated ).toBeTruthy();
    } );
} );

test( "Should return false (Password too short)", () => {
    validateInput( "Cevin", "cevin.thomas.ny@gmail.com", "2", ( validated ) => {
        expect( validated ).toStrictEqual( {
            validated: false,
            errorMessage: "Password must be longer than 6 characters"
        } );
    } );
} );

test( "Should return false (With fields empty message)", () => {
    validateInput( "", "cevin.thomas.ny@gmail.com", "Nygiants1", ( validated ) => {
        expect( validated ).toStrictEqual( { validated: false, errorMessage: "Fields cannot be empty" } );
    } );
} );