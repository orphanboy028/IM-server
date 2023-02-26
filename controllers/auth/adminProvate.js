import React, { useEffect } from "react";
import { isAuth } from "../../../frontend/actions/authActions";
import { useRouter } from "next/router";

export default function AdminPivate({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push("/login");
    } else if (isAuth().role !== "admin") {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
