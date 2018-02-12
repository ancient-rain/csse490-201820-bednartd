import { AngularContactListPage } from './app.po';

describe('angular-contact-list App', () => {
  let page: AngularContactListPage;

  beforeEach(() => {
    page = new AngularContactListPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
