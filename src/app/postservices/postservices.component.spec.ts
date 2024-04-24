import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostservicesComponent } from './postservices.component';

describe('PostservicesComponent', () => {
  let component: PostservicesComponent;
  let fixture: ComponentFixture<PostservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostservicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
