import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssociateComponent } from './update-associate.component';

describe('UpdateAssociateComponent', () => {
  let component: UpdateAssociateComponent;
  let fixture: ComponentFixture<UpdateAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
