
# Nexwind CSS

**Nexwind CSS** is a modern, utility-first CSS framework inspired by Tailwind CSS — designed for maximum flexibility and customization. With support for arbitrary values like `px`, `%`, `vh`, and full CSS variable overrides, Nexwind offers powerful styling tools without complex setup.

---

## 🚀 Features

- ✅ Utility-first CSS classes
- 🎯 Arbitrary value support (e.g. `p-[50vh]`, `bg-[#ff0000]`, `fs-[2rem]`)
- 🎨 Custom hex colors, units, spacing, radius, and shadows
- 📱 Responsive utilities (`sm:`, `md:`, `lg:`, `xl:`)
- 🧱 Built-in layout and component classes (buttons, cards, alerts, etc.)
- 💡 JavaScript runtime for dynamic styling via data attributes and class parsing

---

## 📦 Installation

### 1. Include via CDN (Coming soon)

### 2. Manual Setup

```html
<link rel="stylesheet" href="nexwind.css">
<script src="nexwind.custom.js"></script>
```

---

## 🧪 Example Usage

```html
<div class="p-[3rem] m-[2rem] bg-[#d1fae5] text-[#065f46] rd-[20px] sd-[0_4px_12px_rgba(0,0,0,0.2)]">
  Custom styled box using Nexwind CSS!
</div>
```

```html
<button class="px-[1.5rem] py-[0.75rem] bg-[#2563eb] text-white rd-[8px]">
  Click Me
</button>
```

---

## 🎨 Data Attribute Support

```html
<div data-pt="5vh" data-w="50%" data-ta="center">Flexible content</div>
```

You can override global styles using:

```html
<body data-color-primary="#0095ff" data-font-size-base="18px">
```

---

## 🧰 Custom Utilities

| Type         | Example |
|--------------|---------|
| Padding      | `p-[20px]`, `pt-[5vh]`, `py-[10%]` |
| Margin       | `m-[2rem]`, `mb-[3vw]` |
| Width/Height | `w-[100px]`, `h-[75vh]` |
| Text Color   | `text-[#123456]` |
| Background   | `bg-[#fefefe]` |
| Radius       | `rd-[12px]` |
| Shadow       | `sd-[0_4px_10px_rgba(0,0,0,0.15)]` |
| Font Size    | `fs-[1.25rem]` |
| Gradient     | `gradient-linear-45deg-[#0ea5e9_#2563eb]` |

---

## 📚 Documentation

Coming soon on [nexwindcss.com](https://nexwindcss.com)

---

## 🧑‍💻 Author

Developed by **Quartex**

---

## 📄 License

MIT License
