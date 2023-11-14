import { Component, Element, Prop, h, Fragment } from '@stencil/core';
import { Arrow } from './icons/arrow';

@Component({
  tag: 'cw-carousel',
  styleUrl: 'cw-carousel.css',
  shadow: true
})
export class Carousel {
  @Element() el: HTMLCwCarouselElement;
  @Prop() autoplay: boolean;
  @Prop() time: number;
  @Prop() index: boolean;
  @Prop() arrows: boolean;
  @Prop() width: string;
  @Prop() height: string;
  @Prop() colors: string;

  private groupItems: HTMLElement;
  private items: HTMLCollection;
  private indexes: HTMLCollection;
  private itemInView: number;
  private actualPosisiton: number;
  private resizeObserver: ResizeObserver;

  componentWillLoad() {
    Object.assign(this.el.style, { width: this.width, height: this.height });
    this.itemInView = 0;
  }

  componentDidLoad() {
    this.actualPosisiton =
      parseInt(this.groupItems.style.left.replace(/[A-Z]/i, '')) | 0;
    this.items = this.groupItems.children;
    this.resizeObserver = new ResizeObserver(this.handleResize.bind(this));
    this.resizeObserver.observe(this.el);
    this.adjustItems();
    this.index && this.getSectionIndex();
    this.indexes = this.el.querySelector('.index-section').children;
    this.arrows && this.getArrows();
    this.autoplay && this.autoplayActive(5000);
  }

  private handleResize() {
    this.adjustItems();
    const item = this.items[this.itemInView];
    item.scrollIntoView(true);
  }

  private adjustItems() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      item.setAttribute(
        'style',
        `width: ${this.el.clientWidth}px; overflow: hidden; display: flex; align-items: center; justify-content: center;`
      );
    }
  }

  private getSectionIndex() {
    const indexSection = document.createElement('section');
    indexSection.setAttribute('class', 'index-section');

    if (this.index) {
      for (let i = 0; i < this.items.length; i++) {
        const index = document.createElement('button');
        index.setAttribute(
          'class',
          `index ${this.itemInView == i ? 'active' : ''}`
        );
        index.addEventListener('click', () => {
          this.selectItem(i);
        });

        Object.assign(index.style, {
          backgroundColor: this.colors ? this.colors : 'white'
        });
        indexSection.appendChild(index);
      }

      this.el.appendChild(indexSection);
    }
  }

  private getArrows() {
    const styles = {
      height: this.height,
      color: this.colors ? this.colors : 'white'
    };

    if (this.items.length > 1) {
      const prevArrow = document.createElement('button');
      prevArrow.onclick = this.prevItem.bind(this);
      prevArrow.setAttribute(
        'class',
        `prevButton${this.itemInView > 0 ? ' active' : ''}`
      );
      prevArrow.innerHTML = Arrow;
      Object.assign(prevArrow.style, styles);

      this.el.appendChild(prevArrow);

      const nextArrow = document.createElement('button');
      nextArrow.setAttribute(
        'class',
        `nextButton ${this.itemInView < this.items.length && 'active'}`
      );
      nextArrow.onclick = this.nextItem.bind(this);
      nextArrow.innerHTML = Arrow;
      Object.assign(nextArrow.style, styles);

      this.el.appendChild(nextArrow);
    }
  }

  private nextItem() {
    if (this.itemInView < this.items.length - 2) {
      this.actualPosisiton = this.actualPosisiton - (this.el.clientWidth + 24);
      Object.assign(this.groupItems.style, {
        left: this.actualPosisiton + 'px'
      });
      this.el.querySelector('.prevButton').classList.add('active');
      this.indexes[this.itemInView].classList.remove('active');
      this.itemInView++;
      this.indexes[this.itemInView].classList.add('active');
    } else if (this.itemInView === this.items.length - 2) {
      this.actualPosisiton = this.el.clientWidth - this.groupItems.clientWidth;
      this.el.querySelector('.nextButton').classList.remove('active');
      Object.assign(this.groupItems.style, {
        left: this.actualPosisiton + 'px'
      });
      this.indexes[this.itemInView].classList.remove('active');
      this.itemInView++;
      this.indexes[this.itemInView].classList.add('active');
    }
  }

  private prevItem() {
    if (this.itemInView - 1 > 0) {
      this.actualPosisiton = this.actualPosisiton + this.el.clientWidth + 24;
      Object.assign(this.groupItems.style, {
        left: this.actualPosisiton + 'px'
      });
      this.el.querySelector('.nextButton').classList.add('active');
      this.indexes[this.itemInView].classList.remove('active');
      this.itemInView--;
      this.indexes[this.itemInView].classList.add('active');
    } else if (this.itemInView - 1 === 0) {
      this.actualPosisiton = 0;
      this.el.querySelector('.prevButton').classList.remove('active');
      Object.assign(this.groupItems.style, {
        left: this.actualPosisiton + 'px'
      });
      this.indexes[this.itemInView].classList.add('active');
      this.indexes[this.itemInView].classList.remove('active');
      this.itemInView--;
      this.indexes[this.itemInView].classList.add('active');
    }
  }

  private selectItem(index: number) {
    if (index === this.itemInView) {
      return;
    }

    this.actualPosisiton = 0 - index * (this.el.clientWidth + 24);
    Object.assign(this.groupItems.style, { left: this.actualPosisiton + 'px' });
    this.indexes[this.itemInView].classList.remove('active');
    this.indexes[index].classList.add('active');
    this.itemInView = index;
    index > 0 && this.el.querySelector('.prevButton').classList.add('active');
    index === 0 &&
      this.el.querySelector('.prevButton').classList.remove('active');
    index < this.items.length - 1 &&
      this.el.querySelector('.nextButton').classList.add('active');
    index === this.items.length - 1 &&
      this.el.querySelector('.nextButton').classList.remove('active');
  }
  private autoplayActive(time: number) {
    setInterval(() => {
      if (this.itemInView < this.items.length - 1) {
        this.nextItem();
      } else {
        this.selectItem(0);
      }
    }, time);
  }
  render() {
    return (
      <>
        <section class="groupItems" ref={(el) => (this.groupItems = el)}>
          <slot></slot>
        </section>
      </>
    );
  }
}
