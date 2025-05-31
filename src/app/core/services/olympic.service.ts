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
	private olympics$ = new BehaviorSubject<Olympic[] | null>(null);
	private loading$ = new BehaviorSubject<boolean>(false);
	private errorMessage$ = new BehaviorSubject<string | null>(null);

	constructor(private http: HttpClient) {}

	/**
	 * Loads the initial data for Olympic entries from the backend API.
	 * @returns An Observable emitting the Olympic data array or an empty array on error.
	 */
	loadInitialData() {
		this.loading$.next(true);
		this.errorMessage$.next(null);
		return this.http.get<Olympic[]>(this.olympicUrl).pipe(
			tap((value) => this.olympics$.next(value)),
			catchError((err: HttpErrorResponse) => {
				const msg = this._buildErrorMessage(err);
				this.errorMessage$.next(msg);
				this.olympics$.next(null);
				return of<Olympic[] | null>(null);
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

	/**
	 * Builds a user-friendly error message based on the HTTP error response.
	 * @param err - The HTTP error response object received from the backend.
	 * @returns A formatted string describing the error.
	 */
	private _buildErrorMessage(err: HttpErrorResponse): string {
		if (err.error instanceof ErrorEvent) {
			return `Network error : ${err.error.message}`;
		} else {
			return `The server responded with the code ${err.status} (${err.statusText}).`;
		}
	}
}
