import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
	selector: 'app-error',
	standalone: true,
	imports: [],
	templateUrl: './error.component.html',
	styleUrl: './error.component.scss',
})
export class ErrorComponent {
	@Input() message!: string;

	constructor(
		private location: Location,
		private router: Router
	) {
		Object.assign(this, this.message);
	}

	/**
	 * Reloads the application by navigating to the root route ('/').
	 */
	reload(): void {
		this.router.navigateByUrl(`/`);
	}
}
