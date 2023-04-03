import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

// Define SinglePostPage component
const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  // Fetch post data by ID using tRPC hook
  const { data } = api.posts.getById.useQuery({
    id,
  });

  // If no data is found, return a 404 message
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

// Define the getStaticProps function to fetch data at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  // Prefetch the post data by ID using the SSG helper
  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

// Define the getStaticPaths function to set up Incremental Static Regeneration (ISR)
export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
