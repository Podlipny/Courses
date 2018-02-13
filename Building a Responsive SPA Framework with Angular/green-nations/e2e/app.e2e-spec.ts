import { GreenNationsPage } from './app.po';

describe('green-nations App', function() {
  let page: GreenNationsPage;

  beforeEach(() => {
    page = new GreenNationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
