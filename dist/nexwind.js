
(function () {
  const classParsers = [
    {
      regex: /^([mp][trblxy]?)-\[(.+)\]$/,
      apply: (el, match) => {
        const map = {
          p: "padding", pt: "paddingTop", pb: "paddingBottom",
          pl: "paddingLeft", pr: "paddingRight",
          px: ["paddingLeft", "paddingRight"],
          py: ["paddingTop", "paddingBottom"],
          m: "margin", mt: "marginTop", mb: "marginBottom",
          ml: "marginLeft", mr: "marginRight",
          mx: ["marginLeft", "marginRight"],
          my: ["marginTop", "marginBottom"],gap:["gap"],
        };
        const prop = map[match[1]];
        const value = match[2];
        if (Array.isArray(prop)) prop.forEach(p => el.style[p] = value);
        else el.style[prop] = value;
      }
    },
    {
      regex: /^w-\[(.+)\]$/,
      apply: (el, match) => el.style.width = match[1]
    },
    {
      regex: /^h-\[(.+)\]$/,
      apply: (el, match) => el.style.height = match[1]
    },
    {
      regex: /^bg-\[(.+)\]$/,
      apply: (el, match) => {
        el.style.backgroundColor = match[1];
        if (el.classList.contains("scatter-point")) {
          el.style.boxShadow = `0 0 6px ${match[1]}`;
        }
      }
    },
    {
      regex: /^tc-\[(.+)\]$/,
      apply: (el, match) => el.style.color = match[1]
    },
    {
      regex: /^border-\[(.+)\]$/,
      apply: (el, match) => el.style.border = match[1].replace(/_/g, ' ')
    },
    {
      regex: /^rd-\[(.+)\]$/,
      apply: (el, match) => el.style.borderRadius = match[1]
    },
    {
      regex: /^sd-\[(.+)\]$/,
      apply: (el, match) => el.style.boxShadow = match[1].replace(/_/g, ' ')
    },
    {
      regex: /^fs-\[(.+)\]$/,
      apply: (el, match) => el.style.fontSize = match[1]
    },
    {
      regex: /^z-\[(.+)\]$/,
      apply: (el, match) => el.style.zIndex = match[1]
    },
    {
      regex: /^op-\[(.+)\]$/,
      apply: (el, match) => el.style.opacity = match[1]
    },
    {
      regex: /^lh-\[(.+)\]$/,
      apply: (el, match) => el.style.lineHeight = match[1]
    },
    {
      regex: /^ls-\[(.+)\]$/,
      apply: (el, match) => el.style.letterSpacing = match[1]
    },
     
  
    
    {
      regex: /^gradient-(linear|radial)-([\w\d]+)-\[(.+)\]$/,
      apply: (el, match) => {
        const type = match[1];
        const direction = match[2];
        const colors = match[3].split('_').join(', ');
        el.style.backgroundImage = type === 'linear'
          ? `linear-gradient(${direction}, ${colors})`
          : `radial-gradient(${direction}, ${colors})`;
      }
    }
  ];

  function applyDynamicClasses() {
    document.querySelectorAll('*').forEach(el => {
      el.classList.forEach(cls => {
        classParsers.forEach(({ regex, apply }) => {
          const match = cls.match(regex);
          if (match) apply(el, match);
        });
      });
    });
  }

  function applyDataAttributes() {
    const props = {
      pt: 'paddingTop', pb: 'paddingBottom',
      pl: 'paddingLeft', pr: 'paddingRight',
      mt: 'marginTop', mb: 'marginBottom',
      ml: 'marginLeft', mr: 'marginRight',
      w: 'width', h: 'height', ta: 'textAlign',
      fs: 'fontSize', lh: 'lineHeight',
      op: 'opacity'
    };

    document.querySelectorAll('*').forEach(el => {
      Object.keys(props).forEach(key => {
        const attr = `data-${key}`;
        if (el.hasAttribute(attr)) {
          el.style[props[key]] = el.getAttribute(attr);
        }
      });
    });
  }

  function applyGlobalCSSVars() {
    ['html', 'body'].forEach(tag => {
      const el = document.querySelector(tag);
      if (el) {
        Array.from(el.attributes).forEach(attr => {
          if (attr.name.startsWith('data-')) {
            const varName = '--' + attr.name.slice(5).replace(/_/g, '-');
            document.documentElement.style.setProperty(varName, attr.value);
          }
        });
      }
    });
  }

  function initNexwind() {
    applyDataAttributes();
    applyGlobalCSSVars();
    applyDynamicClasses();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', initNexwind)
    : initNexwind();
})();

function toggleDarkMode() {
  document.getElementById('docBody')?.classList.toggle('dark-mode');
}