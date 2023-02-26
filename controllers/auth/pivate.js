import React, { useEffect } from "react";
import { isAuth } from "../../../frontend/actions/authActions";
import { useRouter } from "next/router";

export default function Pivate({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuth()) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
