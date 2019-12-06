const getToken = require( "../helperFunctions/index" ).getToken;
const bearerReq = require( "../mockData/index" ).bearerReq;
const noBearerReq = require( "../mockData/index" ).noBearerReq;

test( "Should return a token", () => {
    const token = getToken( bearerReq );
    expect( token ).toBe( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNldmluLnRob21hcy5ueUBnbWFpbC5jb20iLCJpYXQiOjE1NzU1MzUxMTl9.24k23bi5L2OMvudSNnZ_krdutKIGx5PR4OYqjoTRBaU" );
} );

test( "Should return false", () => {
    const token = getToken( noBearerReq );
    expect( token ).toBeFalsy();
} );



