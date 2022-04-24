import { Component } from 'react';
import '../style/studentcard.scss';
import teacher from '../../admin/style/img/teacher.jpg';
export default class CreateStudentCard extends Component {

    render() {
        const { student } = this.props;
        return (
            <div id='stu_card'>
                {student.map((item) => {
                    return (
                        <div className='card'>
                            <div className='card_in'>
                                <div className='stu_i'>
                                    {/* <img src={teacher} /> */}
                                </div>
                                <div className='stu_n'>{item.stu_name}</div>
                                <div className='stu_c'>{item.stu_classes}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}