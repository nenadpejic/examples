import Navigation from "@/components/Navigation";
import { usePostsContext } from "@/contexts/PostsContext";

const DynamicPage = () => {
  const { posts } = usePostsContext();

  console.log("DynamicPage-posts", posts);

  return (
    <div>
      <Navigation />
      <h1>DynamicPage</h1>
    </div>
  );
};

export default DynamicPage;
