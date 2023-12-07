import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'cw-swicth',
  styleUrl: 'cw-swicth.css',
  shadow: true,
})
export class CwSwicth {
  @Element() el!: HTMLElement;
  @Prop() bgColor: string;
  @Prop() ballColor: string;
  @Prop() border: string;

  private onClickHandle() {
    const ball = this.el.querySelector('.ball');
    ball.classList.toggle('selected');
  }
  

  render() {
    return (
      <Host onClick={this.onClickHandle}>
        <div class='ball'></div>
      </Host>
    );
  }

}
