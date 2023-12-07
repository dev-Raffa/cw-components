import { newE2EPage } from '@stencil/core/testing';

describe('cw-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cw-dropdown></cw-dropdown>');

    const element = await page.find('cw-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});
