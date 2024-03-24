import { TestBed } from '@angular/core/testing';

import { PageLoaderInterceptor } from './page-loader.interceptor';

describe('PageLoaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PageLoaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PageLoaderInterceptor = TestBed.inject(PageLoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
