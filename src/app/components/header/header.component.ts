import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [RouterLink, RouterLinkActive, CommonModule],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
})
export class HeaderComponent {
	currentPath: String = '';
	homePath: String = '/';

	constructor(public router: Router) {
		this.router.events
			.pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
			.subscribe((event) => {
				this.currentPath = event.urlAfterRedirects;
			});
	}
}
