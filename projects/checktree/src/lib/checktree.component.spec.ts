import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckTree } from './checktree.component';

describe('CheckTree', () => {
  let component: CheckTree;
  let fixture: ComponentFixture<CheckTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckTree ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckTree);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
