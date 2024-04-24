import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapToFameComponent } from './snap-to-fame.component';

describe('SnapToFameComponent', () => {
  let component: SnapToFameComponent;
  let fixture: ComponentFixture<SnapToFameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnapToFameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnapToFameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
