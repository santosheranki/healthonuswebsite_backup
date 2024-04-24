import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeservicesComponent } from './homeservices.component';

describe('HomeservicesComponent', () => {
  let component: HomeservicesComponent;
  let fixture: ComponentFixture<HomeservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
