import { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GuestLayout from '../Layout/front/guest/GuestLayout';
import './Verify.scss';

import { GET_Emailvalidate } from '../../Action/MemberAction';

const mapStateToProps = state => {
  const { memberReducer } = state;
  return (
    memberReducer
  )
}

const mapDispatchToProps = dispatch => {
  return {
    GET_Emailvalidate: (account, token, callback) => dispatch(GET_Emailvalidate(account, token, callback)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class Verify extends Component {
    state = {
      validatemessage: ""
    }
    componentDidMount = () => {
      const { history } = this.props;
      const temp = history.location.pathname.split("/emailvalidate/")
      const params = temp[1].split("/");
      const account = params[0];
      const token = params[1];
      const jumurl = () => {
        this.props.history.push(`/index`);
      }
      const callback = (res) => {
        this.setState({
          validatemessage: res,
        })
        setTimeout(jumurl, 3000);
      }
      this.props.GET_Emailvalidate(account, token, callback)
    }
    render() {
      const { validatemessage } = this.state;
      return (
        <GuestLayout>
          <div id="Verify">
            <div className="VerifyCenter">
              <div className="message">{validatemessage}</div>
              <Link to='/index'>回主頁</Link>
            </div>
          </div>
        </GuestLayout>
      );
    }
  }
)