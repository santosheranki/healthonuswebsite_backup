import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitioncareComponent } from './transitioncare.component';

describe('TransitioncareComponent', () => {
  let component: TransitioncareComponent;
  let fixture: ComponentFixture<TransitioncareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransitioncareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransitioncareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
