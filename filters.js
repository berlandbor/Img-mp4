// === Глобальные переменные ===
let originalImageElement = null;
let originalWidth = 0;
let originalHeight = 0;

const filteredCanvas = document.createElement('canvas');
const filteredCtx = filteredCanvas.getContext('2d');

// === Применение фильтра ===
function applyFilter() {
  if (!originalImageElement) return;

  originalWidth = originalImageElement.width;
  originalHeight = originalImageElement.height;

  filteredCanvas.width = originalWidth;
  filteredCanvas.height = originalHeight;
  filteredCtx.clearRect(0, 0, originalWidth, originalHeight);

  // Рисуем оригинал
  filteredCtx.drawImage(originalImageElement, 0, 0);

  let imageData = filteredCtx.getImageData(0, 0, originalWidth, originalHeight);
  let src = imageData.data;

  // === Обычная постеризация и насыщенность ===
  const posterValue = parseInt(poster.value);
  const saturationValue = parseFloat(saturation.value);
  const alphaValue = parseInt(imageAlpha.value);

  for (let i = 0; i < src.length; i += 4) {
    const avg = (src[i] + src[i + 1] + src[i + 2]) / 3;

    src[i] = Math.floor((avg + (src[i] - avg) * saturationValue) / posterValue) * posterValue;
    src[i + 1] = Math.floor((avg + (src[i + 1] - avg) * saturationValue) / posterValue) * posterValue;
    src[i + 2] = Math.floor((avg + (src[i + 2] - avg) * saturationValue) / posterValue) * posterValue;
    src[i + 3] = alphaValue;
  }

  // === Фильтрация по выбранным цветам ===

  const colorFilters = [
    {
      color: hexToRGB(selectedColor1.value),
      tolerance: parseInt(colorTolerance1.value),
      poster: parseInt(colorPosterization1.value),
      saturation: parseFloat(colorSaturation1.value)
    },
    {
      color: hexToRGB(selectedColor2.value),
      tolerance: parseInt(colorTolerance2.value),
      poster: parseInt(colorPosterization2.value),
      saturation: parseFloat(colorSaturation2.value)
    },
    {
      color: hexToRGB(selectedColor3.value),
      tolerance: parseInt(colorTolerance3.value),
      poster: parseInt(colorPosterization3.value),
      saturation: parseFloat(colorSaturation3.value)
    }
  ];

  for (let i = 0; i < src.length; i += 4) {
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];

    for (const filter of colorFilters) {
      const dist = Math.sqrt(
        (r - filter.color.r) ** 2 +
        (g - filter.color.g) ** 2 +
        (b - filter.color.b) ** 2
      );

      if (dist < filter.tolerance) {
        const avg = (r + g + b) / 3;
        src[i] = Math.floor((avg + (r - avg) * filter.saturation) / filter.poster) * filter.poster;
        src[i + 1] = Math.floor((avg + (g - avg) * filter.saturation) / filter.poster) * filter.poster;
        src[i + 2] = Math.floor((avg + (b - avg) * filter.saturation) / filter.poster) * filter.poster;
        break; // один фильтр применился — остальные не трогаем
      }
    }
  }

  filteredCtx.putImageData(imageData, 0, 0);

  // === Контуры ===
  if (showEdgesCheckbox.checked || onlyEdges.checked) {
    applyEdgesToFiltered();
  }

  redrawCanvas();
}

// === Масштабирование ===
function redrawCanvas() {
  if (!filteredCanvas) return;

  const zoomFactor = parseFloat(zoomSlider.value);

  const displayWidth = Math.floor(originalWidth * zoomFactor);
  const displayHeight = Math.floor(originalHeight * zoomFactor);

  canvas.width = displayWidth;
  canvas.height = displayHeight;

  ctx.clearRect(0, 0, displayWidth, displayHeight);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(filteredCanvas, 0, 0, displayWidth, displayHeight);
}

// === Контуры ===
function applyEdgesToFiltered() {
  const width = filteredCanvas.width;
  const height = filteredCanvas.height;
  const imageData = filteredCtx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const gray = new Float32Array(width * height);
  for (let i = 0; i < data.length; i += 4) {
    gray[i / 4] = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
  }

  const thres = parseInt(edgeThreshold.value);
  const edgeRGB = hexToRGB(edgeColor.value);
  const edgeAlphaValue = parseInt(edgeAlpha.value);

  const edgeData = new Uint8ClampedArray(data.length);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      const gx = gray[i + 1] - gray[i - 1];
      const gy = gray[i + width] - gray[i - width];
      const mag = Math.sqrt(gx * gx + gy * gy);
      const idx = i * 4;

      if (mag > thres) {
        edgeData[idx] = edgeRGB.r;
        edgeData[idx + 1] = edgeRGB.g;
        edgeData[idx + 2] = edgeRGB.b;
        edgeData[idx + 3] = edgeAlphaValue;
      } else {
        edgeData[idx + 3] = 0;
      }
    }
  }

  const edgeImage = new ImageData(edgeData, width, height);

  if (onlyEdges.checked) {
    filteredCtx.fillStyle = bgColor.value;
    filteredCtx.fillRect(0, 0, width, height);
    filteredCtx.putImageData(edgeImage, 0, 0);
  } else {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.putImageData(edgeImage, 0, 0);

    filteredCtx.drawImage(tempCanvas, 0, 0);
  }
}