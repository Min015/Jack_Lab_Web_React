import { Component } from 'react';
import '../main_category/category.scss';
import { Link } from 'react-router-dom';
import { GET_MeetingInfo } from '../../../Service/meeting/Meeting.js';
export default class CreateTable extends Component {
    //func
    handleSetStyle = (i) => {
        if (i % 2 === 0) {
            return "tr_odd"
        }
        else if (i % 2 === 1) {
            return "tr_even";
        }
    }
    render() {
        const { table_header, table_content } = this.props;
        console.log(table_content);
        let style;
        return (
            <table>
                <thead>
                    <tr>
                        {table_header.map(item => (<th>{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {table_content.map(
                        (item, index) => {
                            style = this.handleSetStyle(index);
                            return (
                                <tr key={index} className={style}>
                                    <td>
                                        <Link
                                            to='/Meeting/MeetingInfo'
                                            onClick={GET_MeetingInfo(item.Id)}
                                        >
                                            {item.Title}
                                        </Link>
                                    </td>
                                    <td>{item.Time}</td>
                                    <td>{item.Place}</td>
                                    <td>{item.uploader.Name}</td>
                                    <td>{item.tag}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    }
}