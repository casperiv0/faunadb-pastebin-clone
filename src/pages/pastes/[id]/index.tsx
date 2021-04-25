import { getSession } from "next-auth/client";
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/prism-async-light";
import Theme from "react-syntax-highlighter/dist/cjs/styles/prism/tomorrow";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "@components/Layout/Layout";
import { Paste } from "types/Paste";
import { handleRequest } from "@lib/fetch";
import { PasteHeader } from "@components/PasteHeader/PasteHeader";
import styles from "@css/pastes.module.scss";
import { Seo } from "@components/Seo";

interface Props {
  paste: Paste | null;
}

const PastePage: NextPage<Props> = ({ paste }) => {
  if (!paste) {
    return (
      <Layout showNav>
        <Seo title="Paste was not found - FaunaDB pastebin clone" />
        <p>Paste was not found!</p>
      </Layout>
    );
  }

  return (
    <Layout showNav toast>
      <Seo title={`${paste.title} - FaunaDB pastebin clone`} description={paste.text} />
      <PasteHeader paste={paste} />

      <div className={styles.syntax_container}>
        <SyntaxHighlighter style={Theme} language={paste.syntax || "text"}>
          {String(paste.text).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const res = await handleRequest(`/pastes/${query.id}`).catch(() => null);
  const session = await getSession({ req });

  return {
    props: {
      paste: res?.data ?? null,
      session: session ?? null,
    },
  };
};

export default PastePage;
