import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [
    CommonModule
  ]
})
export class PaginationComponent {

  // limit of elements per page
  @Input() limit: number;

  // current page index
  @Input() currentPage: number;

  // total amount of elements
  @Input() total: number;

  // call back function to call when changing page
  @Input() onChangePage: Function;

  // total count of pages
  pageCount: number = 0;

  // all pages as a list to iterate
  pages: number[] = [];

  // all options for the selection of the limit
  limits: number[] = [];

  // on init
  ngOnInit() {

    // calculate page count
    this.pageCount = Math.ceil(this.total / this.limit);

    // generate iterable list of pages
    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i)
    }

    // generate selection for limits based on initial value
    this.limits = [this.limit, this.limit * 2, this.limit * 4]
  }

  // change the page
  changePage(page: number) {
    this.currentPage = page;
    this.onChangePage(page, this.limit);
  }

  // change the limit per page
  changeLimit($event: Event) {

    const target: HTMLSelectElement = $event.target as HTMLSelectElement;

    console.log(target.value)

    this.limit = parseInt(target.value);
    this.onChangePage(this.currentPage, this.limit);
  }

}
