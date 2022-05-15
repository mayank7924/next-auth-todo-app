import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function AuthPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);
  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }
  return <AuthForm />;
}

export default AuthPage;
