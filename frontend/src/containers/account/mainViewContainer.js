import React from "react";
import UserInfo from "../../components/user/userInfo";
import UserStats from "../../components/user/userStats";
import UserNews from "../../components/user/userNews";

const MainViewContainer = () => {
    return (
        <div className={"main-view-inside"}>
            <div className={"main-view-container"}>

                <div className={"user-container-right"}>
                    <UserStats/>
                </div>
                <div className={"user-container-left"}>
                    <UserInfo/>
                    <UserNews/>
                </div>
            </div>
        </div>
    );
};

export default MainViewContainer;
