import * as React from "react";
import { Layout } from "@components/Layout/Layout";
import styles from "@css/auth.module.scss";
import { getSession, signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Seo } from "@components/Seo";

const AuthPage = () => {
  const [session] = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    await signIn("github", {
      redirect: false,
      callbackUrl: "/",
    });
  }

  return (
    <Layout showNav toast>
      <Seo title="Authenticate - FaunaDB pastebin clone" />
      <form onSubmit={onSubmit}>
        <div className={styles.form_group}>
          <button className={styles.form_btn}>Login via GitHub</button>
        </div>
      </form>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session: session ?? null,
    },
  };
};

export default AuthPage;
