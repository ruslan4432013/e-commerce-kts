import cn from "classnames";
import { Link } from "react-router-dom";

import BagIcon from "./bag-2.svg";
import Logo from "./logo.svg";
import MenuIcon from "./menu.svg";
import s from "./styles.module.scss";
import UserIcon from "./user.svg";

export const Navigation = () => {
  return (
    <div className={s.root}>
      <div className={s.navigation_wrapper}>
        <Link to={"/"}>
          <div className={s.icon}>
            <Logo />
          </div>
        </Link>
        <nav className={s.nav}>
          <ul className={s.links}>
            <li className={cn(s.link, s.active)}>Products</li>
            <li className={s.link}>Categories</li>
            <li className={s.link}>About Us</li>
          </ul>
        </nav>
        <div className={s.menu_icon_wrapper}>
          <MenuIcon className={cn(s.icon)} />
        </div>
        <div className={s.user_bag_icon_wrapper}>
          <BagIcon />
          <UserIcon />
        </div>
      </div>
    </div>
  );
};
