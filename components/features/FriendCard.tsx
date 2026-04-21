import { EyeIcon, Heart, List } from "lucide-react";

type Props = {
  name: string;
  follower: number;
  following: number;
  seen: number;
  like: number;
  list: number;
  IsUserFollowed: boolean;
  unfollowUser?: () => void;
};

const FriendCard = (props: Props) => {
  return <section className="flex justify-between py-2 px-4 bg-background-800 rounded-md text-primary items-center">
    <div className="flex gap-4">
        <img src="https://picsum.photos/200" alt="" className="size-12 rounded-full" />
        <div className="">
            <h3 className="text-lg font-semibold font-merryweather">{props.name}</h3>
            <div className="flex gap-2">
                <span className="text-sm">{props.follower} followers</span>
                <span className="text-sm">{props.following} following</span>
            </div>
        </div>
    </div>
    <div className="flex gap-8">
        <div className="flex gap-4">
            <div className="flex gap-1">
                <Heart className="inline-block mr-1 size-6" />
                <p>{props.like} likes </p>
            </div>
            <div className="flex gap-1">
                <EyeIcon className="inline-block mr-1 size-6" />
                <p>{props.seen} likes </p>
            </div>
            <div className="flex gap-1">
                <List className="inline-block mr-1 size-6" />
                <p>{props.list} likes </p>
            </div>
        </div>
        <button onClick={()=>{props.unfollowUser && props.unfollowUser()}} className={`px-4 py-1 rounded-md bg-background-700 cursor-pointer text-white ${props.IsUserFollowed ? " hover:text-red-500" : "text-white"}`}>
            {props.IsUserFollowed ? "Unfollow" : "Follow"}
        </button>
    </div>
  </section>;
};

export default FriendCard;
