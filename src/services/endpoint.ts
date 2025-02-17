export const ENDPOINT = {
  AUTH: {
    LOGIN: "/api/login",
    SIGNUP: "/api/signup",
  },
  GOAL: {
    GET_ALL: "/api/goals",
    GET_BY_ID: (id: number) => `/api/goals/${id}`,
    CREATE: "/api/goals",
    UPDATE: (id: number) => `/api/goals/${id}`,
    DELETE: (id: number) => `/api/goals/${id}`,
  },
  TODO: {
    GET_ALL: "/api/todos",
    GET_BY_ID: (id: number) => `/api/todos/${id}`,
  },
} as const;
