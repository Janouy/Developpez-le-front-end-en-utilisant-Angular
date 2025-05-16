import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-label',
	imports: [CommonModule],
	standalone: true,
	templateUrl: './label.component.html',
	styleUrl: './label.component.scss',
})
export class LabelComponent {
	@Input() title!: string;
	@Input() value!: number;
}
