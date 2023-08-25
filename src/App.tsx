import { useRoutes } from "react-router-dom";
import routes from "@/routes/index";
import useScrollToTop from "./hooks/useScrollToTop";

function App() {
  const element = useRoutes(routes);
  useScrollToTop();

  return <>{element}</>;
}

export default App;
