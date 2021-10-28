import { GetServerSideProps, NextPage } from "next";
import React from "react";
import fetchData from "utils/fetchData";
import { TopStory } from "../types";

// Server Side Rendering
interface Props {
  topStories: TopStory[];
}

const HackerNewsSSR: NextPage<Props> = ({ topStories }) => {
  return (
    <div>
      <h1>Top Stories:</h1>
      <ul>
        {topStories.map((topStory) => (
          <li key={topStory.id}>{topStory.title}</li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const topStoryIds = await fetchData<string[]>("topstories");

  const topStories = await Promise.all(
    topStoryIds.slice(0, 30).map((id) => fetchData<TopStory>(`item/${id}`))
  );

  return {
    props: {
      topStories,
    },
  };
};

export default HackerNewsSSR;
