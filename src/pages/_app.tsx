import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

// Define the main App component
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    // Wrap the application with ClerkProvider for authentication
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Chirp</title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Add the Toaster component to display toast messages */}
      <Toaster position="bottom-center" />
      {/* Render the current page component with its props */}
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

// Export the MyApp component, enhanced with TRPC functionality
export default api.withTRPC(MyApp);
