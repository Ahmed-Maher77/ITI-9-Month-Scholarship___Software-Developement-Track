import { Component } from '@angular/core';
import { ProductFeedComponent } from './components/product-feed/product-feed.component';

@Component({
  selector: 'app-root',
  imports: [ProductFeedComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
