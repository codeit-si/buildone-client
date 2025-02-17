const PREFIX = "/api/v1";

export const ENDPOINT = {
  AUTH: {
    LOGIN: `${PREFIX}/login`,
    SIGNUP: `${PREFIX}/signup`,
  },
  // 아래 endpoint들은 예시입니다!
  GOAL: {
    GET_ALL: "/api/goals",
    GET_BY_ID: (id: number) => `${PREFIX}/goals/${id}`,
    CREATE: "/api/goals",
    UPDATE: (id: number) => `${PREFIX}/goals/${id}`,
    DELETE: (id: number) => `${PREFIX}/goals/${id}`,
  },
  TODO: {
    GET_ALL: "/api/todos",
    GET_BY_ID: (id: number) => `${PREFIX}/todos/${id}`,
  },
} as const;
