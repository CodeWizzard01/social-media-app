import { createContext } from "react";

export type UserInput = {
  name: string;
  email: string;
  password: string;
  profilePhoto: File;
};

export type UserDetails = {
  name: string;
  email: string;
  profilePhoto: string;
};

export type UserContextType = {
  userDetails: UserDetails | null;
  setUserDetails: (userDetails: UserDetails | null) => void;
};

export const UserContext = createContext<UserContextType>({
  userDetails: null,
  setUserDetails: () => {},
});

export type Post = {
  id: string;
  userId: string;
  title: string;
  text: string;
  mediaUrl: string;
  presignedUrl: string;
  mediaType: "VIDEO" | "IMAGE";
  createdAt: string;
  tags: string[];
  likes: number;
  creator: {
    name: string;
    bio: string;
    profilePhoto: string;
  };
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ApiResponse = {
  content: Post[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
};


