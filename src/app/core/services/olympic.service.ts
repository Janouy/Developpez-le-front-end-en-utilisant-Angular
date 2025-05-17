import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';

@Injectable({
	providedIn: 'root',
})
export class OlympicService {
	private olympicUrl = './assets/mock/olympic.json';
	private olympics$ = new BehaviorSubject<Olympic[]>([]);
	private loading$ = new BehaviorSubject<boolean>(false);
	private errorMessage$ = new BehaviorSubject<string | null>(null);

	constructor(private http: HttpClient) {}

	loadInitialData() {
		this.loading$.next(true);
		this.errorMessage$.next(null);
		return this.http.get<Olympic[]>(this.olympicUrl).pipe(
			tap((value) => this.olympics$.next(value)),
			catchError((err: HttpErrorResponse) => {
				const msg = this._buildErrorMessage(err);
				this.errorMessage$.next(msg);
				this.olympics$.next([]);
				return of<Olympic[]>([]);
			}),
			finalize(() => {
				this.loading$.next(false);
			})
		);
	}

	getOlympics() {
		return this.olympics$.asObservable();
	}
	isLoading() {
		return this.loading$.asObservable();
	}
	getErrorMessage() {
		return this.errorMessage$.asObservable();
	}

	private _buildErrorMessage(err: HttpErrorResponse): string {
		if (err.error instanceof ErrorEvent) {
			return `Erreur réseau : ${err.error.message}`;
		} else {
			return `Le serveur a répondu avec le code ${err.status} (${err.statusText}).`;
		}
	}
}
