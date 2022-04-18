import { Component } from 'react';
import { Link,NavLink } from 'react-router-dom';
import './header1.scss';
import logo from './img/logo.png';
export default class GuestHeader extends Component {
    //生命週期

    //func
    render() {
        
        return (
            <header className="header">
                <Link to='/Index' className="logo">
                    <img src={logo} alt="" />
                </Link>
                <nav className="nav">
                    <ul className="header_ul">
                        <Link to='/SetInfo'><li>去前台</li></Link>
                        <NavLink to='/Game' className={(navData) => navData.isActive ? "nowP" : "" } ><li>實驗室介紹</li></NavLink>
                        <NavLink to='/Project'className={(navData) => navData.isActive ? "nowP" : "" } ><li>歷屆成員</li></NavLink>
                        <NavLink to='/Meeting'className={(navData) => navData.isActive ? "nowP" : "" } ><li>進入研究室</li></NavLink>
                    </ul>
                </nav>
            </header>
        )
    }
}