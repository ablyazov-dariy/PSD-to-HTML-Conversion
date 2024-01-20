import KeenSlider, { KeenSliderHooks, KeenSliderInstance } from 'keen-slider';
import 'keen-slider/keen-slider.css';

export function setUpSlider(): void {
  function ThumbnailPlugin(main: KeenSliderInstance) {
    return (slider: {
      slides: any[];
      on: (arg0: string, arg1: () => void) => void;
      track: { details: { rel: any; maxIdx: number } };
      moveToIdx: (arg0: number) => void;
    }) => {
      function removeActive() {
        slider.slides.forEach(slide => {
          slide.classList.remove('active');
        });
      }

      function addActive(idx: any) {
        slider.slides[idx].classList.add('active');
      }

      function addClickEvents() {
        slider.slides.forEach((slide, idx) => {
          slide.addEventListener('click', () => {
            main.moveToIdx(idx);
          });
        });
      }

      slider.on('created', () => {
        addActive(slider.track.details.rel);
        addClickEvents();
        main.on('animationStarted', (main: any) => {
          removeActive();
          const next = main.animator.targetIdx || 0;
          addActive(main.track.absToRel(next));
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
        });
      });
    };
  }

  const slider: KeenSliderInstance<{}, {}, KeenSliderHooks> = new KeenSlider('#my-keen-slider');
  new KeenSlider(
    '#thumbnails',
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(slider)]
  );
}
