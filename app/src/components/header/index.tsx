import { Link, NavLink } from "react-router-dom";

import { MenuType } from "../../types";
import { StorageService } from "../../services";

import LogoImg from '../../assets/images/conecta.svg';

import './style.scss';

interface HeaderProps {
    menuItems: MenuType[]
}

const Header = (props: HeaderProps) => {
    const { menuItems } = props;

    return (
        <header className="header">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between">
                    <Link to='/'>
                        <img className="logoImg" src={LogoImg} alt="Logo da Conecta" />
                    </Link>
                    <nav>
                        <ul className="d-flex align-items-center">
                            {menuItems.map((item: MenuType) => (
                                <li className="mx-sm" key={item.id}>
                                    <NavLink className="text-link" to={item.navLink}>{item.title}</NavLink>
                                </li>
                            ))}
                            <li className="mx-sm">
                                <Link 
                                    to='/'
                                    onClick={() => StorageService.logout()} 
                                    className="text-link"
                                >
                                    Sair
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
  )
}

export default Header