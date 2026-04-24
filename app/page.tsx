"use client";
import { useDrawer } from "@/components/context/DrawerContext";
import FilmCard from "@/components/features/FilmCard";
import FilmReview from "@/components/features/FilmReview";
import ScrollSection from "@/components/features/ScrollSection";

import { useRef, useState } from "react";
import List from "@/components/ui/List";



export default function Home() {


  const [username] = useState("Clémeninou");
  const { open } = useDrawer();

  const FakeDataBaseFilmList = [
    {
      title: "Le Seigneur des Anneaux",
      realisateur: "Peter Jackson",
      date: "2001",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 5,
      review:
        "Un chef-d'œuvre épique qui transporte les spectateurs dans un monde fantastique rempli d'aventures, de courage et d'amitié. Les performances des acteurs, les effets visuels et la bande sonore sont tout simplement incroyables. Un incontournable pour les fans de fantasy !",
    },
    {
      title: "The Dark Knight",
      realisateur: "Christopher Nolan",
      date: "2008",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 3,
      review:
        "Un film de super-héros sombre et intense qui redéfinit le genre. La performance de Heath Ledger en tant que Joker est tout simplement magistrale, apportant une profondeur et une complexité au personnage. L'intrigue captivante, les scènes d'action palpitantes et la réalisation impeccable font de ce film un classique moderne.",
    },
    {
      title: "Le Seigneur des Anneaux",
      realisateur: "Peter Jackson",
      date: "2001",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 2,
      review:
        "Un chef-d'œuvre épique qui transporte les spectateurs dans un monde fantastique rempli d'aventures, de courage et d'amitié. Les performances des acteurs, les effets visuels et la bande sonore sont tout simplement incroyables. Un incontournable pour les fans de fantasy !",
    },
    {
      title: "The Dark Knight",
      realisateur: "Christopher Nolan",
      date: "2008",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 4.8,
      review:
        "Un film de super-héros sombre et intense qui redéfinit le genre. La performance de Heath Ledger en tant que Joker est tout simplement magistrale, apportant une profondeur et une complexité au personnage. L'intrigue captivante, les scènes d'action palpitantes et la réalisation impeccable font de ce film un classique moderne.",
    },
    {
      title: "Le Seigneur des Anneaux",
      realisateur: "Peter Jackson",
      date: "2001",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 1,
      review:
        "Un chef-d'œuvre épique qui transporte les spectateurs dans un monde fantastique rempli d'aventures, de courage et d'amitié. Les performances des acteurs, les effets visuels et la bande sonore sont tout simplement incroyables. Un incontournable pour les fans de fantasy !",
    },
    {
      title: "The Dark Knight",
      realisateur: "Christopher Nolan",
      date: "2008",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 5,
      review:
        "Un film de super-héros sombre et intense qui redéfinit le genre. La performance de Heath Ledger en tant que Joker est tout simplement magistrale, apportant une profondeur et une complexité au personnage. L'intrigue captivante, les scènes d'action palpitantes et la réalisation impeccable font de ce film un classique moderne.",
    },
    {
      title: "The Dark Knight",
      realisateur: "Christopher Nolan",
      date: "2008",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 2,
      review:
        "Un film de super-héros sombre et intense qui redéfinit le genre. La performance de Heath Ledger en tant que Joker est tout simplement magistrale, apportant une profondeur et une complexité au personnage. L'intrigue captivante, les scènes d'action palpitantes et la réalisation impeccable font de ce film un classique moderne.",
    },
    {
      title: "The Dark Knight",
      realisateur: "Christopher Nolan",
      date: "2008",
      imageURL:
        "https://fastly.picsum.photos/id/894/200/300.jpg?hmac=yPKW_JRjZMfmYXpao6QL5LEt2cYJQdesD-zkL-U-UJs",
      rating: 4,
      review:
        "Un film de super-héros sombre et intense qui redéfinit le genre. La performance de Heath Ledger en tant que Joker est tout simplement magistrale, apportant une profondeur et une complexité au personnage. L'intrigue captivante, les scènes d'action palpitantes et la réalisation impeccable font de ce film un classique moderne.",
    },
  ];

    const listFilms = [
        {title: "Titanic", src: "/titanic.png"},
        {title: "Kill Bill", src: "/killbill.png"},
        {title: "Dirty Dancing", src: "/dirtydancing.png"},
        {title: "The Creator", src: "/thecreator.png"}
    ];

  return (
    <div
      className={`bg-background min-h-screen flex gap-8 flex-col transition duration-300 ${open ? "md:px-0 md:pl-12 md:pr-8" : "md:px-32"} px-4 text-primary font-krub mb-24 scrollbar-custom transition-[padding] duration-300 ease-in-out`}
    >
      <div className="mt-8">
        <h1 className="text-primary font-merryweather flex gap-2 text-2xl">
          Bon retour, <p className="text-yellow">{username}</p> !
        </h1>
        <p className="font-extralight text-sm">
          Voici l'activité pendant votre absence… <br />
          Cette page d'accueil s'adaptera à vos goûts!
        </p>
      </div>

      <ScrollSection
        title={
          <>
            Films <span className="text-red">you</span> may like
          </>
        }
      >
        {FakeDataBaseFilmList.map((film, index) => (
          <FilmCard
            key={index}
            {...film}
            isLiked={false}
            isInWatchlist={false}
            isSeen={false}
          />
        ))}
      </ScrollSection>

      <ScrollSection
        title={
          <>
            <span className="text-yellow">Friends</span> activities
          </>
        }
      >
        {FakeDataBaseFilmList.map((film, index) => (
          <FilmReview
            key={index}
            persona="friend"
            {...film}
            isLiked={false}
            isInWatchlist={false}
            isSeen={false}
          />
        ))}
      </ScrollSection>

      <ScrollSection
        title={
          <>
            Latest <span className="text-blue">releases</span>
          </>
        }
      >
        {FakeDataBaseFilmList.map((film, index) => (
          <FilmCard
            key={index}
            {...film}
            isLiked={false}
            isInWatchlist={false}
            isSeen={false}
          />
        ))}
      </ScrollSection>
    </div>
  );
}
