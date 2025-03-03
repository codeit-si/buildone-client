export interface GoalResponse {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalListResponse {
  paginationInformation: {
    nextCursor: number;
    totalCount: number;
    hasNext: boolean;
  };
  goals: [
    {
      id: number;
      title: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
}
