(function () {
  // Apply padding from data attributes
  function applyPadding() {
    document.querySelectorAll('[data-pt]').forEach(el => {
      el.style.paddingTop = el.getAttribute('data-pt');
    });
    document.querySelectorAll('[data-pb]').forEach(el => {
      el.style.paddingBottom = el.getAttribute('data-pb');
    });
    document.querySelectorAll('[data-pl]').forEach(el => {
      el.style.paddingLeft = el.getAttribute('data-pl');
    });
    document.querySelectorAll('[data-pr]').forEach(el => {
      el.style.paddingRight = el.getAttribute('data-pr');
    });
  }

  // Apply margin from data attributes
  function applyMargin() {
    document.querySelectorAll('[data-mt]').forEach(el => {
      el.style.marginTop = el.getAttribute('data-mt');
    });
    document.querySelectorAll('[data-mb]').forEach(el => {
      el.style.marginBottom = el.getAttribute('data-mb');
    });
    document.querySelectorAll('[data-ml]').forEach(el => {
      el.style.marginLeft = el.getAttribute('data-ml');
    });
    document.querySelectorAll('[data-mr]').forEach(el => {
      el.style.marginRight = el.getAttribute('data-mr');
    });
  }

  // Apply text-align from data attribute
  function applyTextAlign() {
    document.querySelectorAll('[data-ta]').forEach(el => {
      const val = el.getAttribute('data-ta');
      if (['left', 'right', 'center', 'justify'].includes(val)) {
        el.style.textAlign = val;
      }
    });
  }

  // Apply custom width and height from data attributes and class syntax
  function applyWidthHeight() {
    const allElements = document.querySelectorAll('*');

    allElements.forEach(el => {
      // Data attribute width/height
      if (el.hasAttribute('data-w')) {
        el.style.width = el.getAttribute('data-w');
      }
      if (el.hasAttribute('data-h')) {
        el.style.height = el.getAttribute('data-h');
      }

      // Class-based custom width/height like w-[300px], h-[50vh]
      el.classList.forEach(cls => {
        const widthMatch = cls.match(/^w-\[(.+)\]$/);
        const heightMatch = cls.match(/^h-\[(.+)\]$/);

        if (widthMatch) {
          el.style.width = widthMatch[1];
        }
        if (heightMatch) {
          el.style.height = heightMatch[1];
        }
      });
    });
  }

  // Apply CSS variable overrides globally from data attributes on <html> or <body>
  function applyGlobalCSSVariables() {
    // Target <html> and <body> only, can extend if needed
    ['html', 'body'].forEach(selector => {
      const el = document.querySelector(selector);
      if (!el) return;

      Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('data-')) {
          // Convert data attribute to CSS variable name
          // e.g. data-color-primary => --color-primary
          const cssVarName = '--' + attr.name.slice(5).replace(/_/g, '-');
          document.documentElement.style.setProperty(cssVarName, attr.value);
        }
      });
    });
  }

  // Extend class-based utilities for arbitrary padding and margin shorthand classes
  function applyArbitrarySpacing() {
    const propMap = {
      'p': 'padding',
      'pt': 'paddingTop',
      'pb': 'paddingBottom',
      'pl': 'paddingLeft',
      'pr': 'paddingRight',
      'px': ['paddingLeft', 'paddingRight'],
      'py': ['paddingTop', 'paddingBottom'],

      'm': 'margin',
      'mt': 'marginTop',
      'mb': 'marginBottom',
      'ml': 'marginLeft',
      'mr': 'marginRight',
      'mx': ['marginLeft', 'marginRight'],
      'my': ['marginTop', 'marginBottom'],
    };

    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(cls => {
        const match = cls.match(/^([mp][trblxy]?)-\[(.+)\]$/);
        if (match) {
          const prefix = match[1];
          const value = match[2];
          const props = propMap[prefix];
          if (Array.isArray(props)) {
            props.forEach(p => el.style[p] = value);
          } else {
            el.style[props] = value;
          }
        }
      });
    });
  }

  // Extend class-based utilities for border-radius, shadows, colors, text colors
  function applyExtendedStyles() {
    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(cls => {
        // Border radius e.g. rd-[10px]
        if (cls.startsWith('rd-[') && cls.endsWith(']')) {
          el.style.borderRadius = cls.slice(8, -1);
        }

        // Box shadow e.g. sd-[0_10px_15px_rgba(0,0,0,0.3)]
        if (cls.startsWith('sd-[') && cls.endsWith(']')) {
          const shadowValue = cls.slice(7, -1).replace(/_/g, ' ');
          el.style.boxShadow = shadowValue;
        }

        // Background color e.g. bg-[var(--color-primary)] or bg-[#ff0000]
        if (cls.startsWith('bg-[') && cls.endsWith(']')) {
          el.style.backgroundColor = cls.slice(3, -1);
          // If scatter-point, also add box-shadow glow effect
          if (el.classList.contains('scatter-point')) {
            el.style.boxShadow = `0 0 6px ${cls.slice(3, -1)}`;
          }
        }

        // Text color e.g. text-[var(--color-primary)] or text-[#333333]
        if (cls.startsWith('text-[') && cls.endsWith(']')) {
          el.style.color = cls.slice(5, -1);
        }
      });
    });
  }

  // Apply custom colors and styles for charts (existing)
  function applyChartUtilities() {
    document.querySelectorAll('[data-bgcolor]').forEach(el => {
      el.style.backgroundColor = el.getAttribute('data-bgcolor');
    });

    document.querySelectorAll('[data-height]').forEach(el => {
      el.style.height = el.getAttribute('data-height');
    });

    document.querySelectorAll('[data-stroke]').forEach(el => {
      el.style.stroke = el.getAttribute('data-stroke'); // for SVG lines
    });

    // For scatter points, allow custom color via data attribute
    document.querySelectorAll('.scatter-point[data-color]').forEach(el => {
      const color = el.getAttribute('data-color');
      el.style.backgroundColor = color;
      el.style.boxShadow = `0 0 6px ${color}`;
    });
  }

  // Extend class-based utilities for chart-specific styles (existing)
  function applyClassBasedChartStyles() {
    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(cls => {
        // background-color, e.g., bg-[#ff5722]
        if (cls.startsWith('bg-[') && cls.endsWith(']')) {
          const color = cls.slice(4, -1);
          el.style.backgroundColor = color;
          if (el.classList.contains('scatter-point')) {
            el.style.boxShadow = `0 0 6px ${color}`;
          }
        }

        // height, e.g., h-[180px]
        if (cls.startsWith('h-[') && cls.endsWith(']')) {
          const height = cls.slice(3, -1);
          el.style.height = height;
        }

        // stroke color for SVG paths, e.g., stroke-[#ff5722]
        if (cls.startsWith('stroke-[') && cls.endsWith(']')) {
          const strokeColor = cls.slice(7, -1);
          el.style.stroke = strokeColor;
        }

        // width, e.g., w-[250px]
        if (cls.startsWith('w-[') && cls.endsWith(']')) {
          const width = cls.slice(3, -1);
          el.style.width = width;
        }

        // gap, e.g., gap-[1.5rem]
        if (cls.startsWith('gap-[') && cls.endsWith(']')) {
          const gap = cls.slice(5, -1);
          el.style.gap = gap;
        }

        // z-index, e.g., z-[999]
        if (cls.startsWith('z-[') && cls.endsWith(']')) {
          const zIndex = cls.slice(3, -1);
          el.style.zIndex = zIndex;
        }
      });
    });
  }

  // Apply custom gradient backgrounds from data attributes and class names
  function applyCustomGradients() {
    // From data-gradient attribute
    document.querySelectorAll('[data-gradient]').forEach(el => {
      el.style.backgroundImage = el.getAttribute('data-gradient');
    });

    // From class names, e.g. gradient-linear-45deg-[#ff0000_#00ff00]
    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(cls => {
        const gradientRegex = /^gradient-(linear|radial)-([\w\d]+)-\[(.+)\]$/;
        const match = cls.match(gradientRegex);
        if (match) {
          const type = match[1];           // linear or radial
          const direction = match[2];      // e.g. 45deg, circle, 90deg
          const colorsRaw = match[3];      // e.g. #ff0000_#00ff00_#0000ff
          const colors = colorsRaw.split('_').join(', ');

          let gradientValue = '';
          if (type === 'linear') {
            gradientValue = `linear-gradient(${direction}, ${colors})`;
          } else if (type === 'radial') {
            // direction like 'circle' or 'circle at top left' etc.
            gradientValue = `radial-gradient(${direction}, ${colors})`;
          }
          el.style.backgroundImage = gradientValue;
        }
      });
    });
  }

  // Initialize all utility functions
  function initUtilities() {
    applyPadding();
    applyMargin();
    applyTextAlign();
    applyWidthHeight();

    applyGlobalCSSVariables();

    applyArbitrarySpacing();
    applyExtendedStyles();

    applyChartUtilities();
    applyClassBasedChartStyles();

    applyCustomGradients();  // <-- Added here
  }

  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUtilities);
  } else {
    initUtilities();
  }
})();

function toggleDarkMode() {
  document.getElementById('docBody').classList.toggle('dark-mode');
}
