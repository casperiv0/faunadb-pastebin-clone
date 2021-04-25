import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import styles from "./navbar.module.scss";

export const Navbar = () => {
  const [session] = useSession();

  return (
    <nav className={styles.nav_container}>
      <div className={styles.nav_content}>
        <h1 className={styles.nav_icon}>
          <Link href="/">
            <a>Pastebin clone</a>
          </Link>
        </h1>

        <div className={styles.nav_links}>
          {session ? (
            <>
              <Link href="/pastes/create">
                <a className={styles.nav_link}>Create paste</a>
              </Link>

              <button onClick={() => signOut({ redirect: false })} className={styles.nav_link}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth">
                <a className={styles.nav_link}>Authenticate</a>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
