import './css/style.css';

import { TabsClass } from './scripts/tabs.class.ts';
import { setUpSlider } from './scripts/slider.set-up.ts';

const tabsContainer = document.querySelector('.tabs') as HTMLDivElement;
const tabsButtons = tabsContainer.querySelectorAll<HTMLAnchorElement>('[role="tab"]');
const tabsPanels = tabsContainer.querySelectorAll<HTMLDivElement>('[role="tabpanel"]');

new TabsClass(tabsContainer, tabsButtons, tabsPanels).init();

setUpSlider();
