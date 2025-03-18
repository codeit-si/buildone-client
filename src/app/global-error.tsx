"use client";

import { useEffect } from "react";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";

interface GlobalErrorProps {
  error: Error;
}

export default function GlobalError({ error }: GlobalErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return <Error statusCode={500} />;
}
