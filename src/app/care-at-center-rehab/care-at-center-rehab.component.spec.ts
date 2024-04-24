import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAtCenterRehabComponent } from './care-at-center-rehab.component';

describe('CareAtCenterRehabComponent', () => {
  let component: CareAtCenterRehabComponent;
  let fixture: ComponentFixture<CareAtCenterRehabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareAtCenterRehabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareAtCenterRehabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
