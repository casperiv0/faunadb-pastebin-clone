import * as React from "react";
import { toast } from "react-toastify";
import { Layout } from "@components/Layout/Layout";
import styles from "@css/pastes.module.scss";
import { handleRequest } from "src/lib/fetch";
import { useRouter } from "next/router";

const CreatePastePage = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await handleRequest("/pastes", "POST", {
        title,
        text: body,
      });

      if (data.status === "success") {
        router.push(`/pastes/${data.paste.id}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message);
    }

    setLoading(false);
  }

  return (
    <Layout showNav toast>
      <form onSubmit={onSubmit}>
        <div className={styles.form_group}>
          <label htmlFor="paste_title">Paste Title</label>

          <input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            id="paste_title"
            className={styles.form_input}
          />
        </div>

        <div className={styles.form_group}>
          <label htmlFor="paste_body">Paste Body</label>

          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
            id="paste_body"
            className={styles.form_input}
          ></textarea>
        </div>

        <div style={{ float: "right" }}>
          <button disabled={loading} className={styles.form_btn}>
            {loading ? "Loading.." : "Create"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreatePastePage;
