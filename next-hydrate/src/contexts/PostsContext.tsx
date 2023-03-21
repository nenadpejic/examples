import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PostsContextProps =
  | {
      posts: any[];
      setPosts: Dispatch<SetStateAction<any[]>>;
    }
  | Record<string, never>;

export const PostsContext = createContext<PostsContextProps>({});

type PostsContextProviderProps = {
  children: ReactNode;
  initialValue: {
    initialPosts: any[];
  };
};

export const PostsContextProvider = ({
  children,
  initialValue: { initialPosts },
}: PostsContextProviderProps) => {
  const [posts, setPosts] = useState<any[]>(initialPosts);

  const value = {
    posts,
    setPosts,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PostsContextProps =
  | {
      posts: any[];
      setPosts: Dispatch<SetStateAction<any[]>>;
    }
  | Record<string, never>;

export const PostsContext = createContext<PostsContextProps>({});

type PostsContextProviderProps = {
  children: ReactNode;
  initialValue: {
    initialPosts: any[];
  };
};

export const PostsContextProvider = ({
  children,
  initialValue: { initialPosts },
}: PostsContextProviderProps) => {
  const [posts, setPosts] = useState<any[]>(initialPosts);

  const value = {
    posts,
    setPosts,
  };

  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);
