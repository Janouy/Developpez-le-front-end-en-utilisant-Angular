import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Olympic } from '../../core/models/Olympic';
import { ChartData } from '../../core/models/ChartData';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [BrowserModule, NgxChartsModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnChanges, OnInit {
	@Input() olympics: Olympic[] = [];
	@Input() formatedOlympicsData: ChartData[] = [];
	activeTooltip: any = null;

	gradient: boolean = false;
	showLegend: boolean = false;
	showLabels: boolean = true;
	isDoughnut: boolean = false;
	chartWidth: number = 0;
	chartHeight: number = 0;

	colorScheme: string = 'cool';

	constructor() {
		Object.assign(this, this.olympics, this.formatedOlympicsData);
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.updateChartSize();
	}

	ngOnInit() {
		this.updateChartSize();
	}
	updateChartSize() {
		const width = window.innerWidth;
		const baseWidth = Math.min(width * 0.9, 600);
		this.chartWidth = baseWidth;
		this.chartHeight = baseWidth;
	}
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['olympics'] && this.olympics.length) {
			this.formatedOlympicsData = this.olympics.map((o: Olympic) => {
				const totalMedals = o.participations.reduce((sum, p) => sum + p.medalsCount, 0);
				return {
					name: o.country,
					value: totalMedals,
				};
			});
		}
	}

	onSelect(data: ChartData): void {
		console.log('Item clicked', JSON.parse(JSON.stringify(data)));
	}

	formatTooltip(model: ChartData): string {
		const name = model.data?.name ?? model.name;
		const value = model.data?.value ?? model.value;
		return [name, `🏅${value}`].join('\n');
	}
}
