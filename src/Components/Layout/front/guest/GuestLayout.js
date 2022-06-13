import React, { Component } from 'react';
import { connect } from "react-redux";
import GuestHeader from '../../../Header/front_end/GuestHeader';
import './guestlayout.scss';

import { POST_Login, GET_IsLogin } from "../../../../Action/MemberAction";
const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
	return {
		POST_Login: (payload) => dispatch(POST_Login(payload)),
		GET_IsLogin: (callback) => dispatch(GET_IsLogin(callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class GuestLayout extends Component {
		handleLogin = (payload) => {
			this.props.POST_Login(payload);
		}
		handleIsLogin = (callback) => {
			this.props.GET_IsLogin(callback);
		}
		render() {
			const { children } = this.props;
			return (
				<div id="guest">
					<GuestHeader
						Login={this.handleLogin}
						IsLogin={this.handleIsLogin}
					/>
					<div className="content">
						{children}
					</div>
					<footer className='absolutely_center'>© 2022 JackLab</footer>
				</div>
			)
		}
	}
)