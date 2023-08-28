import {
  CircleOutlined as CircleIcon,
} from "@mui/icons-material";

import { Dots } from "@/assets";

const SideIcons = () => {
  return (
    <>
    <Dots
      style={{
        position: "absolute",
        top: "-55px",
        transform: "translate(-50%, 0)",
      }}
    />
    <CircleIcon
      style={{
        position: "absolute",
        top: "-8px",
        width: "12px",
        height: "12px",
        transform: "translate(-50%, 0)",
      }}
      color="primary"
    />
    <Dots
      style={{
        position: "absolute",
        bottom: "-54px",
        transform: "translate(-50%, 0)",
      }}
    />
  </>
  )
}

export default SideIcons