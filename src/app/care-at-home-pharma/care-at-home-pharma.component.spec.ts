import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAtHomePharmaComponent } from './care-at-home-pharma.component';

describe('CareAtHomePharmaComponent', () => {
  let component: CareAtHomePharmaComponent;
  let fixture: ComponentFixture<CareAtHomePharmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CareAtHomePharmaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CareAtHomePharmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
