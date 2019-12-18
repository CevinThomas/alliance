import io from "socket.io-client";

export const mainSocket = io( "http://localhost:8000" );
export const friendsSocket = io( "/friends", { forceNew: true } );