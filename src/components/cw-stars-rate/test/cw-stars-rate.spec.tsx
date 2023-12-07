import { newSpecPage } from '@stencil/core/testing';
import { CwStarsRate } from '../cw-stars-rate';

describe('cw-stars-rate', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CwStarsRate],
      html: `<cw-stars-rate></cw-stars-rate>`,
    });
    expect(page.root).toEqualHtml(`
      <cw-stars-rate>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cw-stars-rate>
    `);
  });
});
