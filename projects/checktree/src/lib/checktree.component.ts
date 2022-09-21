import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnChanges,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, map, merge, Observable, Subscription } from 'rxjs';
import { ITree, NodeStatus } from './checktree.model';
import { ChecktreeService } from './checktree.service';

@Component({
  selector: 'checktree',
  templateUrl: './checktree.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckTree),
      multi: true,
    },
  ],
  styles: [],
})
export class CheckTree implements ControlValueAccessor, OnChanges {
  constructor(
    private checkTreeService: ChecktreeService,
    private renderer: Renderer2
  ) {}

  @ViewChildren('checkLeaf') checkboxes!: QueryList<ElementRef>;
  @Input() tree!: ITree<String>;
  changeHandler!: Function;
  touchHandler!: Function;
  checkChanges$!: Subscription;
  SELECTED = NodeStatus.SELECTED;
  INTERMEDIATE = NodeStatus.INTERMEDIATE;
  UNSELECTED = NodeStatus.UNSELECTED;
  treeRoot!: ITree<String>;

  private _val!: ITree<String> | {}; // this is the updated value that the class accesses
  set val(val: ITree<String>) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this._val = val;
    this.changeHandler(val);
    this.touchHandler(val);
  }

  ngOnChanges(changes: any): void {
    if (changes['tree']) {
      this.tree = this.checkTreeService.addCheckTreeMeta( JSON.parse( JSON.stringify(this.tree)),'',0 );
      this.treeRoot = {value:'',children:[this.tree]}
      // this._val = changes['tree'];
    }
  }

  selectionChanged(event: Event, node: any) {
    let checked = (<HTMLInputElement>event.target).checked;
    this.setChildren(node, checked);
    let immediateParentAddress = node.id!.substring(
      0,
      node.id!.length - 1
    ); //console.log(parentAddress);
    if (node.id !== '0') {
      this.setParents(immediateParentAddress.split('').map((p:number)=> +p), checked);
    }
    let selectedLeaves = this.checkTreeService.getSelectedNodes(
      JSON.parse(JSON.stringify(this.tree))
    );
    this._val = selectedLeaves;
    this.changeHandler(selectedLeaves);
  }

  setChildren(node: ITree<String>, checked: boolean): void {
    node.nodeStatus = checked ? this.SELECTED : this.UNSELECTED;
    node.children.forEach((node) => {
      this.setChildren(node, checked);
    });
  }

  setParents(parentAddress:number[] , checked: boolean) {
    if(parentAddress.length==0)
      return;
    let parentNode = parentAddress.reduce((pNode, position) => pNode.children[+position], this.treeRoot);
    if (checked) {
      let selectedCount = parentNode.children.reduce((count, childNode) => childNode.nodeStatus === this.SELECTED ? ++count : count,0);
      parentNode.nodeStatus = (selectedCount == parentNode.children.length)?this.SELECTED:this.INTERMEDIATE;
    } 
    else {
      let unselectedCount = parentNode.children.reduce((count, node) => node.nodeStatus === this.UNSELECTED ? ++count: count, 0);
      parentNode.nodeStatus = (parentNode.children.length-unselectedCount > 0)? this.INTERMEDIATE: this.UNSELECTED;
    }
    this.setParents(parentAddress.slice(0,parentAddress.length-1),checked)
  }

  writeValue(tree: ITree<String>): void {
    // this.tree = this.checkTreeService.addCheckTreeMeta(
    //   JSON.parse(JSON.stringify(this.tree)),
    //   '',
    //   0
    // );
  }
  registerOnChange(changeHandler: Function): void {
    this.changeHandler = changeHandler;
  }
  registerOnTouched(touchHandler: Function): void {
    this.touchHandler = touchHandler;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.checkboxes.forEach((checkbox) => {
      const div = checkbox.nativeElement;
      const action = isDisabled ? 'addClass' : 'removeClass';
      this.renderer[action](div, 'disabled');
    });
  }
}
