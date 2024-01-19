export class TabsClass {
  constructor(
    private container: HTMLDivElement,
    private buttons: NodeListOf<HTMLAnchorElement>,
    private panels: NodeListOf<HTMLDivElement>
  ) {}

  public init(): void {
    this.setEventListeners();
  }

  private setEventListeners(): void {
    this.container.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') this.goToNextTab();
    });

    this.container.addEventListener('click', (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const clickedTab = event.target.closest('a');
      if (!clickedTab) return;
      event.preventDefault();

      this.switchToTab(clickedTab);
    });
  }

  private goToNextTab(): void {
    const currentTab = document.activeElement;

    if (!currentTab?.parentElement?.previousElementSibling) {
      this.switchToTab(this.buttons[this.buttons.length - 1]);
    } else {
      this.switchToTab(currentTab.parentElement.previousElementSibling.querySelector('a')!);
    }
  }

  private switchToTab(tab: HTMLAnchorElement): void {
    const activePanel = this.container.querySelector(tab.getAttribute('href') ?? '');
    this.hideAll();
    activePanel?.removeAttribute('hidden');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    tab.focus();
  }

  private hideAll() {
    this.panels.forEach(panel => panel.setAttribute('hidden', 'true'));
    this.buttons.forEach(button => {
      button.setAttribute('aria-selected', 'false');
      button.setAttribute('tabindex', '-1');
    });
  }
}
