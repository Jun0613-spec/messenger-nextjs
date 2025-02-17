"use client";

import Image from "next/image";
import { User } from "@prisma/client";

import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
  user?: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const { members } = useActiveList();

  //const isActive = user && members.indexOf(user?.email!) !== -1;

  const isActive = members.indexOf(user?.email!) !== -1;

  return (
    <div className="relative">
      <div className=" relative inline-block rounded-full overflow-hidden h-10 w-10">
        <Image
          fill
          src={user?.image || "/images/placeholder.jpg"}
          alt="Avatar"
        />
      </div>
      {isActive ? (
        <div className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2" />
      ) : null}
    </div>
  );
};

export default Avatar;
