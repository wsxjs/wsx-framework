export class WebComponent<T = any> extends HTMLElement {
  props: T = {} as T;

  connectedCallback() {
    this.render();
  }

  render(): void {
    // Override in child classes
  }

  static getStyles?(): string;
}

export function autoRegister() {
  return function<T extends CustomElementConstructor>(target: T) {
    const tagName = target.name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2');
    customElements.define(tagName, target);
    return target;
  };
}