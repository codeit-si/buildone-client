import { GoalInformation, Todo } from "@/types/todo";

const getRandomDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

const getRandomTitle = (): string => {
  const titles = [
    "Complete the project report",
    "Review the latest code changes",
    "Update documentation",
    "Fix UI bug in dashboard",
    "Implement authentication feature",
    "Optimize database queries",
    "Write unit tests",
    "Deploy new version to production",
    "Refactor old codebase",
    "Research new tech stack",
  ];
  return titles[Math.floor(Math.random() * titles.length)];
};

const getRandomGoal = (): GoalInformation => {
  const goals = [
    { id: 1, title: "Improve team productivity" },
    { id: 2, title: "Enhance security measures" },
    { id: 3, title: "Refactor core modules" },
    { id: 4, title: "Reduce server downtime" },
    { id: 5, title: "Increase test coverage" },
  ];
  return goals[Math.floor(Math.random() * goals.length)];
};

export const generateRandomTodos = (count: number): Todo[] => {
  return Array.from({ length: count }, (_, i) => {
    const createdAt = getRandomDate(100);
    const updatedAt = getRandomDate(10);

    return {
      id: i + 1,
      noteId: Math.random() > 0.5 ? Math.floor(Math.random() * 100) + 1 : null,
      title: getRandomTitle(),
      goalInformation: Math.random() > 0.5 ? getRandomGoal() : null,
      linkUrl: Math.random() > 0.5 ? "https://example.com/resource" : null,
      fileUrl: Math.random() > 0.5 ? "https://example.com/file.pdf" : null,
      isDone: Math.random() > 0.5,
      createdAt,
      updatedAt,
    };
  });
};

export const todos: Todo[] = generateRandomTodos(120);
