import {
  Container,
  Paper,
} from "@mui/material";
import { Outlet } from "react-router-dom";

import s from "./style.module.scss";

const Layout = () => {
  return (
    <div className={s.layout}>
      <Container
        component={Paper}
        style={{
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
