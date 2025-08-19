import { ChangeDetectionStrategy, Component } from '@angular/core';
import { greeting } from '@TomaszKasowicz/shared-journey-lib/internal/util';

@Component({
  selector: 'lib-journey-one',
  imports: [],
  template: `<p>JourneyOne works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JourneyOne {
  constructor() {
    console.log(greeting);
  }
}
