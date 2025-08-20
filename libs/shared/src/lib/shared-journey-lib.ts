import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-shared-journey-lib',
  imports: [],
  template: `<p>SharedJourneyLib works! And has a new feature1</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedJourneyLib {}
