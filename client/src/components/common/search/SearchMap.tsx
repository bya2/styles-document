import styles from "@/styles/components/Search.module.scss";
import { useCallback, useRef, useState } from "react";
import Map from "@/components/reusable/wrapper/Map";
import Region from "@/components/reusable/area/Region";
import Title from "@/components/reusable/box/Title";
import Box from "@/components/reusable/box/Box";
import Img from "@/components/reusable/box/Image";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";

export default function SearchMap() {
  const navigate = useNavigate();
  const ref__input = useRef<HTMLInputElement>(null);
  const [s__input_value__str, set_s__input_value__str] = useState<string>("");

  const cb_handle__change__input = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    set_s__input_value__str(e.currentTarget.value);
  }, []);

  useEffect(() => {
    navigate(`?s=${s__input_value__str}`);
  }, [navigate, s__input_value__str]);

  return (
    <Map cssModule={styles} className={styles.search}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Search"} />
      </Region>

      <Region cssModule={styles} className={styles.mid}>
        <Box cssModule={styles} className={styles.input}>
          <input type="text" value={s__input_value__str} ref={ref__input} onChange={(e) => cb_handle__change__input(e)} />
          <Img cssModule={styles} className={styles.inp_key} prop__element={<div>/</div>} />
        </Box>
      </Region>

      <Region cssModule={styles} className={styles.bot}>
        <UList cssModule={styles}>
          {[].map((item__obj) => {
            return <Item cssModule={styles}></Item>;
          })}
        </UList>
      </Region>
    </Map>
  );
}
