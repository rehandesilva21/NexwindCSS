// utilities-extended.js

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

  // Initialize all utility functions
  function initUtilities() {
    applyPadding();
    applyMargin();
    applyTextAlign();
    applyWidthHeight();
  }

  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUtilities);
  } else {
    initUtilities();
  }
})();

// Example dynamic generator to allow arbitrary font sizes like Tailwind's [text-[2.5vh]]
document.querySelectorAll('[class*="text-["]').forEach(el => {
  const classList = [...el.classList];
  classList.forEach(cls => {
    const match = cls.match(/^text-\[(.+)\]$/);
    if (match) {
      const value = match[1];
      el.style.fontSize = value;
    }
  });
});
