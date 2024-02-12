import { FaInstagram } from "react-icons/fa";
import { RxDiscordLogo } from "react-icons/rx";
import { FiFacebook } from "react-icons/fi";
export default function Footer() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0px 50px 0px 50px",
        height: "100px",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "150px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ cursor: "pointer" }}>Contact Us</span>
        <span style={{ cursor: "pointer" }}>DMCA</span>
      </div>
      <div
        style={{
          width: "100px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "20px", cursor: "pointer" }}>
          <FiFacebook />
        </span>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>
          <FaInstagram />
        </span>
        <span style={{ fontSize: "20px", cursor: "pointer" }}>
          <RxDiscordLogo />
        </span>
      </div>
    </div>
  );
}
