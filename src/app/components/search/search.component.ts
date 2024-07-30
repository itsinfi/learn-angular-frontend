import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  imports: [
    CommonModule
  ]
})
export class SearchComponent {

  // search for lego cars by title
  @Input() onSearch: Function;

  // filter options
  @Input() filterOptions: string[] = [];

  // search & filter
  search: string = '';
  filter: string = '';

  // expand filter section?
  showFilter: WritableSignal<boolean> = signal(false);

  // update search and execute onSearch
  updateSearch(search: string) {
    this.search = search;
    this.onSearch(this.search, this.filter);
  }

  // update filter and execute onSearch
  updateFilter(filter: string) {
    this.filter = (this.filter === filter) ? '' : filter;
    this.onSearch(this.search, this.filter);
  }

  toggleFilterSection() {
    this.showFilter.set(!this.showFilter());
    console.log(this.showFilter())
  }

}
