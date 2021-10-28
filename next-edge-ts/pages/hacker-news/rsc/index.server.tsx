import Page from "components/Page.client";
import React, { Suspense, useState } from "react";
import fetchData from "utils/fetchData";
import { TopStory } from "../types";

// React Server Components
const HackerNewsRSC = () => {
  const [topStoryIds, setTopStoryIds] = useState<string[]>([]);

  fetchData<string[]>("topstories").then((data) => {
    setTopStoryIds(data);
  });

  return (
    <Page>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Top Stories:</h1>
        <ul>
          {Promise.all(
            topStoryIds.slice(0, 30).map(async (topStoryId) => {
              const topStory = await fetchData<TopStory>(`item/${topStoryId}`);
              return (
                <Suspense key={topStory.id} fallback={<div>Loading...</div>}>
                  <li>{topStory.title}</li>
                </Suspense>
              );
            })
          )}
        </ul>
      </Suspense>
    </Page>
  );
};

export default HackerNewsRSC;
