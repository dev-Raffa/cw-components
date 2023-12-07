import { newE2EPage } from '@stencil/core/testing';

describe('cw-stars-rate', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cw-stars-rate></cw-stars-rate>');

    const element = await page.find('cw-stars-rate');
    expect(element).toHaveClass('hydrated');
  });
});
