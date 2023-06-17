import { BarChart, LineChart, PieChart } from 'chartist';
import { ChartistPluginTooltip } from '../../src/scripts/chartist-plugin-tooltip';

describe('Tooltip Plugin', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
  });

  describe('for LineChart', () => {
    let chartContainer: HTMLElement;
    let tooltip: HTMLElement | null;
    const listeners: { [key: string]: EventListener } = {};

    beforeAll(() => {
      // Create container DIV.
      chartContainer = document.createElement('div');
      chartContainer.id = 'chart';
      chartContainer.style.height = '100px';
      chartContainer.style.width = '500px';
      (chartContainer as any).addEventListener = (
        type: string,
        listener: EventListener
      ) => {
        listeners[type] = listener;
      };
      document.body.innerHTML = '';
      document.body.appendChild(chartContainer);
    });

    it('should initialize with a Tooltip plugin', () => {
      const chart = new LineChart(
        chartContainer,
        {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [[5, 9, 7, 8, 5, 3, 5, 4]]
        },
        {
          low: 0,
          showArea: true,
          plugins: [ChartistPluginTooltip]
        }
      );

      chart.initialize();

      expect(chartContainer?.innerHTML).not.toEqual('');
    });

    it('should append tooltip element to the chart container', () => {
      tooltip = document.body.querySelector('.chartist-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should generate the tooltip element', () => {
      tooltip = document.body.querySelector('.chartist-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should append the tooltip to the body by default', () => {
      expect(tooltip?.parentElement).toBe(document.body);
    });

    it('should not show tooltip on mouse enter', () => {
      listeners.mouseover({
        target: chartContainer as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should show tooltip with mouse over a point', () => {
      listeners.mouseover({
        target: chartContainer.querySelector('.ct-point') as EventTarget,
        pageX: 100,
        pageY: 200
      } as MouseEvent);
      expect(tooltip?.classList).toContain('tooltip-show');
    });

    it('should generate tooltip content', () => {
      expect(tooltip?.innerHTML).toEqual(
        '<span class="chartist-tooltip-value">5</span>'
      );
    });

    it('should set tooltip position', () => {
      expect(tooltip?.style.left).toBe('100px');
      expect(tooltip?.style.top).toBe('180px');
    });

    it('should hide tooltip on mouse leave', () => {
      listeners.mouseout({
        target: chartContainer.querySelector('.ct-point') as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });
  });

  describe('for BarChart', () => {
    let chartContainer: HTMLElement;
    let tooltip: HTMLElement | null;
    const listeners: { [key: string]: EventListener } = {};

    beforeAll(() => {
      // Create container DIV.
      chartContainer = document.createElement('div');
      chartContainer.id = 'chart';
      chartContainer.style.height = '100px';
      chartContainer.style.width = '500px';
      (chartContainer as any).addEventListener = (
        type: string,
        listener: EventListener
      ) => {
        listeners[type] = listener;
      };
      document.body.innerHTML = '';
      document.body.appendChild(chartContainer);
    });

    it('should initialize with a Tooltip plugin', () => {
      const chart = new BarChart(
        chartContainer,
        {
          labels: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
          series: [20, 60, 120, 200, 180, 20, 10]
        },
        {
          distributeSeries: true,
          plugins: [ChartistPluginTooltip]
        }
      );

      chart.initialize();

      expect(chartContainer?.innerHTML).not.toEqual('');
    });

    it('should generate the tooltip element', () => {
      tooltip = document.body.querySelector('.chartist-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should append the tooltip to the body by default', () => {
      expect(tooltip?.parentElement).toBe(document.body);
    });

    it('should hide the tooltip', () => {
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should not show tooltip on mouse enter', () => {
      listeners.mouseover({
        target: chartContainer as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should show tooltip with mouse over a point', () => {
      listeners.mouseover({
        target: chartContainer.querySelector('.ct-bar') as EventTarget,
        pageX: 200,
        pageY: 100
      } as MouseEvent);
      expect(tooltip?.classList).toContain('tooltip-show');
    });

    it('should generate tooltip content', () => {
      expect(tooltip?.innerHTML).toEqual(
        '<span class="chartist-tooltip-value">20</span>'
      );
    });

    it('should set tooltip position', () => {
      expect(tooltip?.style.left).toBe('200px');
      expect(tooltip?.style.top).toBe('80px');
    });

    it('should hide tooltip on mouse leave', () => {
      listeners.mouseout({
        target: chartContainer.querySelector('.ct-bar') as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });
  });

  describe('for PieChart', () => {
    let chartContainer: HTMLElement;
    let tooltip: HTMLElement | null;
    const listeners: { [key: string]: EventListener } = {};

    beforeAll(() => {
      // Create container DIV.
      chartContainer = document.createElement('div');
      chartContainer.id = 'chart';
      chartContainer.style.height = '100px';
      chartContainer.style.width = '500px';
      (chartContainer as any).addEventListener = (
        type: string,
        listener: EventListener
      ) => {
        listeners[type] = listener;
      };
      document.body.innerHTML = '';
      document.body.appendChild(chartContainer);
    });

    it('should initialize with a Tooltip plugin', () => {
      const chart = new PieChart(
        chartContainer,
        {
          labels: ['Bananas', 'Apples', 'Grapes'],
          series: [20, 15, 40]
        },
        {
          labelInterpolationFnc: value => String(value)[0],
          plugins: [ChartistPluginTooltip]
        }
      );

      chart.initialize();

      expect(chartContainer?.innerHTML).not.toEqual('');
    });

    it('should generate the tooltip element', () => {
      tooltip = document.body.querySelector('.chartist-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should append the tooltip to the body by default', () => {
      expect(tooltip?.parentElement).toBe(document.body);
    });

    it('should hide the tooltip', () => {
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should not show tooltip on mouse enter', () => {
      listeners.mouseover({
        target: chartContainer as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should show tooltip with mouse over a point', () => {
      listeners.mouseover({
        target: chartContainer.querySelector('.ct-slice-pie') as EventTarget,
        pageX: 150,
        pageY: 160
      } as MouseEvent);
      expect(tooltip?.classList).toContain('tooltip-show');
    });

    it('should generate tooltip content', () => {
      expect(tooltip?.innerHTML).toEqual(
        '<span class="chartist-tooltip-value">20</span>'
      );
    });

    it('should set tooltip position', () => {
      expect(tooltip?.style.left).toBe('150px');
      expect(tooltip?.style.top).toBe('140px');
    });

    it('should hide tooltip on mouse leave', () => {
      listeners.mouseout({
        target: chartContainer.querySelector('.ct-slice-pie') as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });
  });

  describe('for PieChart (Donut)', () => {
    let chartContainer: HTMLElement;
    let tooltip: HTMLElement | null;
    const listeners: { [key: string]: EventListener } = {};

    beforeAll(() => {
      // Create container DIV.
      chartContainer = document.createElement('div');
      chartContainer.id = 'chart';
      chartContainer.style.height = '100px';
      chartContainer.style.width = '500px';
      (chartContainer as any).addEventListener = (
        type: string,
        listener: EventListener
      ) => {
        listeners[type] = listener;
      };
      document.body.innerHTML = '';
      document.body.appendChild(chartContainer);
    });

    it('should initialize with a Tooltip plugin', () => {
      const chart = new PieChart(
        chartContainer,
        {
          series: [20, 10, 30, 40]
        },
        {
          donut: true,
          donutWidth: 60,
          startAngle: 270,
          showLabel: true,
          plugins: [ChartistPluginTooltip]
        }
      );

      chart.initialize();

      expect(chartContainer?.innerHTML).not.toEqual('');
    });

    it('should generate the tooltip element', () => {
      tooltip = document.body.querySelector('.chartist-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should append the tooltip to the body by default', () => {
      expect(tooltip?.parentElement).toBe(document.body);
    });

    it('should hide the tooltip', () => {
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should not show tooltip on mouse enter', () => {
      listeners.mouseover({
        target: chartContainer as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should show tooltip with mouse over a point', () => {
      listeners.mouseover({
        target: chartContainer.querySelector('.ct-slice-donut') as EventTarget,
        pageX: 150,
        pageY: 160
      } as MouseEvent);
      expect(tooltip?.classList).toContain('tooltip-show');
    });

    it('should generate tooltip content', () => {
      expect(tooltip?.innerHTML).toEqual(
        '<span class="chartist-tooltip-value">20</span>'
      );
    });

    it('should set tooltip position', () => {
      expect(tooltip?.style.left).toBe('150px');
      expect(tooltip?.style.top).toBe('140px');
    });

    it('should hide tooltip on mouse leave', () => {
      listeners.mouseout({
        target: chartContainer.querySelector('.ct-slice-donut') as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });
  });

  describe('with custom options', () => {
    let chartContainer: HTMLElement;
    let tooltip: HTMLElement | null;
    const listeners: { [key: string]: EventListener } = {};

    beforeAll(() => {
      // Create container DIV.
      chartContainer = document.createElement('div');
      chartContainer.id = 'chart';
      chartContainer.style.height = '100px';
      chartContainer.style.width = '500px';
      (chartContainer as any).addEventListener = (
        type: string,
        listener: EventListener
      ) => {
        listeners[type] = listener;
      };
      document.body.innerHTML = '';
      document.body.appendChild(chartContainer);
    });

    it('should initialize with a Tooltip plugin', () => {
      const chart = new LineChart(
        chartContainer,
        {
          labels: [1, 2, 3, 4, 5, 6, 7, 8],
          series: [[5, 9, 7, 8, 5, 3, 5, 4]]
        },
        {
          low: 0,
          showArea: true,
          plugins: [
            [
              ChartistPluginTooltip,
              {
                tooltipOffset: {
                  x: 13,
                  y: 37
                },
                anchorToPoint: true,
                appendToBody: false,
                class: 'my-tooltip',
                pointClass: 'ct-point',
                transformTooltipTextFnc: (value: string): string =>
                  '$ ' + value + '.00'
              }
            ]
          ]
        }
      );

      chart.initialize();
      expect(chartContainer?.innerHTML).not.toEqual('');
    });

    it('should generate the tooltip element', () => {
      tooltip = document.body.querySelector('.chartist-tooltip');
      expect(tooltip).not.toBeNull();
    });

    it('should append the tooltip to the chart container', () => {
      expect(tooltip?.parentElement).toBe(chartContainer);
    });

    it('should hide the tooltip', () => {
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should not show tooltip on mouse enter', () => {
      listeners.mouseover({
        target: chartContainer as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });

    it('should show tooltip with mouse over a point', () => {
      listeners.mouseover({
        target: chartContainer.querySelector('.ct-point') as EventTarget,
        pageX: 100,
        pageY: 200
      } as MouseEvent);
      expect(tooltip?.classList).toContain('tooltip-show');
    });

    it('should generate tooltip content', () => {
      expect(tooltip?.innerHTML).toEqual(
        '<span class="chartist-tooltip-value">$ 5.00</span>'
      );
    });

    it('should set tooltip position', () => {
      expect(tooltip?.style.left).toBe('113px');
      expect(tooltip?.style.top).toBe('237px');
    });

    it('should hide tooltip on mouse leave', () => {
      listeners.mouseout({
        target: chartContainer.querySelector('.ct-point') as EventTarget
      } as MouseEvent);
      expect(tooltip?.classList).not.toContain('tooltip-show');
    });
  });
});
