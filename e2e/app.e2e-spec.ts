import { AngularfirebasePage } from './app.po';

describe('angularfirebase App', function() {
  let page: AngularfirebasePage;

  beforeEach(() => {
    page = new AngularfirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
