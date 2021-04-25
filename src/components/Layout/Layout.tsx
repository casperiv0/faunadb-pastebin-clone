import { Navbar } from "@components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./layout.module.scss";

interface Props {
  showNav?: boolean;
  toast?: boolean;
}

export const Layout: React.FC<Props> = ({ children, showNav, toast }) => {
  return (
    <>
      {showNav ? <Navbar /> : null}
      {toast ? <ToastContainer /> : null}
      <div className={styles.layout_container}>
        <div className={styles.layout_content}>{children}</div>
      </div>
    </>
  );
};
