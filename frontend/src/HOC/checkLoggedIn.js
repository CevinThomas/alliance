import React from "react";
import LOGGED_IN from "../constants/token";
import {connect} from "react-redux";

export default ChildComponent => {
    class IsLoggedIn extends React.Component {

        componentDidMount() {
            if ( localStorage.getItem( "TOKEN" ) ) {
                if ( this.props.isLoggedIn !== true ) {
                    this.props.dispatch( { type: LOGGED_IN, payload: true } );
                }
            } else {
                if ( this.props.isLoggedIn !== true ) {
                    this.props.history.push( "/login" );
                }
                this.props.dispatch( { type: LOGGED_IN, payload: false } );
                this.props.history.push( "/login" );
            }
        }

        componentWillUnmount() {
            if ( localStorage.getItem( "TOKEN" ) ) {
                if ( this.props.isLoggedIn !== true ) {
                    this.props.dispatch( { type: LOGGED_IN, payload: true } );
                }
            } else {
                this.props.dispatch( { type: LOGGED_IN, payload: false } );
                this.props.history.push( "/login" );
            }
        }

        render() {
            return (
                <ChildComponent {...this.props} />
            );
        }
    }

    const mapStateToProps = state => {
        return {
            isLoggedIn: state.userIsOnline
        };
    };

    return connect( mapStateToProps )( IsLoggedIn );
};