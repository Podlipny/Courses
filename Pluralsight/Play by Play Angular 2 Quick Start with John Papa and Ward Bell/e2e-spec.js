
describe('QuickStart E2E Tests', function () {

  // The original message when we ran the tests
  // var expectedMsg = 'My First Angular 2 App';

  // The message at the end of the Play-by-Play
	var expectedMsg = 'Customer App';

  beforeEach(function () {
    browser.get('');
  });

  it('should display: ' + expectedMsg, function () {
    expect(element(by.css('h1')).getText()).toEqual(expectedMsg);
  });

});
