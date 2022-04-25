import { Outlet } from "react-router-dom";
import type { I_div_bs_props } from "@/models/props";

export default function Layout({ children, cssModule, className }: I_div_bs_props) {
  return (
    <div className={`${cssModule?.wrapper} ${cssModule?.layout} ${className}`}>
      <nav>
        <>{children}</>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
