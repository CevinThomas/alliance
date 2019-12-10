import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import * as registrationConstants from "../../constants/registration";
import * as urls from "../../constants/urls";
import Axios from "axios";
import ResponseMessage from "../../components/misc/responseMessage";
import LOGGED_IN from "../../constants/token";

const mapStateToProps = state => {
    return { userCredentials: state.userLoginCredentials };
};

const RightColumn = ( props ) => {

    const postRegistrationCredentials = () => {
        Axios( {
            method: "POST",
            url: urls.ADD_USER_URL,
            data: {
                name: props.userCredentials.name,
                email: props.userCredentials.email,
                password: props.userCredentials.password
            }
        } ).then( ( response ) => {
            props.dispatch( {
                type: registrationConstants.REGISTRATION_RESPONSE,
                payload: response.data
            } );
            if ( response.data.message === "User was successfully created!" ) {
                props.dispatch( { type: LOGGED_IN, payload: true } );
                setTimeout( () => {
                    props.history.push( "/" );
                }, 1000 );
            }
        } ).catch( e => console.log( e ) );
    };


    const handleInputChange = ( e ) => {
        if ( e.target.name === "name" ) {
            props.dispatch( { type: registrationConstants.NAME_REGISTRATION, payload: e.target.value } );
        }
        if ( e.target.name === "email" ) {
            props.dispatch( { type: registrationConstants.EMAIL_REGISTRATION, payload: e.target.value } );
        }
        if ( e.target.name === "password" ) {
            props.dispatch( { type: registrationConstants.PASSWORD_REGISTRATION, payload: e.target.value } );
        }
    };

    //TODO: Maybe remake this with a HOC so that the container div is not JSX inside of this container
    return (
        <div id={props.id}>
            <div id={"registration-inner"}>
                <div>
                    <Heading class={"registration-heading"} title={"Create Account"}/>
                    <Heading type={"h3"} class={"registration-heading"} title={"We need some things from you"}/>
                    <ResponseMessage class={"error-div"} errorMessage={props.userCredentials.response.message}/>
                </div>
                <div id={"registration-input-box"}>
                    <Input onchange={handleInputChange} type={"text"} placeholder={"Enter your name"} name={"name"}/>
                    <Input onchange={handleInputChange} type={"email"} placeholder={"Enter your email"} name={"email"}/>
                    <Input onchange={handleInputChange} type={"password"} placeholder={"Enter your password"}
                           name={"password"}/>
                    <Button onclick={postRegistrationCredentials} title={"Sign up"}/>
                </div>
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( withRouter( RightColumn ) );
