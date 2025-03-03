const PREFIX = `/api/v1`;

export const ENDPOINT = {
  AUTH: {
    LOGIN: `${PREFIX}/auth/login`,
    SIGNUP: `${PREFIX}/auth/signup`,
    TOKEN_VALIDATION: `${PREFIX}/auth/token`,
  },
  GOAL: {
    GET_ALL: `${PREFIX}/goals`,
    GET_BY_ID: (id: number) => `${PREFIX}/goals/${id}`,
    CREATE: `${PREFIX}/goals`,
    UPDATE: (id: number) => `${PREFIX}/goals/${id}`,
    DELETE: (id: number) => `${PREFIX}/goals/${id}`,
    GET_PROGRESS: `${PREFIX}/goals/progress`,
  },
  TODO: {
    GET_ALL: `${PREFIX}/todos`,
    GET_BY_ID: (id: number) => `${PREFIX}/todos/${id}`,
    CREATE: `${PREFIX}/todos`,
    UPDATE: (id: number) => `${PREFIX}/todos/${id}`,
    DELETE: (id: number) => `${PREFIX}/todos/${id}`,
  },
  DASHBOARD: {
    GET_TODOS: `${PREFIX}/dashboard/todos/recent`,
    GET_TODO_STREAK: `${PREFIX}/dashboard/todos/streak`,
  },
  NOTES: {
    GET_BY_ID: (noteId: number) => `${PREFIX}/notes/${noteId}`,
    UPDATE: (noteId: number) => `${PREFIX}/notes/${noteId}`,
    DELETE: (noteId: number) => `${PREFIX}/notes/${noteId}`,
    CREATE: `${PREFIX}/notes`,
    LIST: `${PREFIX}/notes`,
  },
} as const;
