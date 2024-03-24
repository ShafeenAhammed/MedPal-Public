import { Component } from '@angular/core';
import { PageLoaderService } from './services/pageLoader/page-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MedPal';

  constructor(public loaderService: PageLoaderService) {}

  get isLoading() {
    return this.loaderService.loading$;
  }

}
