import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { local_storage_keys__map } from "@/config/storage";
import { fn_get__ls_arr_item__arr } from "@/logic/reusable";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const s__auth__ref__id = useAppSelector((s) => s.auth.ref.id);

  useEffect(() => {
    let cached_r_nodes__arr = fn_get__ls_arr_item__arr<I_act_r_node>(local_storage_keys__map.visited_pages);
    console.log("dfsaf", cached_r_nodes__arr);

    if (s__auth__ref__id) {
      navigate(s__auth__ref__id);
    } else if (cached_r_nodes__arr) {
      const _url = cached_r_nodes__arr[0].id;
      navigate(_url, { replace: true });
    }
  }, [navigate, s__auth__ref__id]);

  return (
    <div>
      <span>HOME</span>
    </div>
  );
}
