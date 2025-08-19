import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedJourneyLib } from './shared-journey-lib';

describe('SharedJourneyLib', () => {
  let component: SharedJourneyLib;
  let fixture: ComponentFixture<SharedJourneyLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedJourneyLib],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedJourneyLib);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
