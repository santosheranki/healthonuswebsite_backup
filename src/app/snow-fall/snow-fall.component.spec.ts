import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowFallComponent } from './snow-fall.component';

describe('SnowFallComponent', () => {
  let component: SnowFallComponent;
  let fixture: ComponentFixture<SnowFallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SnowFallComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SnowFallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
