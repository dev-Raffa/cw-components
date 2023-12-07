import { newSpecPage } from '@stencil/core/testing';
import { CwDropdown } from '../cw-dropdown';

describe('cw-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CwDropdown],
      html: `<cw-dropdown></cw-dropdown>`
    });
    expect(page.root).toEqualHtml(`
      <cw-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cw-dropdown>
    `);
  });
});
