import { Component } from 'react';
import GuestHeader from '../../../Components/Header/front_end/GuestHeader';
import CreateStudentCard from './CreateStudentCard';
import '../style/studentcard.scss';
export default class Student extends Component {
    state = {
        students: [
            {
                stu_name: "陳旻愉",
                stu_classes: "資訊應用菁英班四甲",
                stu_image: "",
            },
            {
                stu_name: "張博叡",
                stu_classes: "資訊應用菁英班四甲",
                stu_image: "",
            },
            {
                stu_name: "陳俊林",
                stu_classes: "資訊應用菁英班四甲",
                stu_image: "",
            },
            {
                stu_name: "林秉宏",
                stu_classes: "資訊應用菁英班四甲",
                stu_image: "",
            },
            {
                stu_name: "邱冠翔",
                stu_classes: "資訊應用菁英班四甲",
                stu_image: "",
            },
        ],
    }

    //生命週期

    //func

    //渲染
    render() {
        const { students } = this.state;
        return (
            <div>
                <GuestHeader />
                <div className="content">
                    <CreateStudentCard student={students} />
                </div>
            </div>
        )
    }
}