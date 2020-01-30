import React from "react";
import GoToSpaces from "../containers/homePage/goToSpaces";
import Navbar from "../components/nav/nav";
import {connect} from "react-redux";
import Layout from "../components/layout";

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userIsOnline
    };
};

const HomePage = ( props ) => {

    return (
        <React.Fragment>
            <Navbar dark/>
            <Layout>
                <div>
                    <GoToSpaces/>
                </div>
            </Layout>

        </React.Fragment>
    );
};

export default connect( mapStateToProps, null )( HomePage );
