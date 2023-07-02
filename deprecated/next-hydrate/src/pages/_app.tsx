import { PostsContextProvider } from "@/contexts/PostsContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

type ExtendedAppProps = {
  initialPosts: any[];
} & AppProps;

export default function App({
  Component,
  pageProps,
}: // initialPosts,
ExtendedAppProps) {
  // !NOTE: We can get the initialPosts returned with getStaticProps in /posts here in _app from pageProps. That way we can fetch server-side only on /posts page, but set the state app wide.
  const { initialPosts } = pageProps;

  return (
    <PostsContextProvider initialValue={{ initialPosts }}>
      <Component {...pageProps} />
    </PostsContextProvider>
  );
}

// App.getInitialProps = async () => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   const initialPosts = await res.json();

//   return {
//     initialPosts,
//   };
// };
