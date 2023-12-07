import { newE2EPage } from '@stencil/core/testing';

describe('cw-swicth', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cw-swicth></cw-swicth>');

    const element = await page.find('cw-swicth');
    expect(element).toHaveClass('hydrated');
  });
});
