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
                <tr>
                    {table_header.map(item => (<th>{item}</th>))}
                </tr>
                {table_content.map(
                    (item, index) => {
                        style = this.handleSetStyle(index);
                        return (
                            <tr className={style}>
                                <td>{item.p_type}</td>
                                <td>{item.p_class}</td>
                                <td><Link to='/Project/ProjectInfo'>{item.p_title}</Link></td>
                                <td>{item.p_creater}</td>
                                <td>{item.p_createTime}</td>
                                <td>{item.p_tag}</td>
                            </tr>
                        )
                    })
                }
            </table >
        )
    }
}