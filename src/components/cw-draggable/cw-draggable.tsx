import { Component, Host, h, Prop, Element } from '@stencil/core';

@Component({
  tag: 'cw-draggable',
  styleUrl: 'cw-draggable.css',
})
export class CwDraggable {
  @Element() el: HTMLElement;
  @Prop() title: string;
  @Prop() width: string = 'fit-content'
  @Prop() height: string = 'fit-content'
  @Prop() transition: string = 'all .7s ease-in-out'
  @Prop() border: string = 'none'
  @Prop() gap: string = '8px'
  @Prop() bgColor: string='#fff'

  private dropArea!: HTMLElement;
  private items: HTMLCollection;

  componentWillLoad() {
    this.dropArea.style.setProperty("--bg-color", this.bgColor)
  }

  componenetDidLoad() {
    this.items = this.dropArea.children;

    for(let i = 0; i < this.items.length; i++) {
      this.items[i].addEventListener('dragstart', this.dragStartHandle);
      //this.items[i].addEventListener('drag', this.dragHandle);
      this.items[i].addEventListener('dragend', this.dragEndHandle);
      this.items[i].setAttribute('draggable', 'true');
      this.items[i].classList.add('item-draggable');
    }

    //this.dropArea.addEventListner('dragenter', this.dragEnterHandle)
    this.dropArea.addEventListener('dragover', this.dragOverHandle)
    //this.dropArea.addEventListner('dragleave', this.dragLeaveHandle)
    //this.dropArea.addEventListner('drop', this.dropHandle)
  }

  private dragStartHandle(){
    const dropArea = document.querySelector('.dropArea')
    dropArea.classList.add('highlight')
    this.el.classList.add('dragging')
  }
  
  /*
  private drag(){
    
  }
  */
  
  private dragEndHandle(){
    const dropArea = document.querySelector('.dropArea')
    dropArea.classList.remove('highlight')
    this.el.classList.remove('dragging')
  }

  /*
  private dragEnterHandle(){
  
  }
  */

  private dragOverHandle(e){
    const itemDragging = document.querySelector('.dragging')
    const applyAfter = this.getNewPositionBind(e.clientY)

    if(applyAfter){
      applyAfter.insertAdjacentElement('afterend', itemDragging)
    }
  }

  /*
  private dragLeaveHandle(){
    
  }
  */

  /*
  private dropHandle(){
    
  }
  */

  private getNewPositionBind = () => this.getNewPosition.bind(this)

  private getNewPosition(posY:number){
    const items = this.dropArea.querySelectorAll('.item-draggable:not(.dragging)')
    let result;

    for(let i=0; i< items.length; i++){
      const box = items[i].getBoundingClientRect()
      const boxCenter = box.top + box.height / 2

      if(posY <= boxCenter) result = items[i]
    }

    return result
  }

  
  render() {
    return (
      <Host 
        style = {{
          width: this.width, 
          height: this.height,
          backgroundColor: this.bgColor,
        }}
      >
        <header>
          <h3>{this.title}</h3>
        </header>
        <section 
          ref={(el)=> this.dropArea = el} 
          class='dropArea'
          style={{
            transition: this.transition,
            border: this.border,
          }}
          >
          <slot></slot>
        </section>
      </Host>
    );
  }

}
