import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Olympic } from '../../core/models/Olympic';
import { Participation } from '../../core/models/Participation';
import { LineChartdata } from '../../core/models/LineChartData';

@Component({
	selector: 'app-line-chart',
	standalone: true,
	imports: [BrowserModule, NgxChartsModule, NoopAnimationsModule],
	templateUrl: './line-chart.component.html',
	styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements OnChanges, OnInit {
	@Input() olympic: Olympic | null = null;
	@Input() formatedOlympicData!: LineChartdata[];
	participations: Participation[] | null = null;

	xAxis: boolean = true;
	yAxis: boolean = true;
	showYAxisLabel: boolean = true;
	showXAxisLabel: boolean = true;
	xAxisLabel: string = 'Dates';
	yAxisLabel: string = 'Médailles obtenues ';
	yScaleMin!: number;
	view!: [number, number];

	constructor() {
		Object.assign(this, this.olympic, this.formatedOlympicData, this.participations);
	}

	ngOnInit() {
		this.setChartView();
		window.addEventListener('resize', () => this.setChartView());
	}

	setChartView() {
		if (window.innerWidth > 768) {
			this.view = [768, 400];
		} else {
			this.view = [window.innerWidth * 0.9, 400];
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['olympic'] && this.olympic) {
			this.participations = this.olympic.participations;
			if (this.participations && this.participations.length > 0) {
				this.formatedOlympicData = [
					{
						name: this.olympic?.country,
						series: this.participations.map((p: Participation) => {
							return {
								extra: p.id,
								name: p.year.toString(),
								value: p.medalsCount,
							};
						}),
					},
				];
				const minMedalsCount = Math.min(...this.participations.map((d) => d.medalsCount));
				this.yScaleMin = Math.floor(minMedalsCount / 10) * 10;
			}
		}
	}
}
