import { newE2EPage } from '@stencil/core/testing';

describe('cw-draggable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cw-draggable></cw-draggable>');

    const element = await page.find('cw-draggable');
    expect(element).toHaveClass('hydrated');
  });
});
