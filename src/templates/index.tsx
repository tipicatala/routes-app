import { Outlet } from "react-router-dom";

import s from "./style.module.scss"

const Layout = () => {
  return (
    <div className={s.layout}>
      <Outlet />
    </div>
  );
};

export default Layout;
