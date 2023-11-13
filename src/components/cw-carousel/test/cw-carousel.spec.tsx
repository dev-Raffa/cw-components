import { newSpecPage } from '@stencil/core/testing';
import { Carousel } from '../cw-carousel';

describe('cw-carousel', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Carousel],
      html: `<cw-carousel></cw-carousel>`
    });
    expect(page.root).toEqualHtml(`
      <cw-carousel>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cw-carousel>
    `);
  });
});
