const PREFIX = `/api/v1`;

export const ENDPOINT = {
  AUTH: {
    LOGIN: `${PREFIX}/auth/login`,
    SIGNUP: `${PREFIX}/auth/signup`,
    TOKEN_VALIDATION: `${PREFIX}/auth/token`,
  },
  // 아래 endpoint들은 예시입니다!
  GOAL: {
    GET_ALL: `${PREFIX}/goals`,
    GET_BY_ID: (id: number) => `${PREFIX}/goals/${id}`,
    CREATE: "/api/goals",
    UPDATE: (id: number) => `${PREFIX}/goals/${id}`,
    DELETE: (id: number) => `${PREFIX}/goals/${id}`,
  },
  TODO: {
    GET_ALL: `${PREFIX}/todos`,
    GET_BY_ID: (id: number) => `/api/todos/${id}`,
  },
  DASHBOARD: {
    GET: `${PREFIX}/dashboard`,
  },
} as const;
