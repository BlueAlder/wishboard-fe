import { Pipe, PipeTransform } from '@angular/core';
import {Pin} from '../services/board.service';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: Pin[], searchQuery: string) {
    if (searchQuery == null) {
      searchQuery = '';
    }

    searchQuery = searchQuery.toLowerCase();

    return items.filter(pin => pin.title.toLowerCase().indexOf(searchQuery) > -1);
  }

}
