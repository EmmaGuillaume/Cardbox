"use client";
import { ClockPlus, Eye, Heart, ListPlus } from "lucide-react";

type Props = {
  onClick: () => void;
  type: "like" | "watchlist" | "list" | "watchlater";
  isAlreadyAdded: boolean;
  small?: boolean;
};

const ButtonInterract = ({ onClick, type, isAlreadyAdded, small }: Props) => {
  if (type === "like") {
    return (
      <button onClick={onClick}>
        <Heart
          className={`${small ? "size-5" : "size-6"} hover:text-red cursor-pointer text-primary  ${isAlreadyAdded ? "fill-red text-red" : ""} `}
        />
      </button>
    );
  } else if (type === "watchlist") {
    return (
      <button onClick={onClick}>
        <Eye
          className={`${small ? "size-5" : "size-6"} hover:text-blue cursor-pointer  ${isAlreadyAdded ? " text-blue" : "text-primary "} `}
        />
      </button>
    );
  } else if (type === "list") {
    return (
      <button onClick={onClick}>
        <ListPlus
          className={`${small ? "size-5" : "size-6"} hover:text-yellow cursor-pointer text-primary  ${isAlreadyAdded ? " text-yellow" : ""} `}
        />
      </button>
    );
  } else if (type === "watchlater") {
    return (
      <button onClick={onClick}>
        <ClockPlus
          className={`${small ? "size-4" : "size-5"} hover:text-blue cursor-pointer  ${isAlreadyAdded ? " text-blue" : "text-primary "} `}
        />
      </button>
    );
  }

  return null;
};

export default ButtonInterract;
