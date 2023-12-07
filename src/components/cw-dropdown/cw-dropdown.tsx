import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'cw-dropdown',
  styleUrl: 'cw-dropdown.css',
  scoped: true
})
export class CwDropdown {
  @Element() el!: HTMLElement;
  @Prop() itemTitle: string;
  @Prop() icon: string;
  @Prop() bgColor: string;
  @Prop() border: string;

  private itemsSection: HTMLElement = this.el.querySelector('.items');
  private arrow: HTMlSelectElement = this.el.querySelector('.arrow');
  
  componentWillLoad() {
    this.el.style.setProperty('--bg-color', this.bgColor)
    this.el.style.setProperty('--border', this.border)
  }

  private onClickHandle() {
    this.itemsSection.classList.add('show');
    this.arrow.classList.add('rotate');
  }
  render() {
    return (
      <Host>
        <header onclick={this.onClickHandle}>
          <img src={this.icon} alt=""></img>
          <h3>{this.itemTitle}</h3>
          <img src="" alt="arrow"></img>
        </header>
        <section class="items">
          <slot></slot>
        </section>
      </Host>
    );
  }
}
