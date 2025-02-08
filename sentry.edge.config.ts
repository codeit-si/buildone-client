import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN_URL,
  tracesSampleRate: 1.0,
});
