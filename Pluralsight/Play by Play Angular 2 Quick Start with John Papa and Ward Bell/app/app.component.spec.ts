/* tslint:disable:no-unused-variable */
import { AppComponent } from './app.component';

import {
  expect, it, iit, xit,
  describe, ddescribe, xdescribe,
  beforeEach, beforeEachProviders, withProviders,
  async, inject
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';
import { By }                   from '@angular/platform-browser';

////////  SPECS  /////////////

/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('AppComponent with new', function () {
    it('should instantiate component', () => {
      expect(new AppComponent()).not.toBeNull('Whoopie!');
    });
});

describe('AppComponent with TCB', function () {

  it('should instantiate component',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

    restoreOriginalAppComponent(tcb) // was `tcb`
      .createAsync(AppComponent).then(fixture => {
        expect(fixture.componentInstance instanceof AppComponent).toBe(true, 'should create AppComponent');
      })
      .catch(err => {
        console.error(err);
        throw(err);
      });
  })));

  it('should have expected <h1> text',
    async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {

      restoreOriginalAppComponent(tcb) // was `tcb`
        .createAsync(AppComponent).then(fixture => {
          // fixture.detectChanges();  // would need to resolve a binding but we don't have a binding

          let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

              h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

          expect(h1.innerText).toMatch(/angular 2 app/i, '<h1> should say something about "Angular 2 App"');
        });

  })));
});

/////////////////////////////////
// Override the state of AppComponent to what it was when we first ran the tests.
// This was before we added the customer feature which would break these tests
// Todo: update the tests yourself!

import { CustomerService } from './customer/index';

function restoreOriginalAppComponent(tcb: TestComponentBuilder) {
   return tcb
    .overrideTemplate( AppComponent, '<h1>My First Angular 2 App</h1>')
    .overrideProviders(AppComponent, [{ provide: CustomerService, useValue: {} }]);
}
