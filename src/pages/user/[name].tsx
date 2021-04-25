import { getSession } from "next-auth/client";
import Image from "next/image";
import { GetServerSideProps, NextPage } from "next";
import { Layout } from "@components/Layout/Layout";
import { handleRequest } from "@lib/fetch";
import { User } from "types/User";
import styles from "@css/user.module.scss";
import { Paste } from "types/Paste";
import { PastesTable } from "@components/PastesTable/PastesTable";

interface Props {
  user: User | null;
  pastes: Paste[];
}

const PastePage: NextPage<Props> = ({ user, pastes }) => {
  if (!user) {
    return (
      <Layout showNav>
        <p>User was not found!</p>
      </Layout>
    );
  }

  return (
    <Layout showNav toast>
      <div className={styles.user_container}>
        <Image
          className={styles.image}
          draggable={false}
          src={user?.image}
          width="50px"
          height="50px"
          layout="fixed"
        />
        <a href={`https://github.com/${user?.login ?? user.name}`}>{user.name}</a>
      </div>

      <div className={styles.user_pastes}>
        <h1>Pastes</h1>

        <PastesTable pastes={pastes} />
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const res = await handleRequest(`/users/${query.name}`).catch(() => null);
  const session = await getSession({ req });

  return {
    props: {
      user: res?.data?.user ?? null,
      pastes: res?.data?.pastes ?? [],
      session: session ?? null,
    },
  };
};

export default PastePage;
