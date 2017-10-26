import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { LoggerService } from 'app/core/logger.service';
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from "app/models/bookTrackerError";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private loggerService: LoggerService,
              private dataService: DataService) {
    this.loggerService.log('Creating the dashboard.');
  }

  ngOnInit() {
    this.allBooks = this.dataService.getAllBooks();
    this.dataService.getAllReaders()
      .subscribe(
        (data: Reader[]) => this.allReaders = data,
        (err: BookTrackerError) => console.log(err.friendlyMessage),
        () => this.loggerService.log('All done getting readers!')
      );
    this.mostPopularBook = this.dataService.mostPopularBook;

    // The following uses callbacks to process a promise
    // this.dataService.getAuthorRecommendation(1)
    // .then(
    //   (author: string) => this.loggerService.log(author),
    //   (err: string) => this.loggerService.error(`The promise was rejected: ${err}`)
    // )
    // .catch((error: Error) => this.loggerService.error(error.message));

    // The following call processes the promise inside the function with async/await
    this.getAuthorRecommendationAsync(1)
      .catch(err => this.loggerService.error(err));

    this.loggerService.log('Done with dashboard initialization.');
  }

  private async getAuthorRecommendationAsync(readerID: number): Promise<void> {
    let author: string = await this.dataService.getAuthorRecommendation(readerID);
    this.loggerService.log(author);
  }

  deleteBook(bookID: number): void {
    console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
