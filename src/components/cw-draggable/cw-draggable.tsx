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
  private items: HTMLElement[];

  componentWillLoad() {
    this.dropArea.style.setProperty("--bg-color", this.bgColor)
  }

  componenetDidLoad() {
    this.items = this.dropArea.chidren;

    this.items.forEach((item, index) => {
      item.setAtrribute('draggable', 'true');
      item.claasList.add('item-draggable');
      item.addEventListner('dragstart', this.dragStartHandle)
      //item.addEventListner('drag', this.dragHandle)
      item.addEventListner('dragend', this.dragEndHandle)
    }
    //this.dropArea.addEventListner('dragenter', this.dragEnterHandle)
    this.dropArea.addEventListner('dragover', this.dragOverHandle)
    //this.dropArea.addEventListner('dragleave', this.dragLeaveHandle)
    //this.dropArea.addEventListner('drop', this.dropHandle)
  }


  private dragStartHandle(){
    const dropArea = document.querySelector('.dropArea')
    dropArea.classList.add('highlight')
    this.classList.add('dragging')
  }
  
  /*
  private drag(){
    
  }
  */
  
  private dragEndHandle(){
    const dropArea = document.querySelector('.dropArea')
    dropArea.classList.remove('highlight')
    this.classList.remove('dragging')
  }

  /*
  private dragEnterHandle(){
  
  }
  */

  private dragOverdeHandle(e){
    const itemDragging = document.querySelector('.dragging')
    const applyAfter = getNewPositionBind(e.clientY)

    if(applyAfter){
      applyAfer.insertAdjacentElement('afterend', itemDragging)
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

  private getNewPositionBind = () => getNewPosition.bind(this)

  private getNewPosition(posY:number){
    const items = this.dropArea.querySeletAll('.item-draggable:not(.dragging)')
    let result;

    for(refer_item of items){
      const box = refer_item.getBoundingClientRect()
      const boxCenter = box.top + box.height / 2

      if(posY <= boxCenter) reuslt = refer_item
    }

    retunr result
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
