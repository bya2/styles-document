import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";

export default function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const s__auth = useAppSelector((s) => s.auth);

  useEffect(() => {
    const cached_ids__str = window.localStorage.getItem("visited_users");
    
    if (cached_ids__str) {
      const _url: string = s__auth.ref.id ?? cached_ids__str.split(",")[0];
      navigate(_url, { replace: true });
    }
  }, [navigate, s__auth]);

  return (
    <div>
      <span>HOME</span>
    </div>
  );
}
