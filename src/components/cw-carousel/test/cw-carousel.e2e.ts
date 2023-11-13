import { newE2EPage } from '@stencil/core/testing';

describe('cw-carousel', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cw-carousel></cw-carousel>');

    const element = await page.find('cw-carousel');
    expect(element).toHaveClass('hydrated');
  });
});
