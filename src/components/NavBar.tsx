import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "fixed",
        height: "100px",
        width: `${window.screen.width - 100}px`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 50px 0px 50px",
        zIndex: "99",
      }}
    >
      <span
        onClick={() => {
          navigate("/");
        }}
        style={{
          fontSize: "40px",
          fontWeight: "bold",
          fontFamily: "cursive",
          cursor: "pointer",
        }}
      >
        Val
      </span>
      <div>
        <div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search"
            style={{
              outline: "none",
              borderRadius: "8px",
              border: "none",
              padding: "3% 2%",
              height: "30px",
              wordSpacing: "10px",
              backgroundColor: "#24242462",
              color: "white",
              fontWeight: "bold",
            }}
          />
        </div>
      </div>
    </div>
  );
}
