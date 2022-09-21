export interface ITree<T> {
  value:T;
  children:Array<ITree<T>>; 
  id?:string;
  nodeStatus?:NodeStatus;  
}

export enum NodeStatus {
  SELECTED,
  UNSELECTED,
  INTERMEDIATE
}

export interface ITree<T> {
  
}