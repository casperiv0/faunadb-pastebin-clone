import { Layout } from "@components/Layout/Layout";
import { GetServerSideProps, NextPage } from "next";
import { Paste } from "src/interfaces/Paste";
import { handleRequest } from "src/lib/fetch";
import { PasteHeader } from "@components/PasteHeader/PasteHeader";

interface Props {
  paste: Paste | null;
}

const PastePage: NextPage<Props> = ({ paste }) => {
  console.log(paste);

  return (
    <Layout showNav toast>
      <PasteHeader paste={paste} />

      <div>{paste.text}</div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { data } = await handleRequest(`/pastes/${query.id}`);

  return {
    props: {
      paste: data ?? null,
    },
  };
};

export default PastePage;
