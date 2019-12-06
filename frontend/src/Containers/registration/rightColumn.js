import React, {useEffect} from "react";
import Heading from "../../Components/textElements/heading";
import Input from "../../Components/forms/input";
import Button from "../../Components/general/button";
import Axios from "axios";
import * as urls from "../../constants/urls";

const RightColumn = ( props ) => {

    useEffect( () => {
        Axios( {
            method: "POST",
            url: urls.ADD_USER_URL,
            data: {
                name: "Cevin",
                email: "cevin.thomas.ny@gmail.com",
                password: "Nygiants1"
            }
        } ).then( r => console.log( r ) ).catch( e => console.log( e ) );
    }, [] );

    //TODO: Maybe remake this with a HOC so that the container div is not JSX inside of this container
    return (
        <div id={props.id}>
            <div id={"registration-inner"}>
                <div>
                    <Heading class={"registration-heading"} title={"Create Account"}/>
                    <Heading type={"h3"} class={"registration-heading"} title={"We need some things from you"}/>
                </div>
                <div id={"registration-input-box"}>
                    <Input type={"text"} placeholder={"Enter your name"} name={"name"}/>
                    <Input type={"email"} placeholder={"Enter your email"} name={"email"}/>
                    <Input type={"password"} placeholder={"Enter your password"} name={"password"}/>
                    <Button title={"Sign up"}/>
                </div>
            </div>
        </div>
    );
};

export default RightColumn;
