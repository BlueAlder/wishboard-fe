import { Pipe, PipeTransform } from '@angular/core';
import * as url from 'url';

@Pipe({
  name: 'hostnameToMarketplace'
})
export class HostnameToMarketplacePipe implements PipeTransform {

  transform(urlInput: string): string {
    const parsedUrl = url.parse(urlInput);
    const hostname = parsedUrl.hostname;
    console.log(hostname);
    switch (hostname) {
      case 'www.theiconic.com.au':
        return 'The Iconic';
      case 'www.asos.com':
        return 'ASOS';
      default:
        return '';
    }
  }

}
