import React from "react";
import EditOrViewSpace from "../../components/space/editOrViewSpace";

const Edit = () => {
    return (
        <div id={"edit-space-singular"}>
            <EditOrViewSpace isOwner={true}/>
        </div>
    );
};

export default Edit;
