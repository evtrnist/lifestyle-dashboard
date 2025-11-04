export interface TodosWidgetInput {
  size: string;
  data: {
    todos: {
        additionCount: number;
        completedCount: number;
        plannedCount: number;
    }
  }
}