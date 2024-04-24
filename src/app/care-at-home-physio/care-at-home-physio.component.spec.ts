import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAtHomePhysioComponent } from './care-at-home-physio.component';

describe('CareAtHomePhysioComponent', () => {
  let component: CareAtHomePhysioComponent;
  let fixture: ComponentFixture<CareAtHomePhysioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareAtHomePhysioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareAtHomePhysioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
