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
  },
  TODO: {
    GET_ALL: `${PREFIX}/todos`,
    GET_BY_ID: (id: number) => `${PREFIX}/todos/${id}`,
    UPDATE: (id: number) => `${PREFIX}/todos/${id}`,
    GET_PROGRESS: `${PREFIX}/todos/progress`,
  },
  DASHBOARD: {
    GET_TODOS: `${PREFIX}/dashboard/todos/recent`,
  },
} as const;
