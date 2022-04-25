import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const s__auth__ref__id = useAppSelector((s) => s.auth.ref.id);

  useEffect(() => {
    const cached_ids__str: string | null = window.localStorage.getItem("visited_users");

    if (cached_ids__str) {
      const _url: string = s__auth__ref__id ?? cached_ids__str.split(",")[0];
      navigate(_url, { replace: true });
    }
  }, [navigate, s__auth__ref__id]);

  return (
    <div>
      <span>HOME</span>
    </div>
  );
}
