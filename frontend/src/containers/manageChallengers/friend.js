import React from "react";

const Friend = ( props ) => {
    const friendId = props.history.location.search.split( "?" )[1];

    return (
        <div>
            <h1>Hello {friendId}</h1>
        </div>
    );
};

export default Friend;
