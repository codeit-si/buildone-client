const getMockTodos = () => {
  return Array.from({ length: 5 }, (_, i) => ({
    id: i + 100,
    noteId: i + 1000,
    title: `자바스크립트 ${i + 1}강 끝내기`,
    goalInformation:
      i % 2 !== 0
        ? {
            id: i + 1,
            title: `자바스크립트 끝내기`,
          }
        : null,
    linkUrl: `https://naver.com`,
    fileUrl: `https://s3.apnortheast.com/`,
    isDone: i % 2 === 0,
    createdAt: `2025-02-${String(i).padStart(2, "0")}T04:58:42.712Z`,
    updatedAt: `2025-02-${String(i).padStart(2, "0")}T04:58:42.712Z`,
  }));
};

const mockData = () => ({
  progress: 49,
  todos: getMockTodos(),
});

export default mockData;
