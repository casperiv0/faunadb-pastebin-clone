import Link from "next/link";
import formatDistance from "date-fns/formatDistance";
import format from "date-fns/format";
import { Paste } from "types/Paste";
import styles from "./table.module.scss";

interface Props {
  pastes: Paste[];
}

export const PastesTable = ({ pastes }: Props) => {
  return (
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
                <td title={format(+paste.created_at, "yyyy-MM-dd, HH:mm:ss")}>
                  {paste.created_at && formatDistance(Date.now(), +paste.created_at)} ago
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
  );
};
