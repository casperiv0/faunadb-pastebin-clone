import * as React from "react";
import { toast } from "react-toastify";
import { Layout } from "@components/Layout/Layout";
import styles from "@css/pastes.module.scss";
import { handleRequest } from "@lib/fetch";
import { useRouter } from "next/router";
import languages from "@lib/languages";
import { Seo } from "@components/Seo";

const CreatePastePage = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [syntax, setSyntax] = React.useState("text");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await handleRequest("/pastes", "POST", {
        title,
        text: body,
        syntax: syntax || "text",
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
      <Seo title="Create a new paste - FaunaDB pastebin clone" />

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
          <label htmlFor="paste_title">Select syntax</label>

          <select
            onChange={(e) => setSyntax(e.target.value)}
            value={syntax}
            className={styles.form_input}
          >
            {languages.map((language: string) => {
              return (
                <option key={language} value={language}>
                  {language}
                </option>
              );
            })}
          </select>
        </div>

        <div className={styles.form_group}>
          <label htmlFor="paste_body">Paste Body</label>

          <textarea
            spellCheck="false"
            autoComplete="false"
            autoCorrect="false"
            rows={10}
            value={body}
            onChange={(e) => setBody(e.currentTarget.value)}
            id="paste_body"
            className={styles.form_input}
          />
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
