import {inject, customElement, bindable} from 'aurelia-framework';
import $ from 'bootstrap';

@customElement('modal')
@inject(Element)
export class Modal {
  @bindable showing = false;
  @bindable escapeCallback /*: () => void*/;
  keydownHandler = null;

  constructor(element) {
    this.element = element;
  }

  attached(){
    $(this.modal).modal({show: false})
    .on('show.bs.modal', () => {
      this.showing = true;
    })
    .on('hide.bs.modal', () => {
      this.showing = false;
    });
    if(this.showing) {
      this.addEscHandler();
    }
  }

  detached() {
    this.removeEscHandler();
  }

  showingChanged(newValue){
    if (newValue) {
      this.addEscHandler();
      $(this.modal).modal('show')
    } else {
      $(this.modal).modal('hide')
      this.removeEscHandler();
    }
  }

  addEscHandler() {
    if(this.escapeCallback && !this.keydownHandler) {
      this.keydownHandler = (e /*: JQueryEventObject*/) => {
        if(e.which == 27) { // escape was pressed
          this.escapeCallback();
        }
      };
      $(this.modal).on("keydown.dismiss.bs.modal", this.keydownHandler);
    }
  }

  removeEscHandler() {
    if(this.keydownHandler) {
      $(this.modal).off("keydown.dismiss.bs.modal", this.escapeCallback);
      this.keydownHandler = null;
    }
  }
}
