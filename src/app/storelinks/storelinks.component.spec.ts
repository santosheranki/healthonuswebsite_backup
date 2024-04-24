import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorelinksComponent } from './storelinks.component';

describe('StorelinksComponent', () => {
  let component: StorelinksComponent;
  let fixture: ComponentFixture<StorelinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StorelinksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StorelinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
