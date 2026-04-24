import { useState } from "react";
import ItemSearch from "./ItemSearch";
import Link from "next/link";

interface Provider {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
}
// "https://www.themoviedb.org/movie/550-fight-club/watch?locale=AE",

interface CountryWatchProviders {
  link: string;
  flatrate?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
}

type WatchProviders = Record<string, CountryWatchProviders>;

const ExternalLinkWatch = (props: Provider) => {
  return (
    <div className="flex gap-2 items-center flex-col">
      <img src={props.logo_path} alt="" sizes="" className="size-16" />
      <p>{props.provider_name}</p>
    </div>
  );
};

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

const TabDetailsFilm = () => {
  const [selectedTab, setSelectedTab] = useState<"cast" | "watch" | "crew">(
    "cast",
  );

  const cast: CastMember[] = [
    {
      adult: false,
      gender: 2,
      id: 1,
      known_for_department: "Acting",
      name: "John Doe",
      original_name: "John Doe",
      popularity: 10.0,
      profile_path: "/path/to/profile.jpg",
      cast_id: 1,
      character: "Main Character",
      credit_id: "abc123",
      order: 0,
    },
    {
      adult: false,
      gender: 2,
      id: 2,
      known_for_department: "Acting",
      name: "John Doe",
      original_name: "John Doe",
      popularity: 10.0,
      profile_path: "/path/to/profile.jpg",
      cast_id: 1,
      character: "Main Character",
      credit_id: "abc123",
      order: 0,
    },
    {
      adult: false,
      gender: 2,
      id: 3,
      known_for_department: "Acting",
      name: "John Doe",
      original_name: "John Doe",
      popularity: 10.0,
      profile_path: "/path/to/profile.jpg",
      cast_id: 1,
      character: "Main Character",
      credit_id: "abc123",
      order: 0,
    },
  ];
  return (
    <section className="w-full flex flex-col">
      <section className="flex gap-2">
        <button
          className={`${selectedTab == "cast" ? "bg-background-800" : "bg-background-900"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setSelectedTab("cast")}
        >
          Cast
        </button>
        <button
          className={`${selectedTab == "watch" ? "bg-background-800" : "bg-background-900"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setSelectedTab("watch")}
        >
          Where to watch
        </button>
        <button
          className={`${selectedTab == "crew" ? "bg-background-800" : "bg-background-900"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setSelectedTab("crew")}
        >
          Crew
        </button>
      </section>
      <section className="bg-background-800 rounded-r-md rounded-b-md ">
        {selectedTab === "cast" && (
          <div className="p-4 flex gap-2 flex-col">
            {cast.map((member) => (
              <div key={member.id}>
                <ItemSearch
                  type="human"
                  humanName={member.name}
                  humanImageURL="https://i.pravatar.cc/800"
                  humanRole={member.known_for_department}
                />
              </div>
            ))}
          </div>
        )}
        {selectedTab === "watch" && (
          <div className="flex lex-row flex-wrap gap-4 p-4">
            {cast.map((member) => (
              <div key={member.id}>
                <ExternalLinkWatch
                  logo_path="https://imgs.search.brave.com/u1Uqc8jkRSSmpNDivzHqVvO5f5q5XbyBCzw3_wOuW_I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ1LzIvbmV0Zmxp/eC1sb2dvLXBuZ19z/ZWVrbG9nby00NTE5/ODEucG5n"
                  provider_name="Netflix"
                  provider_id={1}
                  display_priority={1}
                />
              </div>
            ))}
          </div>
        )}

        {selectedTab === "crew" && (
          <div className="flex lex-row flex-wrap gap-4 p-4">
            {cast.map((member) => (
              <div key={member.id}>
                <ExternalLinkWatch
                  logo_path="https://imgs.search.brave.com/u1Uqc8jkRSSmpNDivzHqVvO5f5q5XbyBCzw3_wOuW_I/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ1LzIvbmV0Zmxp/eC1sb2dvLXBuZ19z/ZWVrbG9nby00NTE5/ODEucG5n"
                  provider_name="Netflix"
                  provider_id={1}
                  display_priority={1}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default TabDetailsFilm;
