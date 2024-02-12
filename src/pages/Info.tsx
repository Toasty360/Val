import { IAnimeInfo, META } from "@consumet/extensions";
import { useState } from "react";
import { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const [info, setInfo] = useState<IAnimeInfo>();
  const anilist = new META.Anilist();
  var lock = false;
  const navigate = useNavigate();

  useEffect(() => {
    if (!lock) {
      console.log("entered", window.location.href.split("/").pop());
      lock = true;
      anilist
        .fetchAnimeInfo(window.location.href.split("/").pop()!)
        .then((value) => setInfo(value));
      console.log(info);
    }
  }, []);

  return (
    typeof info != "undefined" && (
      <>
        <div
          style={{
            position: "relative",
            height: "600px",
          }}
        >
          <div
            className="mask"
            style={{
              height: "401px",
              width: "100%",
              backgroundImage:
                "linear-gradient(to bottom, #487FEC05 , #242424)",
              zIndex: "9",
              position: "absolute",
            }}
          ></div>
          <div
            style={{
              height: "400px",
              backgroundImage: `url(${info!.cover})`,
              backgroundPosition: "center",
            }}
          ></div>
          <div className="div-infoImage">
            <img
              src={info.image}
              width={250}
              height={350}
              style={{ borderRadius: "8px" }}
            />
          </div>

          <div style={{ position: "absolute", top: "10%", padding: "2% 5%" }}>
            <div
              style={{
                fontSize: "30px",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
                border: "1px solid white",
                borderRadius: "50%",
                padding:"5% 10%",
                cursor:"pointer"
              }}
              onClick={() => {
                alert("clicked");
                navigate("/");
              }}
            >
              <RiCloseFill color={"white"} />
            </div>
          </div>
        </div>
        <div style={{ height: "60px" }}></div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            overflow: "hidden",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{ fontWeight: "bold", color: info.color, fontSize: "20px" }}
          >
            {typeof info.title == "string" ? info.title : info.title.romaji}
          </span>
        </div>
        <div style={{ padding: "10px 20px", textAlign: "justify" }}>
          <div
            style={{
              padding: "5% 0%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              className="infobtn"
              style={{
                backgroundColor: "#1EABBEA9",
              }}
            >
              {info.hasDub ? "Dub" : "Sub"}
            </div>
            <div
              className="infobtn"
              style={{
                backgroundColor: "#2BBE1EC8",
              }}
            >
              {info.hasSub ? "Sub" : "Dub"}
            </div>
            <div
              className="infobtn"
              style={{
                backgroundColor: "#291EBE",
              }}
            >
              {info.countryOfOrigin}
            </div>
            <div
              className="infobtn"
              style={{
                backgroundColor: "#BE761E",
              }}
            >
              EP {info.episodes?.length}/{info.totalEpisodes}
            </div>
          </div>
          <div>{info.description}</div>
          <div>
            {info.episodes!.map((eps) => (
              <div
                style={{
                  backgroundImage: `url(${eps.image})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  height: "100px",
                  width: "100%",
                  marginTop: "2%",
                  borderRadius: "8px",
                  opacity: 0.6,
                }}
              ></div>
            ))}
          </div>
        </div>
      </>
    )
  );
}
