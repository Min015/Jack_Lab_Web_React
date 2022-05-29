import { Component } from 'react';
import { connect } from "react-redux";
import GuestHeader from '../../../Components/Header/front_end/GuestHeader';
import CreateStudentCard from './CreateStudentCard';
import '../style/studentcard.scss';

import { GET_Student, } from '../../../Action/MemberAction';
const mapStateToProps = state => {
  return {
    Student: state.memberReducer.Student,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    GET_Student: () => dispatch(GET_Student()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  class Student extends Component {
    state = {
    }

    //生命週期
    componentDidMount = () => {
      this.props.GET_Student();
    }
    //func

    //渲染
    render() {
      const { Student } = this.props;
      console.log(Student);
      return (
        <div>
          <GuestHeader />
          <div className="content">
            <div id='stu_card'>
              <nav>
                <ul>
                  {Student === undefined ? "" : Student.time.map((item, index) => {
                    return (
                      <li key={`time${index}`}>{item}</li>
                    )
                  })}
                </ul>
              </nav>
              <div className='block'>
                {Student === undefined ? "" : Student.list.map((item, index) => {
                  return (
                    <div className='card'>
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
            {/* <CreateStudentCard student={students} /> */}
          </div>
        </div>
      )
    }
  }
)