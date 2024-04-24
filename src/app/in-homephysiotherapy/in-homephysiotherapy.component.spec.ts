import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InHomephysiotherapyComponent } from './in-homephysiotherapy.component';

describe('InHomephysiotherapyComponent', () => {
  let component: InHomephysiotherapyComponent;
  let fixture: ComponentFixture<InHomephysiotherapyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InHomephysiotherapyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InHomephysiotherapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
