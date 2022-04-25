import styles from "@/styles/components/AppLoader.module.scss";
import Outer from "@/components/reusable/wrapper/Outer";
import Inner from "@/components/reusable/wrapper/Inner";
import Loader from "@/components/reusable/complete/Loader";
import Content from "@/components/reusable/box/Content";

const MSG__LOADING = "Loading...";

export default function AppLoader(): JSX.Element {
  return (
    <Outer cssModule={styles}>
      <Inner cssModule={styles}>
        <Loader cssModule={styles} />
        <Content cssModule={styles} prop__content={MSG__LOADING} />
      </Inner>
    </Outer>
  );
}
