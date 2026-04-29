import Image from "next/image";
import { title } from "process";

type Props = {
  onClick: () => void;
  title: string;
  author: string;
  avatar: string;
  items: { title: string; src: string }[];
};

const List = ({ onClick, title, author, avatar, items }: Props) => {
  return (
    <>
      <div className="bg-background-800 border-background-800 flex flex-col gap-3 p-3.5 rounded-lg">
        <div className="flex flex-row">
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-t-sm ${index !== 0 ? "-ml-4.75" : ""}`}
              style={{ zIndex: 100 - index * 2, width: 65, height: 90 }}
            >
              <Image
                className={`bg-background/${index * 25}`}
                style={{ width: "100%", height: "100%" }}
                key={index}
                alt={item.title}
                src={item.src}
                width={65}
                height={90}
              />
              <div
                className={`absolute inset-0 w-full h-full bg-background`}
                style={{ opacity: index * 0.2, zIndex: 100 - index * 2 + 1 }}
              ></div>
            </div>
          ))}
        </div>
        <span className="text-primary text-base font-semibold">{title}</span>
        <div className="flex flex-row items-center gap-2">
          <Image
            className="rounded-full"
            alt={`Avatar of ${author}`}
            src={avatar}
            width={24}
            height={24}
          />
          <span className="text-primary text-xs">
            Created by <span className="font-semibold">{author}</span>
          </span>
        </div>
      </div>
    </>
  );
};

export default List;
