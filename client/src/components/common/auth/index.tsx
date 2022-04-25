import styles from "@styles-components/Auth.module.scss";
import Map from "@/components/reusable/wrapper/Map";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

export default function AuthMap() {
  const s__auth = useAppSelector(s => s.auth);
  const s__auth__ref_id = s__auth.ref.id;
  const dispatch = useAppDispatch();

  const m__is_logged_in = useMemo(() => {
    return false;
  }, []);

  return (
    <Map cssModule={styles} className={styles.auth}>
      {
        m__is_logged_in ? <div></div> : <div></div>
      }
      {
        
      }
    </Map>
  )
}