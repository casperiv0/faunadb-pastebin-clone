import Link from "next/link";
import { useSession, signOut } from "next-auth/client";
import styles from "./navbar.module.scss";
import { Dropdown } from "@components/Dropdown/Dropdown";
import dropdownStyles from "../Dropdown/dropdown.module.scss";

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
              <Dropdown>
                <Link href="/pastes/create">
                  <a className={dropdownStyles.dropdown_item}>Create paste</a>
                </Link>
                <Link href={`/user/${session.user?.name}`}>
                  <a className={dropdownStyles.dropdown_item}>Account</a>
                </Link>

                <button
                  onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
                  className={dropdownStyles.dropdown_item + " danger"}
                >
                  Logout
                </button>
              </Dropdown>
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
