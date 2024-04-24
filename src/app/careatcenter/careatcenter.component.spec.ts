import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareatcenterComponent } from './careatcenter.component';

describe('CareatcenterComponent', () => {
  let component: CareatcenterComponent;
  let fixture: ComponentFixture<CareatcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareatcenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareatcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
