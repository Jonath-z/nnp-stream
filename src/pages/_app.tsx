import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { HydrationBoundary, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, ReactNode, useState } from "react";
import { NextPage } from "next";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../../next-i18next.config";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

/**
 * Represents a Next.js page with a custom layout.
 * @typedef {NextPage & { getLayout?: (page: ReactElement) => ReactNode }} NextPageWithLayout
 */

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

/**
 * Props for the App component with a custom layout.
 * @typedef {AppProps & { Component: NextPageWithLayout }} AppPropsWithLayout
 */

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps, ...rest }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout || ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {getLayout(
          <>
            <Component {...pageProps} />
            <ProgressBar height="2px" color="#DD8300" options={{ showSpinner: false }} shallowRouting />
          </>,
        )}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
