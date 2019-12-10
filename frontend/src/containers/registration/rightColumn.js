import React from "react";
import {connect} from "react-redux";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import * as registrationConstants from "../../constants/registration";
import * as urls from "../../constants/urls";
import Axios from "axios";

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
                password: props.userCredentials.email
            }
        } ).then( r => console.log( r ) ).catch( e => console.log( e ) );
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

export default connect( mapStateToProps )( RightColumn );
