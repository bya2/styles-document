import styles from "@styles-components/App.module.scss";

import Header from "@components/layouts/Header";
import Main from "@components/layouts/Main";
import Footer from "@components/layouts/Footer";
import Modal from "@components/reusable/Modal";

export default function App(): JSX.Element {
  return (
    <div className={styles.App}>
      {/* <Header /> */}
      <Main />
      {/* <Footer /> */}
      {/* {
        (
          <Modal prop__is_active__bool={true} prop__fn_set__close_modal={() => {}}>
            <span>OK</span>
          </Modal>
        ) as JSX.Element
      } */}
    </div>
  );
}
