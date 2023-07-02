import Navigation from "@/components/Navigation";
import { usePostsContext } from "@/contexts/PostsContext";
import { InferGetStaticPropsType } from "next";
import React from "react";

const Posts = ({}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { posts } = usePostsContext();

  console.log("PostsPage-posts", posts);

  return (
    <div>
      <Navigation />
      <h1>Posts</h1>
    </div>
  );
};

export default Posts;

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const initialPosts = await res.json();

  return {
    props: {
      initialPosts,
    },
  };
};
