import { Layout } from "@components/Layout/Layout";
import { GetServerSideProps, NextPage } from "next";
import { Paste } from "src/interfaces/Paste";
import { handleRequest } from "src/lib/fetch";
import { PasteHeader } from "@components/PasteHeader/PasteHeader";

interface Props {
  paste: Paste | null;
}

const PastePage: NextPage<Props> = ({ paste }) => {
  if (!paste) {
    return (
      <Layout showNav>
        <p>Paste was not found!</p>
      </Layout>
    );
  }

  return (
    <Layout showNav toast>
      <PasteHeader paste={paste} />

      <div>{paste.text}</div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const res = await handleRequest(`/pastes/${query.id}`).catch(() => null);

  return {
    props: {
      paste: res?.data ?? null,
    },
  };
};

export default PastePage;
