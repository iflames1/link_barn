// pages/posts.jsx
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";

const getPosts = async () => {
  await Promise.resolve(3000);
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({ queryKey: ["posts"], queryFn: getPosts });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

function Posts() {
  const { data } = useQuery({ queryKey: ["posts"], queryFn: getPosts });

  <div></div>;
}

export default Posts;
