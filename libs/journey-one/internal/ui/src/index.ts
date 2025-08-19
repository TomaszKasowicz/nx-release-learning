export const greeting = 'Hello World!';
import { greeting as sharedGreeting } from '@tomaszk/shared-journey-lib/internal/ui';

console.log(sharedGreeting);
