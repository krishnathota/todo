export interface Todo {
  _id?: string; // Optional field for MongoDB ObjectId
  task: string;
  completed: boolean;
}
