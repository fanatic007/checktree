import { Injectable } from '@angular/core';
import { ITree, NodeStatus } from './checktree.model';

@Injectable({
  providedIn: 'root'
})
export class ChecktreeService {

  constructor() { }

  
  getSelectedNodes(tree:ITree<String>): ITree<String> {
    tree.children = tree.children.map(childNode => {
        if(childNode.nodeStatus!==NodeStatus.UNSELECTED)
          this.getSelectedNodes(childNode);
        return childNode;
      }
    );
    return tree;
  }

  addCheckTreeMeta(node:ITree<String>, parentAddress:string , breadth:number): ITree<String> {
    node['nodeStatus']= NodeStatus.UNSELECTED;
    node['id'] = `${parentAddress}${breadth}`;
    let i = 0;
    node.children.forEach(childNode => {
      childNode=this.addCheckTreeMeta(childNode,node.id!,i++);
    });
    return node; 
  };
}
