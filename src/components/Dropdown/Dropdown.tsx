import { useSession } from "next-auth/client";
import * as React from "react";
import styles from "./dropdown.module.scss";
import Image from "next/image";

interface Props {}

export const Dropdown: React.FC<Props> = ({ children }) => {
  const [session] = useSession();

  return (
    <div className={styles.dropdown_container}>
      <div className={styles.dropdown_icon}>
        <Image src={session?.user?.image!} width="45px" height="45px" alt={session?.user?.name!} />
      </div>

      <div className={styles.dropdown_items}>
        <div>{children}</div>
      </div>
    </div>
  );
};
