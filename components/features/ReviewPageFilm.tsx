import { Star } from "lucide-react";
import StarsNotation from "../ui/StarsNotation";
import ButtonInterract from "../ui/ButtonInterract";

type Props = {
  title: string;
  date: Date;
  userAvatarUrl: string;
  rating: number;
  reviewContent: string;
  isLiked: boolean;
  likeReview: () => void;
};

const ReviewPageFilm = (review: Props) => {
  const TimeSincePosted = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes ago";
    }
    return "Just now";
  };
  return (
    <section className="bg-background-800 rounded-md p-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex flex-col gap-0">
          <p className="font-bold">{review.title}</p>
          <p className="text-sm text-muted-foreground">
            {TimeSincePosted(review.date)}
          </p>
        </div>
        <img
          className="size-10 rounded-full"
          src={review.userAvatarUrl}
          alt="User Avatar"
        />
      </div>

      <StarsNotation rating={review.rating} readonly big />

      <p>{review.reviewContent}</p>
      <div className="w-full flex justify-end">
        <ButtonInterract
          isAlreadyAdded={review.isLiked}
          onClick={review.likeReview}
          type="like"
        />
      </div>
    </section>
  );
};

export default ReviewPageFilm;
