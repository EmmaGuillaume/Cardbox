import { useState } from "react";
import ItemSearch from "./ItemSearch";
import Link from "next/link";
import {
  TMDBCastMember,
  TMDBCountryProviders,
  TMDBCreditsResponse,
} from "@/types/tmdb.types";

type Props = {
  providers?: TMDBCountryProviders;
  credit: TMDBCreditsResponse;
};

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

const TabDetailsFilm = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState<"cast" | "watch" | "crew">(
    "cast",
  );

  return (
    <section className="w-full flex flex-col">
      <section className="flex gap-2">
        <button
          className={`${selectedTab == "cast" ? "bg-background-800" : "bg-background-900"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setSelectedTab("cast")}
        >
          Crédits
        </button>
        <button
          className={`${selectedTab == "watch" ? "bg-background-800" : "bg-background-900"} cursor-pointer px-4 py-1 rounded-t-sm`}
          onClick={() => setSelectedTab("watch")}
        >
          Where to watch
        </button>
      </section>
      <section className="bg-background-800 rounded-r-md rounded-b-md py-4">
        <div className="max-h-96 overflow-y-scroll scrollbar-custom ">
          {selectedTab === "cast" && (
            <div className="p-4 flex gap-2 flex-col">
              {props.credit &&
                props.credit.cast.map((member) => (
                  <div key={member.id}>
                    <ItemSearch
                      type="human"
                      humanName={member.name}
                      humanImageURL={
                        member.profile_path
                          ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                          : "/placeholder.png"
                      }
                      humanRole={member.known_for_department}
                    />
                  </div>
                ))}
            </div>
          )}
          {selectedTab === "watch" && (
            <div className="flex lex-row flex-wrap gap-4 p-4">
              {(props.providers?.rent?.length ?? 0) +
                (props.providers?.buy?.length ?? 0) ===
              0 ? (
                <p>Oops, nous ne savons pas où regarder ce film/série...</p>
              ) : (
                <>
                  {props.providers?.rent?.map((provider) => (
                    <div key={provider.provider_id}>
                      <ExternalLinkWatch
                        logo_path={provider.logo_path}
                        provider_name={provider.provider_name}
                        provider_id={provider.provider_id}
                        display_priority={provider.display_priority}
                      />
                    </div>
                  ))}
                  {props.providers?.buy?.map((provider) => (
                    <div key={provider.provider_id}>
                      <ExternalLinkWatch
                        logo_path={provider.logo_path}
                        provider_name={provider.provider_name}
                        provider_id={provider.provider_id}
                        display_priority={provider.display_priority}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </section>
  );
};

export default TabDetailsFilm;
