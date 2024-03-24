// polyfills.ts

// ...

/** IE9, IE10, IE11, and older browsers require the following for NgClass support on SVG elements */
import 'classlist.js';  // Run `npm install --save classlist.js`.

/** Evergreen browsers require these. **/
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';

/**
 * Required to support Web Animations `@angular/platform-browser/animations`.
 * Needed for: All but Chrome, Firefox and Opera. http://caniuse.com/#feat=web-animation
 **/
import 'web-animations-js';  // Run `npm install --save web-animations-js`.

// ...

/** Zone JS is required by Angular itself. **/
import 'zone.js/dist/zone';  // Included with Angular CLI.

(window as any).global = window;