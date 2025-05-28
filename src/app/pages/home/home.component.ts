import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	public olympics$!: Observable<Olympic[]>;
	private destroy$!: Subject<boolean>;
	public errorMessage$!: Observable<string | null>;
	public loading$!: Observable<boolean>;
	title!: string;
	numbersOfCountries!: number;
	numberOfJos!: number;

	constructor(private olympicService: OlympicService) {}

	ngOnInit(): void {
		this.destroy$ = new Subject<boolean>();
		this.olympics$ = this.olympicService.getOlympics();
		this.olympics$.pipe(takeUntil(this.destroy$)).subscribe((olympics) => {
			if (olympics && olympics.length > 0) {
				this.numbersOfCountries = olympics.length;
				const allYears = olympics.flatMap((country) => country.participations.map((p) => p.year));
				const uniqueYears = new Set(allYears);
				this.numberOfJos = uniqueYears.size;
			}
		});
		this.errorMessage$ = this.olympicService.getErrorMessage();
		this.loading$ = this.olympicService.isLoading();
	}
	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
