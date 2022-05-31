import { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../../Header/front_end/Header';
import './memberlayout.scss';

import { PUT_UpdateMyPassword } from '../../../../Action/MemberAction';
const mapStateToProps = state => {
	const { memberReducer } = state;
	return (
		memberReducer
	)
}
const mapDispatchToProps = dispatch => {
	return {
		PUT_UpdateMyPassword: (payload, callback) => dispatch(PUT_UpdateMyPassword(payload, callback)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(
	class MemberLayout extends Component {
		handleUpdatePassword = (payload, callback) => {
			this.props.PUT_UpdateMyPassword(payload, callback)
		}
		render() {
			const { children } = this.props;
			return (
				<div>
					<Header
						UpdatePassword={this.handleUpdatePassword}
					/>
					<div className="content">
						<div className="contentin">
							{children}
						</div>
					</div>
				</div>
			)
		}
	}
)