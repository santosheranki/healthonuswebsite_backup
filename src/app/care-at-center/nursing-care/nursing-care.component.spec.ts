import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NursingCareComponent } from './nursing-care.component';

describe('NursingCareComponent', () => {
  let component: NursingCareComponent;
  let fixture: ComponentFixture<NursingCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NursingCareComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NursingCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
