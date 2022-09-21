import { Component } from '@angular/core';
import { ITree } from 'projects/checktree/src/public-api';
import { TREE } from './tree.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'checktreeimpl';
  tree: ITree<String> = TREE;
  selectedTree: ITree<String> = this.tree;
  constructor(){
  }
}
