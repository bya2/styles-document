import styles from "@styles-components/Document.module.scss";
import Map from "@/components/reusable/wrapper/Map";
import Region from "@/components/reusable/area/Region";
import TabBar from "./TabBar";
import ThumbBar from "./ThumbBar";
import DirBar from "./DirBar";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fn_wrap__fb_GET } from "@/logic/api";
import { fn_GET__doc__elems_of_doc } from "@/api/document";
import { useAppDispatch } from "@/store/hooks";
import { set_s__doc_elems__arr } from "@/store/common/document";
import { I_doc__elem } from "@/models/document";

const ERR_MSG__NO_URL_PARAM__DOC_ID = "no url parameter document id.";

export default function DocMap(): JSX.Element {
  const { docId: param__doc_id } = useParams();
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!param__doc_id) {
      throw new Error(ERR_MSG__NO_URL_PARAM__DOC_ID);
    }

    fn_wrap__fb_GET<{ doc_uid: string }, I_doc__elem[]>(fn_GET__doc__elems_of_doc, { doc_uid: param__doc_id }).then(
      (elems__arr) => {
        dispatch(set_s__doc_elems__arr(elems__arr || []));
      }
    );
  }, [param__doc_id, dispatch]);

  return (
    <Map cssModule={styles}>
      <Region cssModule={styles} className={styles.top}>
        <TabBar />
      </Region>

      <Region cssModule={styles} className={styles.middle}>
        <DirBar />
      </Region>

      <Region cssModule={styles} className={styles.bottom}>
        <ThumbBar />
      </Region>
    </Map>
  );
}
