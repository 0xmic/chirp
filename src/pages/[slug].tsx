import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

// Define the ProfileFeed component
const ProfileFeed = (props: { userId: string }) => {
  // Fetch posts by the user with the given ID using tRPC hook
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  // If the data is still loading, return a loading page
  if (isLoading) return <LoadingPage />;

  // Display a message if the user has not posted anything
  if (!data || data.length === 0) return <div>User has not posted</div>;

  // Render a list of posts
  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

// Define ProfilePage component
const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  // Fetch user data by username
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      {/* Set the page title to the user's username */}
      <Head>
        <title>{data.username}</title>
      </Head>
      <PageLayout>
        <div className="relative h-36 bg-slate-600">
          {/* Display the user's profile image */}
          <Image
            src={data.profileImageUrl}
            alt={`${data.username ?? ""}'s profile picture`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4  border-black bg-black"
          />
        </div>
        <div className="h-[64px]" />
        <div className="p-4 text-2xl font-bold">{`@${
          data.username ?? ""
        }`}</div>
        <div className="w-full border-b border-slate-400" />
        {/* Display the user's feed of posts */}
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

// Define getStaticProps to fetch user data at build time
export const getStaticProps: GetStaticProps = async (ctx) => {
  const ssg = generateSSGHelper();
  const slug = ctx.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

// Define the getStaticPaths function to set up Incremental Static Regeneration (ISR)
export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
