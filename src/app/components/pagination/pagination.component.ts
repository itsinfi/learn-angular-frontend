import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [CommonModule]
})
export class PaginationComponent {

  @Input() limit: number;
  @Input() currentPage: number;
  @Input() total: number;

  @Input() onChangePage: Function;

  pageCount: number = 0
  pages: number[] = []

  ngOnInit() {
    this.pageCount = Math.ceil(this.total / this.limit);

    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(i)
    }
  }

  changePage(page: number, limit: number) {
    this.currentPage = page;
    this.onChangePage(page, limit)
  }

}
