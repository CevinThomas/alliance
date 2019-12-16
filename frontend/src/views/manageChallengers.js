import React, {useState} from "react";
import Input from "../components/forms/input";
import Button from "../components/general/button";
import {friendsSocket, mainSocket} from "../sockets/index";

const ManageChallengers = () => {

    const [ message, setMessage ] = useState( "" );

    const handleSocketChange = ( e ) => {
        setMessage( e.target.value );
    };

    const sendSocketMessage = ( e ) => {
        mainSocket.emit( "Test message", message );
        friendsSocket.emit( "friends", message );
    };

    return (
        <div>
            <Input onchange={handleSocketChange} type={"text"}/>
            <Button onclick={sendSocketMessage}/>
        </div>
    );
};

export default ManageChallengers;
