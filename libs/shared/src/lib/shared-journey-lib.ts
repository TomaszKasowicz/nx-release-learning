import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-shared-journey-lib',
  imports: [],
  template: `<p>SharedJourneyLib works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedJourneyLib {}
