import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, takeUntil, Subject } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from '../../core/models/Olympic';

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit, OnDestroy {
	public olympics$!: Observable<Olympic[] | null>;
	public errorMessage$!: Observable<string | null>;
	public loading$!: Observable<boolean>;
	private destroy$ = new Subject<void>();
	olympic!: Olympic | null;
	entries!: number;
	medals!: number;
	athletes!: number;

	constructor(
		private olympicService: OlympicService,
		private route: ActivatedRoute,
		private router: Router
	) {}

	ngOnInit(): void {
		const olympicId = this.route.snapshot.params['id'];
		this.olympics$ = this.olympicService.getOlympics();
		this.olympics$.pipe(takeUntil(this.destroy$)).subscribe((olympics) => {
			if (olympics && olympics.length > 0 && olympicId) {
				const olympic = olympics.find((olympic) => olympic.id === Number(olympicId));
				if (olympic) {
					this.olympic = olympic;
					this.entries = olympic.participations?.length;
					this.medals = olympic.participations?.reduce((sum, item) => sum + item.medalsCount, 0);
					this.athletes = olympic.participations?.reduce((sum, item) => sum + item.athleteCount, 0);
				}
			}
		});
		this.errorMessage$ = this.olympicService.getErrorMessage();
		this.loading$ = this.olympicService.isLoading();
	}
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
		this.olympic = null;
	}
}
