import { IAnimeResult, META } from "@consumet/extensions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const anilist = new META.Anilist();

  const [allData, setAllData] = useState<IAnimeResult[][]>([]);
  const [bannerAnime, setbannerAnime] = useState<IAnimeResult>();
  var allowed = true;
  const navigate = useNavigate();

  const fetchData = async () => {
    allowed = false;
    const _t = anilist.fetchTrendingAnime();
    const _p = anilist.fetchPopularAnime();
    return [(await _t).results, (await _p).results];
  };

  const goto = (i: any) => {
    navigate(`/info/${i}`);
  };

  const card = (item: IAnimeResult) => {
    return (
      <div
        onClick={() => {
          goto(item.id);
        }}
        key={item.id}
        style={{
          cursor: "pointer",
          margin: "5px",
          width: "200px",
          borderRadius: "8px",
        }}
      >
        <img
          src={item.image}
          alt=""
          style={{
            width: "200px",
            height: "300px",
            borderRadius: "10px 10px 0px 0px",
          }}
        />
        <div
          style={{
            textAlign: "center",
            width: "200px",
          }}
        >
          {typeof item.title == "string" ? item.title : item.title.romaji}{" "}
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (allowed) {
      fetchData().then((value) => {
        var _temp = value[0][Math.ceil(Math.random() * 10) % 7];
        _temp =
          _temp.cover == _temp.cover && _temp.id != "21"
            ? value[0][Math.ceil(Math.random() * 10) % 7]
            : _temp;
        setbannerAnime(value[0][Math.ceil(Math.random() * 10) % 7]);
        setAllData(value);
      });
    }
  }, []);

  const listItems = (data: IAnimeResult[]) => {
    return (
      <>
        <ul
          style={{
            scrollBehavior: "auto",
            display: "flex",
            padding: "0",
          }}
        >
          {data.map((item) => {
            return card(item);
          })}
        </ul>
      </>
    );
  };

  return (
    allData.length != 0 && (
      <>
        <div style={{ position: "relative" }}>
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
              backgroundImage: `url(${bannerAnime!.cover})`,
              backgroundPositionX: "0%",
              backgroundPositionY: "50%",
              backgroundRepeat: "no-repeat",
              backgroundClip: "border-box",
              objectFit: "cover",
            }}
          ></div>
          <div
            onClick={() => navigate(`/info/${bannerAnime!.id}`)}
            style={{
              borderRadius: "10px",
              position: "absolute",
              cursor: "pointer",
              top: "40%",
              left: "10%",
              width: "500px",
              height: "220px",
              padding: "15px",
              overflow: "hidden",
              zIndex: "20",
              textAlign: "center",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                color: bannerAnime!.color,
              }}
            >
              {typeof bannerAnime!.title == "string"
                ? bannerAnime!.title
                : bannerAnime!.title.romaji}
            </span>
            <br></br>
            <br></br>
            {bannerAnime!.description
              .replaceAll("<br>", "")
              .replaceAll("<i>", "")
              .replaceAll("</i>", "")}
          </div>
        </div>
        <div style={{ padding: "0px 50px 0px 50px" }}>
          <div>
            {" "}
            <span
              style={{
                color: "crimson",
                backgroundColor: "crimson",
              }}
            >
              ..
            </span>{" "}
            <span style={{ fontWeight: "bold" }}>Trending</span>
          </div>
          <div style={{ scrollBehavior: "smooth", overflowX: "auto" }}>
            {listItems(allData[0])}
          </div>
          <div>
            {" "}
            <span
              style={{
                color: "crimson",
                backgroundColor: "crimson",
              }}
            >
              ..
            </span>{" "}
            <span style={{ fontWeight: "bold" }}>Popular</span>
          </div>
          <div style={{ scrollBehavior: "smooth", overflowX: "auto" }}>
            {listItems(allData[1])}
          </div>
        </div>
      </>
    )
  );
}

export default Home;
