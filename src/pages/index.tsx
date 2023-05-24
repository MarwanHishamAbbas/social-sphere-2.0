import { type NextPage } from "next";
import Head from "next/head";
import { Tabs } from "~/components/common/Tabs";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>SocialSphere 2.0 - The Ultimate Social Networking Web App</title>
        <meta
          name="description"
          content="SocialSphere is a user-friendly social media web application that enables individuals to network and connect with like-minded people worldwide. With a range of features, including personal profiles, messaging, groups, and events, SocialSphere provides an all-in-one platform for building relationships and promoting your brand or business. Join SocialSphere today and join the global community of social networkers."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tabs />
    </>
  );
};

export default Home;
