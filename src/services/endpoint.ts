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
    CREATE: `${PREFIX}/goals`,
    UPDATE: (id: number) => `${PREFIX}/goals/${id}`,
    DELETE: (id: number) => `${PREFIX}/goals/${id}`,
    GET_PROGRESS: (id: number) => `${PREFIX}/goals/progress/${id}`,
  },
  TODO: {
    GET_ALL: `${PREFIX}/todos`,
    GET_BY_ID: (id: number) => `${PREFIX}/todos/${id}`,
    CREATE: `${PREFIX}/todos`,
    UPDATE: (id: number) => `${PREFIX}/todos/${id}`,
    DELETE: (id: number) => `${PREFIX}/todos/${id}`,
  },
  DASHBOARD: {
    GET: `${PREFIX}/dashboard`,
  },
} as const;
