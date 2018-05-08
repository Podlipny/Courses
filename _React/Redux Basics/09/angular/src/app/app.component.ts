import { Component } from '@angular/core';
import store from './reduxState';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic Tac Toe';

  unsubRedux;

  ngOnInit() {
    this.unsubRedux = store.subscribe(() => {
      var state = store.getState();

      this.fields = state.fields;
    })
  }

  ngOnDestroy() {
    this.unsubRedux();
  }

  // default state
  fields = store.getState().fields;

  handlePlay(index) {
    store.dispatch({type:'MARK_FIELD', data: {fieldIndex: index}});
  }

  handleRestart() {
    store.dispatch({type:'RESET_FIELDS'});
  }
}
