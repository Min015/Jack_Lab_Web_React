import { Component } from 'react';
import '../main_category/category.scss';
import { Link } from 'react-router-dom';
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
                                <tr className={style}>
                                    <td><Link to='/Meeting/MeetingInfo'>{item.m_title}</Link></td>
                                    <td>{item.m_date}</td>
                                    <td>{item.m_place}</td>
                                    <td>{item.m_uploader}</td>
                                    <td>{item.m_tag}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    }
}