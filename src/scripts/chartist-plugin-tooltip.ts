import * as Chartist from 'chartist';
import { BarChart, BaseChart, PieChart } from 'chartist';

/**
 * Tooltip plugin options.
 */
export interface Options {
  /**
   * Tooltip offset in px.
   * Default: x 0, y -20
   */
  tooltipOffset: {
    x: number;
    y: number;
  };
  /**
   * If set true, the tooltips will not follow mouse movement and be anchored to the target point or bar.
   */
  anchorToPoint: boolean;
  /**
   * Append tooltip container to body (default: true)
   */
  appendToBody: boolean;
  /**
   * Add custom class(es) to the tooltip.
   * Can be a single class "my-class" or a list ["class-1", "class-2"].
   */
  class?: string | string[];
  /**
   * Custom point class to append tooltips to.
   * If none is specified, the default class will be used depending on the chart type (e.g. "ct-point" for line charts).
   */
  pointClass: string;
  /**
   * Custom function to generate tooltip (entire HTML markup).
   *
   * @param meta - Point's meta value.
   * @param value - Point's value.
   * @returns Tooltip markup.
   */
  tooltipFnc?: (meta: string, value: string) => string;
  /**
   * Custom function to generate tooltip text (content only).
   *
   * @param value - Point's value.
   * @returns Tooltip text.
   */
  transformTooltipTextFnc?: (value: string) => string;
  /**
   * Should the meta content be parsed as HTML (true) or plain text (false, default)
   */
  metaIsHTML: boolean;
}

/**
 * Chartist.js plugin to display a data label on top of the points in a line chart.
 */
