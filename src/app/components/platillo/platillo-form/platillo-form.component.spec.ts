import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatilloFormComponent } from './platillo-form.component';

describe('PlatilloFormComponent', () => {
  let component: PlatilloFormComponent;
  let fixture: ComponentFixture<PlatilloFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatilloFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatilloFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
