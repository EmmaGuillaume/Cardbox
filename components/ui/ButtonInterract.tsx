"use client";
import { Eye, Heart, ListPlus } from "lucide-react";

type Props = {
  onClick: () => void;
  type: "like" | "watchlist" | "list";
  isAlreadyAdded: boolean;
};

const ButtonInterract = ({ onClick, type, isAlreadyAdded }: Props) => {
  if (type === "like") {
    return <button onClick={onClick}>
        <Heart className={` size-6 hover:text-red cursor-pointer text-primary  ${isAlreadyAdded ? "fill-red text-red" : ""} `} />
    </button>;
  }
   else if (type === "watchlist") {
    return <button onClick={onClick}>
       
        <Eye className={` size-6 hover:text-blue cursor-pointer  ${isAlreadyAdded ? " text-blue" : "text-primary "} `} />
    </button>;
  }
   else if (type === "list") {
    return <button onClick={onClick}>
        <ListPlus className={` size-6 hover:text-yellow cursor-pointer text-primary  ${isAlreadyAdded ? " text-yellow" : ""} `} />
    </button>;
  }

  return null;
};

export default ButtonInterract;
