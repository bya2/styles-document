import styles from "@/styles/components/Search.module.scss";
import { useCallback, useRef, useState } from "react";
import Map from "@/components/reusable/wrapper/Map";
import Region from "@/components/reusable/area/Region";
import Title from "@/components/reusable/box/Title";
import Box from "@/components/reusable/box/Box";
import Img from "@/components/reusable/box/Image";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UList from "@/components/reusable/bar/UList";
import Item from "@/components/reusable/group/Item";
import { fn_GET__search__nodes } from "@/api/explorer";
import { fn_wrap__fb_GET } from "@/logic/api";
import { I_search_nodes, I_search_users } from "@/models/search";
import Container from "@/components/reusable/area/Container";
import Site from "@/components/reusable/area/Site";
import Content from "@/components/reusable/box/Content";
import { fn_GET__search__users } from "@/api/auth";

export default function SearchMap() {
  const navigate = useNavigate();
  const ref__input = useRef<HTMLInputElement>(null);
  const [s__input_value__str, set_s__input_value__str] = useState<string>("");
  const [s__discovered_users__arr, set_s__discovered_users__arr] = useState<I_search_users[]>([]);
  const [s__discovered_nodes__arr, set_s__discovered_nodes__arr] = useState<I_search_nodes[]>([]);

  const cb_handle__change__input = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    set_s__input_value__str(e.currentTarget.value);
  }, []);

  useEffect(() => {
    navigate(`?s=${s__input_value__str}`);
  }, [navigate, s__input_value__str]);

  useEffect(() => {
    fn_wrap__fb_GET<string, I_search_users[]>(fn_GET__search__users, s__input_value__str).then((search_users__arr) => {
      if (search_users__arr) {
        set_s__discovered_users__arr(search_users__arr);
      }
    });

    fn_wrap__fb_GET<string, I_search_nodes[]>(fn_GET__search__nodes, s__input_value__str).then((search_nodes__arr) => {
      if (search_nodes__arr) {
        set_s__discovered_nodes__arr(search_nodes__arr);
      }
    });
  }, [s__input_value__str]);

  return (
    <Map cssModule={styles} className={styles.search}>
      <Region cssModule={styles} className={styles.top}>
        <Title cssModule={styles} prop__title={"Search"} />
      </Region>

      <Container cssModule={styles} className={`${styles.region} ${styles.mid}`}>
        <Box cssModule={styles} className={styles.input}>
          <input type="text" value={s__input_value__str} ref={ref__input} onChange={(e) => cb_handle__change__input(e)} />
          <Img cssModule={styles} className={styles.inp_key} prop__element={<div>/</div>} />
        </Box>
      </Container>

      <Region cssModule={styles} className={styles.bot}>
        {s__discovered_users__arr.length === 0 ? (
          <></>
        ) : (
          <Site cssModule={styles} className={styles.page}>
            <Title cssModule={styles} prop__title={"Pages"} />
            <UList cssModule={styles}>
              {s__discovered_users__arr.map((node__obj) => {
                const { id } = node__obj;
                return (
                  <Item key={id} cssModule={styles}>
                    <Link to={`/${id}`}>
                      <Content cssModule={styles} className={styles.page} prop__content={id} />
                    </Link>
                  </Item>
                );
              })}
            </UList>
          </Site>
        )}
        {s__discovered_nodes__arr.length === 0 ? (
          <></>
        ) : (
          <Site cssModule={styles} className={styles.doc}>
            <Title cssModule={styles} prop__title={"Documents"} />
            <UList cssModule={styles}>
              {s__discovered_nodes__arr.map((node__obj) => {
                const { uid, name, r_node_uid, p_node_name } = node__obj;
                return (
                  <Item key={uid} cssModule={styles}>
                    <Link to={`/${r_node_uid}?doc=${uid}`}>
                      <Content cssModule={styles} className={styles.name} prop__content={name} />
                      <Content cssModule={styles} className={styles.root} prop__content={r_node_uid} />
                      <Content cssModule={styles} className={styles.path} prop__content={p_node_name} />
                    </Link>
                  </Item>
                );
              })}
            </UList>
          </Site>
        )}
      </Region>
    </Map>
  );
}
