import Link from "next/link";
import Image from "next/image";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";
import { Paste } from "types/Paste";
import styles from "./table.module.scss";

interface Props {
  pastes: Paste[];
  showCreatedBy?: boolean;
}

export const PastesTable = ({ pastes, showCreatedBy }: Props) => {
  return (
    <table className={styles.pastes_table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Created at</th>
          {showCreatedBy ? <th>Created by</th> : null}
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
                <td title={format(+paste.created_at, "yyyy-MM-dd, HH:mm:ss")}>
                  {paste.created_at && formatDistance(Date.now(), +paste.created_at)} ago
                </td>
                {showCreatedBy ? (
                  <td className={styles.created_by}>
                    <Image
                      src={paste.created_by.image}
                      alt={paste.created_by.name}
                      width="25px"
                      height="25px"
                      layout="fixed"
                    />
                    <Link href={`/user/${paste.created_by.name}`}>
                      <a>{paste.created_by.name}</a>
                    </Link>
                  </td>
                ) : null}
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
  );
};
