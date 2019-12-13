import React, {useState} from "react";
import Input from "../components/forms/input";
import Button from "../components/general/button";
import socketIOClient from "socket.io-client";

const socket = socketIOClient( "http://localhost:8000" );
const ManageChallengers = () => {

    const [ message, setMessage ] = useState( "" );

    const handleSocketChange = ( e ) => {
        setMessage( e.target.value );
    };
    
    const sendSocketMessage = ( e ) => {
        socket.emit( "Test message", message );
    };

    return (
        <div>
            <Input onchange={handleSocketChange} type={"text"}/>
            <Button onclick={sendSocketMessage}/>
        </div>
    );
};

export default ManageChallengers;
