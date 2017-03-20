import { House3dPage } from './app.po';

describe('house3d App', () => {
  let page: House3dPage;

  beforeEach(() => {
    page = new House3dPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
