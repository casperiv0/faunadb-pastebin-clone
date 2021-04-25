import Image from "next/image";
import format from "date-fns/format";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { Paste } from "types/Paste";
import styles from "./header.module.scss";
import { handleRequest } from "@lib/fetch";

interface Props {
  paste: Paste;
}

export const PasteHeader = ({ paste }: Props) => {
  const [session] = useSession();
  const router = useRouter();

  async function deletePaste() {
    try {
      const { data } = await handleRequest(`/pastes/${paste.id}`, "DELETE");

      if (data.status === "success") {
        router.push("/");
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }
  }

  if (!paste?.created_by) {
    return null;
  }

  return (
    <div className={styles.paste_header}>
      <div>
        <h1>{paste.title}</h1>
        {paste?.created_by?.name === session?.user?.name ? (
          <>
            <button onClick={deletePaste} className={styles.paste_btn}>
              Delete
            </button>
            <Link href={`/pastes/${paste.id}/edit`}>
              <a className={styles.paste_btn}>Edit</a>
            </Link>
          </>
        ) : null}
      </div>

      <Link href={`/user/${paste?.created_by?.name}`}>
        <a className={styles.paste_creator}>
          <div className={styles.paste_creator_text}>
            <p>{paste?.created_by?.name}</p>
            <span>{format(+paste.created_at, "yyyy-MM-dd")}</span>
          </div>

          <Image
            draggable={false}
            src={paste?.created_by?.image}
            width="50px"
            height="50px"
            layout="fixed"
          />
        </a>
      </Link>
    </div>
  );
};