export function ChartistPluginTooltip<T extends BaseChart>(
  chart: T,
  options?: Partial<Options>
): void {
  const defaultOptions = {
    tooltipOffset: {
      x: 0,
      y: -20
    },
    anchorToPoint: false,
    appendToBody: true,
    class: undefined,
    pointClass: 'ct-point',
    tooltipFnc: undefined,
    transformTooltipTextFnc: undefined,
    metaIsHTML: false
  };

  const $options = Chartist.extend({}, defaultOptions, options) as Options;

  let tooltipSelector = $options.pointClass;

  // Auto-detect default point class, if not explicitly overwritten in config.
  if (!options?.pointClass) {
    if (chart instanceof BarChart) {
      tooltipSelector = 'ct-bar';
    } else if (chart instanceof PieChart) {
      // Added support for donut graph
      if ((chart as any).options.donut) {
        // Added support for the solid donut graph
        tooltipSelector = 'ct-slice-donut';
      } else {
        tooltipSelector = 'ct-slice-pie';
      }
    }
  }

  const $chart = (chart as any).container as HTMLElement;
  let $toolTipIsShown = false;
  let $tooltipOffsetParent = ($chart.offsetParent as HTMLElement) || $chart;
  let $toolTip: HTMLElement;

  {
    let tt: HTMLElement | null;
    if (!$options.appendToBody) {
      // searching for existing tooltip in the chart, because appendToBody is disabled
      tt = $chart.querySelector('.chartist-tooltip');
    } else {
      // searching for existing tooltip in the body, because appendToBody is enabled
      tt = document.querySelector('.chartist-tooltip');
    }

    if (!tt) {
      tt = document.createElement('div');
      tt.classList.add('chartist-tooltip');
      if ($options.class) {
        if (Array.isArray($options.class)) {
          $options.class.forEach((c: string): void => tt?.classList.add(c));
        } else {
          tt.classList.add($options.class);
        }
      }
      if ($options.appendToBody) {
        document.body.appendChild(tt);
      } else {
        $chart.appendChild(tt);
      }
    }

    $toolTip = tt;
  }

  let height = $toolTip.offsetHeight;
  let width = $toolTip.offsetWidth;

  hide($toolTip);

  $chart.addEventListener('mouseover', (event: MouseEvent): void => {
    if (!(event.target as HTMLElement).classList.contains(tooltipSelector)) {
      return;
    }

    const $point = event.target as HTMLElement;
    let tooltipText = '';

    let seriesName = '';
    if (chart instanceof Chartist.PieChart) {
      seriesName =
        ($point.parentNode as HTMLElement).getAttribute('ct:meta') ||
        ($point.parentNode as HTMLElement).getAttribute('ct:series-name') ||
        '';
    }
    let meta = $point.getAttribute('ct:meta') || seriesName || '';
    const hasMeta = !!meta;
    let value = $point.getAttribute('ct:value') || '';

    if (
      $options.transformTooltipTextFnc &&
      typeof $options.transformTooltipTextFnc === 'function'
    ) {
      value = $options.transformTooltipTextFnc(value);
    }

    if ($options.tooltipFnc && typeof $options.tooltipFnc === 'function') {
      tooltipText = $options.tooltipFnc(meta, value);
    } else {
      if ($options.metaIsHTML) {
        const txt = document.createElement('textarea');
        txt.innerHTML = meta;
        meta = txt.value;
      }

      meta = '<span class="chartist-tooltip-meta">' + meta + '</span>';

      if (hasMeta) {
        tooltipText += meta + '<br>';
      } else {
        // For Pie Charts also take the labels into account. Could add support for more charts here as well!
        if (chart instanceof Chartist.PieChart) {
          const label = next($point, 'ct-label');
          if (label) {
            tooltipText += text(label) + '<br>';
          }
        }
      }

      if (value) {
        value = '<span class="chartist-tooltip-value">' + value + '</span>';
        tooltipText += value;
      }
    }

    if ($toolTip && tooltipText) {
      $toolTip.innerHTML = tooltipText;

      // Calculate new width and height, as toolTip width/height may have changed with innerHTML change.
      height = $toolTip.offsetHeight;
      width = $toolTip.offsetWidth;

      if (!$options.appendToBody) {
        $tooltipOffsetParent = ($chart.offsetParent as HTMLElement) || $chart;
      }
      if ($toolTip.style.display !== 'absolute') {
        $toolTip.style.display = 'absolute';
      }
      setPosition(event);
      show($toolTip);

      // Remember height and width to avoid wrong position in IE
      height = $toolTip.offsetHeight;
      width = $toolTip.offsetWidth;
    }
  });

  $chart.addEventListener('mouseout', (event: MouseEvent): void => {
    if ((event.target as HTMLElement).classList.contains(tooltipSelector)) {
      $toolTip && hide($toolTip);
    }
  });

  $chart.addEventListener('mousemove', (event: MouseEvent): void => {
    if (!$options.anchorToPoint && $toolTipIsShown) {
      setPosition(event);
    }
  });

  function setPosition(event: MouseEvent) {
    height = height || $toolTip.offsetHeight;
    width = width || $toolTip.offsetWidth;
    const offsetX = -width / 2 + $options.tooltipOffset.x;
    const offsetY = -height + $options.tooltipOffset.y;

    const anchor =
      $options.anchorToPoint &&
      event.target &&
      (event.target as any).x2 &&
      (event.target as any).y2;

    if ($options.appendToBody) {
      if (anchor) {
        const box = $chart.getBoundingClientRect();
        const left =
          (event.target as any).x2.baseVal.value + box.left + window.scrollX;
        const top =
          (event.target as any).y2.baseVal.value + box.top + window.scrollY;

        $toolTip.style.left = left + offsetX + 'px';
        $toolTip.style.top = top + offsetY + 'px';
      } else {
        $toolTip.style.left = event.pageX + offsetX + 'px';
        $toolTip.style.top = event.pageY + offsetY + 'px';
      }
    } else {
      const offsetBox = $tooltipOffsetParent.getBoundingClientRect();
      const allOffsetLeft = -offsetBox.left - window.scrollX + offsetX;
      const allOffsetTop = -offsetBox.top - window.scrollY + offsetY;

      if (anchor) {
        const box = $chart.getBoundingClientRect();
        const left =
          (event.target as any).x2.baseVal.value + box.left + window.scrollX;
        const top =
          (event.target as any).y2.baseVal.value + box.top + window.scrollY;

        $toolTip.style.left = left + allOffsetLeft + 'px';
        $toolTip.style.top = top + allOffsetTop + 'px';
      } else {
        $toolTip.style.left = event.pageX + allOffsetLeft + 'px';
        $toolTip.style.top = event.pageY + allOffsetTop + 'px';
      }
    }
  }

  /**
   * Shows the tooltip element, if not shown.
   *
   * @param element - The HTML element to show
   */
  function show(element: HTMLElement): void {
    $toolTipIsShown = true;
    element.classList.add('tooltip-show');
  }

  /**
   * Hides the tooltip element.
   *
   * @param element - The HTML element to hide
   */
  function hide(element: HTMLElement): void {
    $toolTipIsShown = false;
    element.classList.remove('tooltip-show');
  }

  /**
   * Find the next element that has a specific class.
   *
   * @param element - Base element to start off the search
   * @param className - Class name to search for
   * @returns Matching HTML element of NULL, if none was found
   */
  function next(element: HTMLElement, className: string): HTMLElement | null {
    let nextEl: HTMLElement | null = element;
    do {
      nextEl = element.nextSibling as HTMLElement | null;
    } while (nextEl && !nextEl.classList.contains(className));

    return nextEl;
  }

  /**
   * Get textual content of an element.
   *
   * @param element - HTML element to process
   * @returns Text content of the element
   */
  function text(element: HTMLElement): string {
    return element.innerText || element.textContent || '';
  }
}
