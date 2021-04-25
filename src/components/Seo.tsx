import * as React from "react";
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  keywords?: string[];
  url?: string;
}

export const Seo: React.FC<Props> = (props) => {
  const defaults: Props = {
    title: "FaunaDB pastebin clone",
    description: "A Pastebin clone using next.js, faunaDB, next-auth and next-api-decorators.",
    url: process.env.NEXT_PUBLIC_ORIGIN_URL,
  };

  const tags = {
    ...defaults,
    ...props,
  };

  return (
    <Head>
      <title>{tags.title}</title>
      <meta name="twitter:title" content={tags.title} />
      <meta property="og:site_name" content={tags.title} />
      <meta property="og:title" content={tags.title} />

      <meta name="description" content={tags.description} />
      <meta property="og:description" content={tags.description} />
      <meta name="twitter:description" content={tags.description} />

      <link rel="canonical" href={tags.url} />
      <meta property="og:url" content={tags.url} />
    </Head>
  );
};
