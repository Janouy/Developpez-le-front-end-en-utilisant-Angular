import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgStyle } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LabelComponent } from './components/label/label.component';

@NgModule({
	declarations: [AppComponent, HomeComponent, NotFoundComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, DashboardComponent, LabelComponent, NgStyle],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
