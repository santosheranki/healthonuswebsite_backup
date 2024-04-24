import { ComponentFixture, TestBed } from '@angular/core/testing';

import { careathomeComponent } from './careathome.component';

describe('careathomeComponent', () => {
  let component: careathomeComponent;
  let fixture: ComponentFixture<careathomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [careathomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(careathomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
