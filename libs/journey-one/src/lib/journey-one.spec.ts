import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JourneyOne } from './journey-one';

describe('JourneyOne', () => {
  let component: JourneyOne;
  let fixture: ComponentFixture<JourneyOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JourneyOne],
    }).compileComponents();

    fixture = TestBed.createComponent(JourneyOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
