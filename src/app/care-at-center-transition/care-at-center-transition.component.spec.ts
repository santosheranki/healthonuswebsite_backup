import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAtCenterTransitionComponent } from './care-at-center-transition.component';

describe('CareAtCenterTransitionComponent', () => {
  let component: CareAtCenterTransitionComponent;
  let fixture: ComponentFixture<CareAtCenterTransitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareAtCenterTransitionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareAtCenterTransitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
