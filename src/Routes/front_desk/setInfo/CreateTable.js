import { Component } from 'react';
import '../main_category/category.scss';
import { Link } from 'react-router-dom';
export default class CreateTable extends Component {
    render() {
        const { table_header, table_content } = this.props;
        return (
            <table>
                <thead>
                    <tr>
                        {table_header.map((item,index) => (<th key={`th${index}`}>{item}</th>))}
                    </tr>
                </thead>
                <tbody>
                    {table_content === undefined ? [] : table_content.map(
                        (item, index) => {
                            return (
                                <tr key={`tr${index}`} className={index % 2 === 0 ? 'tr_odd' : 'tr_even'}>
                                    <td>{item.Type_name}</td>
                                    <td>
                                        <Link to={`/project/projectinfo/${item.Id}/1/ `}>
                                            {item.Name}
                                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16.9694 14.9283C16.5025 14.4811 16.0481 14.0211 15.6067 13.5488C15.2359 13.172 15.0126 12.8979 15.0126 12.8979L12.2214 11.5653C13.3389 10.298 13.9556 8.66671 13.9559 6.97723C13.9559 3.13078 10.8258 0 6.97796 0C3.13012 0 0 3.13078 0 6.97723C0 10.8237 3.13012 13.9545 6.97796 13.9545C8.73541 13.9545 10.3374 13.2966 11.5665 12.2211L12.8993 15.012C12.8993 15.012 13.1734 15.2353 13.5502 15.6061C13.936 15.9679 14.4434 16.4573 14.9299 16.9686L16.2836 18.3561L16.8857 19L19 16.8859L18.356 16.2839C17.9782 15.9131 17.4738 15.4207 16.9694 14.9283ZM6.97796 11.961C4.22964 11.961 1.9937 9.72526 1.9937 6.97723C1.9937 4.2292 4.22964 1.99349 6.97796 1.99349C9.72629 1.99349 11.9622 4.2292 11.9622 6.97723C11.9622 9.72526 9.72629 11.961 6.97796 11.961Z" fill="#022840" />
                                            </svg>
                                        </Link>
                                    </td>
                                    <td>{item.CreateTime.substr(0, 10)}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table >
        )
    }
}