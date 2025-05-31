import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Olympic } from '../../core/models/Olympic';
import { ChartData } from '../../core/models/ChartData';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pieChart',
	standalone: true,
	imports: [BrowserModule, NgxChartsModule, FontAwesomeModule],
	templateUrl: './pieChart.component.html',
	styleUrl: './pieChart.component.scss',
})
export class PieChartComponent implements OnChanges {
	@Input() olympics: Olympic[] | null = null;
	@Input() formatedOlympicsData?: ChartData[];
	showLabels: boolean = true;
	faMedal = faMedal;

	constructor(private router: Router) {
		Object.assign(this, this.olympics, this.formatedOlympicsData);
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['olympics'] && Array.isArray(this.olympics) && this.olympics.length) {
			this.formatedOlympicsData = this.olympics.map((o: Olympic) => {
				const totalMedals = o.participations.reduce((sum, p) => sum + p.medalsCount, 0);
				return {
					name: o.country,
					value: totalMedals,
					extra: o.id,
				};
			});
		}
	}

	/**
	 * Handles chart element selection by navigating to a detail page.
	 * @param data - The selected chart data containing additional info in the `extra` property.
	 * Navigates to the route `detail/:id` using the value from `data.extra`.
	 */
	onSelect(data: ChartData): void {
		this.router.navigateByUrl(`detail/${data.extra}`);
	}
}
