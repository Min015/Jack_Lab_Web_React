import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import GuestLayout from '../../../Components/Layout/front/guest/GuestLayout';
import '../style/studentcard.scss';

import { GET_Student, } from '../../../Action/MemberAction';
const mapStateToProps = state => {
  return {
    Student: state.memberReducer.Student,
    StudentTime: state.memberReducer.StudentTime,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GET_Student: (payload, callback) => dispatch(GET_Student(payload, callback)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class Student extends Component {
    state = {
      time: []
    }

    //生命週期
    componentDidMount = () => {
      const { match } = this.props;
      const { params } = match;
      const nowtime = params.time;
      const callback = (res) => {
        this.setState({
          time: res.time
        })
        this.props.GET_Student(nowtime);
      }
      this.props.GET_Student(nowtime, callback);
    }
    //func

    //渲染
    render() {
      const { Student } = this.props;
      const { time } = this.state;
      return (
        <GuestLayout>
          <div id='stu_card'>
            <nav>
              <ul>
                <NavLink
                  to={`/student/ `}
                  activeClassName="this"
                  onClick={() => this.props.GET_Student(` `)}
                >
                  <li>全員</li>
                </NavLink>
                {Student === undefined ? "" : time.map((item, index) => {
                  return (
                    <NavLink
                      key={`time${index}`}
                      to={`/student/${item}`}
                      activeClassName="this"
                      onClick={() => this.props.GET_Student(`${item}`)}
                    >
                      <li>{item}</li>
                    </NavLink>
                  )
                })}
              </ul>
            </nav>
            <div className='block'>
              {Student === undefined ? "" : Student.list.map((item, index) => {
                return (
                  <div key={`student${index}`} className='card'>
                    <div className='card_in'>
                      <div className='stu_i'>
                        <div className='img'>
                          <img src={Student === undefined ? "" : `http://localhost/${item.Image}`} alt="學生頭像" />
                        </div>
                      </div>
                      <div className='stu_n'>{item.Name}</div>
                      <div className='stu_t'>{item.Academic_name}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </GuestLayout>
      )
    }
  }
)