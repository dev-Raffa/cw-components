import { newSpecPage } from '@stencil/core/testing';
import { CwSwicth } from '../cw-swicth';

describe('cw-swicth', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CwSwicth],
      html: `<cw-swicth></cw-swicth>`,
    });
    expect(page.root).toEqualHtml(`
      <cw-swicth>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cw-swicth>
    `);
  });
});
