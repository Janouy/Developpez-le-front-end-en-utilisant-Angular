import { HttpClientModule } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData, NgStyle, DecimalPipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DetailComponent } from './pages/detail/detail.component';
import { PieChartComponent } from './components/pieChart/pieChart.component';
import { LabelComponent } from './components/label/label.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderComponent } from './components/header/header.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

registerLocaleData(localeFr);
@NgModule({
	declarations: [AppComponent, HomeComponent, DetailComponent, NotFoundComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		PieChartComponent,
		LabelComponent,
		NgStyle,
		ErrorComponent,
		LoadingComponent,
		HeaderComponent,
		LineChartComponent,
		DecimalPipe,
	],
	providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
