import { Paste } from "src/interfaces/Paste";
import styles from "./header.module.scss";
import Image from "next/image";
import format from "date-fns/format";

interface Props {
  paste: Paste;
}

export const PasteHeader = ({ paste }: Props) => {
  return (
    <div className={styles.paste_header}>
      <h1>{paste.title}</h1>

      <div className={styles.paste_creator}>
        <div>
          <p>{paste.created_by.name}</p>
          <span>{format(+paste.created_at, "yyyy-MM-dd")}</span>
        </div>

        <Image
          draggable={false}
          src={paste.created_by.image}
          width="50px"
          height="50px"
          layout="fixed"
        />
      </div>
    </div>
  );
};
