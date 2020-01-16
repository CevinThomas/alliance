import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import AvatarIcon from "../../components/misc/svgLogin";
import Heading from "../../components/textElements/heading";
import Input from "../../components/forms/input";
import Button from "../../components/general/button";
import NotMember from "../../components/misc/notMember";
import ResponseMessage from "../../components/misc/responseMessage";
import Axios from "axios";
import * as loginConstants from "../../constants/login";
import * as urlConstants from "../../constants/urls";
import LOGGED_IN from "../../constants/token";

const mapStateToProps = state => {
    return { loginCredentials: state.userLoginInformation };
};

const LoginBox = ( props ) => {

    const sendLoginRequest = () => {
        Axios( {
            method: "POST",
            url: urlConstants.LOGIN_USER_URL,
            data: {
                email: props.loginCredentials.email,
                password: props.loginCredentials.password
            }
        } ).then( ( response ) => {
            props.dispatch( {
                type: loginConstants.RESPONSE_LOGIN,
                payload: response.data
            } );
            if ( response.data.message === "You are now logged in" ) {
                props.dispatch( { type: LOGGED_IN, payload: true } );
                setTimeout( () => {
                    props.history.push( "/" );
                }, 1500 );
            }
        } ).catch( e => console.log( e ) );
    };

    const handleInputChange = ( e ) => {
        if ( e.target.name === "email" ) {
            props.dispatch( { type: loginConstants.EMAIL_LOGIN, payload: e.target.value } );
        }

        if ( e.target.name === "password" ) {
            props.dispatch( { type: loginConstants.PASSWORD_LOGIN, payload: e.target.value } );
        }
    };

    return (
        <div id={props.id}>
            <AvatarIcon id={"avatar_icon"}/>
            <Heading class={"login-header"} title={"Login"}/>
            <ResponseMessage class={"error-div"} errorMessage={props.loginCredentials.response.message}/>
            <div className={"form"} id={"loginForm"}>
                <div id={"form-inner"}>
                    <Input onchange={handleInputChange} placeholder={"Email"} type={"email"} name={"email"}/>
                    <Input onchange={handleInputChange} placeholder={"Password"} type={"password"} name={"password"}/>
                    <Button onclick={sendLoginRequest} title={"Login"}/>
                    <NotMember link={"/registration"} message={"Not a member?"} id={"not-login"}/>
                </div>
            </div>
        </div>
    );
};

export default connect( mapStateToProps )( withRouter( LoginBox ) );
