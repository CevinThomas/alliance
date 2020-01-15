import React from "react";
import LOGGED_IN from "../constants/token";
import {connect} from "react-redux";

export default ChildComponent => {
    class IsLoggedIn extends React.Component {

        componentDidMount() {
            if ( localStorage.getItem( "TOKEN" ) ) {
                this.props.dispatch( { type: LOGGED_IN, payload: true } );
            } else {
                this.props.dispatch( { type: LOGGED_IN, payload: false } );
                this.props.history.push( "/login" );
            }
        }

        componentWillUnmount() {
            if ( localStorage.getItem( "TOKEN" ) ) {
                this.props.dispatch( { type: LOGGED_IN, payload: true } );
            } else {
                this.props.dispatch( { type: LOGGED_IN, payload: false } );
                this.props.history.push( "/login" );
            }
        }

        render() {
            console.log( "HIGHER ORDER COMPONENT YALL" );
            return (
                <ChildComponent {...this.props} />
            );
        }
    }

    return connect()( IsLoggedIn );
};