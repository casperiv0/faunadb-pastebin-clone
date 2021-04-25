import { GetServerSideProps, NextPage } from "next";
import formatDistance from "date-fns/formatDistance";
import { Layout } from "@components/Layout/Layout";
import { Paste } from "src/interfaces/Paste";
import { handleRequest } from "src/lib/fetch";
import styles from "@css/home.module.scss";
import Link from "next/link";

interface Props {
  pastes: Paste[];
}

const HomePage: NextPage<Props> = ({ pastes }) => {
  // TODO: filter via syntax

  return (
    <Layout showNav>
      {pastes.length <= 0 ? (
        <p>There are no pastes yet</p>
      ) : (
        <table className={styles.pastes_table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created at</th>
              <th>Syntax</th>
            </tr>
          </thead>
          <tbody>
            {pastes
              .sort((a, b) => +b.created_at - +a.created_at)
              .map((paste) => {
                return (
                  <tr key={paste.id}>
                    <td>
                      <Link href={`/pastes/${paste.id}`}>
                        <a>{paste.title}</a>
                      </Link>
                    </td>
                    <td>
                      {paste.created_at && formatDistance(Date.now(), +paste.created_at, {})} ago
                    </td>
                    <td>
                      <Link href={`/?syntax=${paste.syntax ?? "text"}`}>
                        <a>{paste.syntax ?? "text"}</a>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await handleRequest("/pastes");

  return {
    props: {
      pastes: data,
    },
  };
};

export default HomePage;
