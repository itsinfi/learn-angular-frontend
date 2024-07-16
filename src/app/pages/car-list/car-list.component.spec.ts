import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPageComponent } from './car-list.component';

describe('CarListComponent', () => {
  let component: CarPageComponent;
  let fixture: ComponentFixture<CarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
