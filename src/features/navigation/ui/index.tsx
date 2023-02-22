import cn from "classnames";

import { ReactComponent as BagIcon } from "./bag-2.svg";
import { ReactComponent as Logo } from "./logo.svg";
import { ReactComponent as MenuIcon } from "./menu.svg";
import s from "./styles.module.scss";
import { ReactComponent as UserIcon } from "./user.svg";

export const Navigation = () => {
  return (
    <div className={s.root}>
      <div className={s.navigation_wrapper}>
        <div className={s.icon}>
          <Logo />
        </div>
        <nav className={s.nav}>
          <ul className={s.links}>
            <li className={s.link}>Products</li>
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
