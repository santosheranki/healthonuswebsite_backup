import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAtHomeNursingComponent } from './care-at-home-nursing.component';

describe('CareAtHomeNursingComponent', () => {
  let component: CareAtHomeNursingComponent;
  let fixture: ComponentFixture<CareAtHomeNursingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareAtHomeNursingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareAtHomeNursingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
