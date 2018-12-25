import { Component } from '@angular/core';
@Component({
  // tslint:disable-next-line:quotemark
  template: "<h2><strong>you are not allowed to view this page</strong></h2>",
	styles: [
		'h2 { color: #fff200;text-align: center; padding: 200px; font-size: 4em; font-weight: 300 }'
	],
})
export class PageNotFoundComponent {}