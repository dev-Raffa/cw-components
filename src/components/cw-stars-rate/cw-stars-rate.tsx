import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'cw-stars-rate',
  styleUrl: 'cw-stars-rate.css',
  shadow: true,
})
export class CwStarsRate {
  @Element() el!: HTMLElement;
  @Prop() bgColor: string;
  @Prop() maxValue: number;
  @Prop() defaultValue: number;
  @Prop() starSelectedColor: string;
  @Prop() starUnselectedColor: string;
  @Prop() size: string;

  private stars: HTMLElement[];

  componenWillLoad() {
    this.stars = this.generateStars(this.maxValue);
    this.stars.forEach((star)=> this.el.append(star))
    
    this.bgColor && this.el.style.setProperty('--bg-color', this.bgColor);
    this.starSelectedColor 
      && this.el.style.setProperty('--star-selected-color', this.starSelectedColor);
    this.starUnselectedColor && 
      this.el.style.setProperty('--star-unselected-color',  this.starUnselectedColor);
    this.size && this.el.style.setProperty('--size', this.size);  
  }

  private changeValue (value: number){
    const maxValue = this.maxValue;

    for(let i = 0; i<value; i++)
      this.stars[i].classList.add('selected')

    for(let i = maxValue-1; i>=value; i--)
      this.stars[i].classList.remove('selected')
  }
  
  private onClickHandle(value:number){
    this.changeValueBind(value);
    this.defaultValue = value;
  }

  private onMouseOverHandle(value:number){
    this.changeValueBind(value);
  }

  private changeValueBind: Function = this.changeValue.bind(this);

  
  private mouseOutHandle(){
    this.changeValue(this.defaultValue)
  }
  
  private generateStars(value: number) {
    const stars: HTMLElement[] = [];
    for (let i = 0; i < value; i++) {
      stars.push(
        <span 
          class="star" 
          onClick={()=> this.onClickHandle(i+1)} 
          onMouseOver={()=> this.onMouseOverHandle(i+1)} 
        />        
      );
    }
    return stars;
  }
  
  render() {
    return (
      <Host onMouseOut= {this.mouseOutHandle.bind(this)}>
        
      </Host>
    );
  }

}
