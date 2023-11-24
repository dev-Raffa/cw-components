import { newSpecPage } from '@stencil/core/testing';
import { CwDraggable } from '../cw-draggable';

describe('cw-draggable', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CwDraggable],
      html: `<cw-draggable></cw-draggable>`,
    });
    expect(page.root).toEqualHtml(`
      <cw-draggable>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cw-draggable>
    `);
  });
});
