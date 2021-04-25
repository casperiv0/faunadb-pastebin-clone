import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/client";
import * as React from "react";
import { useRouter } from "next/router";
import { Layout } from "@components/Layout/Layout";
import { Paste } from "types/Paste";
import { handleRequest } from "@lib/fetch";
import { PastesTable } from "@components/PastesTable/PastesTable";

interface Props {
  pastes: Paste[];
}

const HomePage: NextPage<Props> = ({ pastes }) => {
  const router = useRouter();

  const filtered = React.useMemo(() => {
    if (router.query.syntax) {
      return pastes.filter((p) => p.syntax === router.query.syntax);
    } else {
      return pastes;
    }
  }, [router, pastes]);

  return (
    <Layout showNav>
      {pastes.length <= 0 ? (
        <p>There are no pastes yet</p>
      ) : filtered.length <= 0 ? (
        <p>There are no pastes found with that syntax</p>
      ) : (
        <PastesTable pastes={filtered} />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { data } = await handleRequest("/pastes");
  const session = await getSession({ req });

  return {
    props: {
      pastes: data,
      session: session ?? null,
    },
  };
};

export default HomePage;
