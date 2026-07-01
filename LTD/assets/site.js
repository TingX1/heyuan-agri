function createPlaceholderImage(label, theme) {
  const palettes = {
    banner: { sky: "#d9f1da", field: "#7aad5a", deep: "#2f6135", accent: "#f0d28b" },
    about: { sky: "#e6f4de", field: "#93be69", deep: "#40693d", accent: "#f2d79d" },
    news: { sky: "#eef6d9", field: "#86b967", deep: "#446c40", accent: "#e8c56d" },
    base: { sky: "#dff1dd", field: "#78ad5b", deep: "#345e38", accent: "#f3d58f" },
    product: { sky: "#f6f1da", field: "#c0a35f", deep: "#6f5b2b", accent: "#8eb667" },
    tour: { sky: "#e3f2dc", field: "#8dbd76", deep: "#436846", accent: "#f2d38a" },
    contact: { sky: "#edf3ee", field: "#cfdccf", deep: "#6f8671", accent: "#d9e7da" }
  };

  const colors = palettes[theme] || palettes.about;
  const safeLabel = String(label || "和缘农业图片");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720">
      <defs>
        <linearGradient id="bg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${colors.sky}" />
          <stop offset="100%" stop-color="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="1200" height="720" fill="url(#bg)" />
      <circle cx="930" cy="150" r="72" fill="${colors.accent}" fill-opacity="0.92" />
      <path d="M0 450 C140 360 300 350 450 430 C610 515 760 520 930 430 C1030 378 1115 364 1200 392 L1200 720 L0 720 Z" fill="${colors.field}" />
      <path d="M0 540 C180 460 330 472 470 540 C620 612 820 620 1200 510 L1200 720 L0 720 Z" fill="${colors.deep}" />
      <text x="76" y="574" font-size="52" font-family="'Microsoft YaHei', Arial, sans-serif" fill="#ffffff">${safeLabel}</text>
      <text x="76" y="636" font-size="24" font-family="'Microsoft YaHei', Arial, sans-serif" fill="rgba(255,255,255,0.92)">和缘农业品牌视觉示意</text>
    </svg>
  `;

  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

document.querySelectorAll("img[data-fallback-label]").forEach((img) => {
  const configuredSrc = img.getAttribute("data-src");
  const fallbackSrc = createPlaceholderImage(img.dataset.fallbackLabel, img.dataset.theme);

  img.addEventListener("error", () => {
    if (img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    }
  }, { once: true });

  img.src = configuredSrc || fallbackSrc;
});

const todayNode = document.getElementById("today");
if (todayNode) {
  const today = new Date();
  const weekMap = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  todayNode.textContent =
    today.getFullYear() + "年" +
    String(today.getMonth() + 1).padStart(2, "0") + "月" +
    String(today.getDate()).padStart(2, "0") + "日 " +
    weekMap[today.getDay()];
}
