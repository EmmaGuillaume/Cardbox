"use client";
import FilmCard from "@/components/features/FilmCard";
import FilmReview from "@/components/features/FilmReview";
import FriendCard from "@/components/features/FriendCard";
import ItemSearch from "@/components/features/ItemSearch";

export default function Home() {
  return (
    <>
      <div className="bg-background min-h-screen flex flex-col gap-8 items-center justify-center">
        <FriendCard
          name="John Doe"
          follower={100}
          following={50}
          seen={20}
          like={15}
          list={5}
          IsUserFollowed={true}
          unfollowUser={() => console.log("Unfollowed John Doe")}
        />z
        <div className="flex gap-8">
          <FilmReview
            persona="user"
            title="In the mood for love"
            realisateur="Wong Kar-wai"
            date="2000"
            imageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
            isLiked={true}
            isInWatchlist={true}
            isSeen={true}
            review="This is a great film!"
          ></FilmReview>

          <FilmReview
            persona="user"
            title="In the mood for love"
            realisateur="Wong Kar-wai"
            date="2000"
            imageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
            isLiked={true}
            isInWatchlist={false}
            isSeen={true}
          ></FilmReview>

          <FilmReview
            persona="friend"
            title="In the mood for love"
            realisateur="Wong Kar-wai"
            date="2000"
            imageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
            isLiked={true}
            isInWatchlist={false}
            isSeen={true}
            rating={2}
          ></FilmReview>

          <FilmReview
            persona="friend"
            title="In the mood for love"
            realisateur="Wong Kar-wai"
            date="2000"
            imageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
            isLiked={true}
            isInWatchlist={true}
            isSeen={false}
            rating={5}
            review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt risus aliquam, suscipit lectus id, convallis dolor. Nam auctor ante nec dolor feugiat, in scelerisque metus faucibus. Aliquam tincidunt, nulla ac posuere dignissim, augue lectus dapibus risus, eu vestibulum mi orci eget quam. Fusce auctor elementum enim, ac tempus ante varius at. In nec massa a tellus tempus auctor et et lorem. Quisque congue laoreet consectetur. Nullam rutrum leo eget lacus aliquam, sed tempor elit tincidunt."
          ></FilmReview>
        </div>

        <div className="flex flex-col w-1/2 bg-background-800/85 gap-2 p-2 rounded-md">
          <ItemSearch
            type="film"
            title="In the mood for love"
            filmDirector="Wong Kar-wai"
            filmImageURL="https://i.pinimg.com/736x/60/f5/26/60f526f8b6eef36c5dc933c706ae2b7c.jpg"
          />

          <ItemSearch
            type="human"
            humanRole="Réalisateur"
            humanName="Tony Leung"
            humanImageURL="https://media.gq.com/photos/612be4ed73b9651b2559a70e/master/pass/tony-leung-gq-october-2021-07.jpg"
          />

          <ItemSearch
            type="serie"
            title="Breaking Bad"
            filmDirector="Vince Gilligan"
            filmImageURL="https://m.media-amazon.com/images/M/MV5BMzU5ZGYzNmQtMTdhYy00OGRiLTg0NmQtYjVjNzliZTg1ZGE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
          />
        </div>
      </div>
    </>
  );
}
