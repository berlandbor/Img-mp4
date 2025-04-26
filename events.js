function setupEventHandlers() {
  // Загрузка изображения
  upload.addEventListener('change', handleUpload);

  // Открытие/закрытие боковой панели
  toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
  });

  // Сброс страницы
  resetBtn.addEventListener('click', () => {
    window.location.reload();
  });

  // Скачивание изображения
  downloadBtn.addEventListener('click', handleDownload);

  // === Связка ползунков и числовых полей ===

  // Постеризация
  linkSliderToInput(poster, posterInput);
  linkSliderToInput(saturation, saturationInput);
  linkSliderToInput(imageAlpha, imageAlphaVal);

  // Контуры
  linkSliderToInput(edgeThreshold, edgeInput);
  linkSliderToInput(edgeAlpha, alphaVal);

  // Цвета — 1
  selectedColor1.addEventListener('input', debouncedApplyFilter);
  linkSliderToInput(colorTolerance1, colorToleranceVal1);
  linkSliderToInput(colorPosterization1, colorPosterizationVal1);
  linkSliderToInput(colorSaturation1, colorSaturationVal1);

  // Цвета — 2
  selectedColor2.addEventListener('input', debouncedApplyFilter);
  linkSliderToInput(colorTolerance2, colorToleranceVal2);
  linkSliderToInput(colorPosterization2, colorPosterizationVal2);
  linkSliderToInput(colorSaturation2, colorSaturationVal2);

  // Цвета — 3
  selectedColor3.addEventListener('input', debouncedApplyFilter);
  linkSliderToInput(colorTolerance3, colorToleranceVal3);
  linkSliderToInput(colorPosterization3, colorPosterizationVal3);
  linkSliderToInput(colorSaturation3, colorSaturationVal3);

  // Переключение контуров
  showEdgesCheckbox.addEventListener('change', debouncedApplyFilter);
  onlyEdges.addEventListener('change', () => {
    if (onlyEdges.checked) {
      showElement(bgPicker);
    } else {
      hideElement(bgPicker);
    }
    debouncedApplyFilter();
  });

  // Масштабирование
  zoomSlider.addEventListener('input', () => {
    zoomVal.value = zoomSlider.value;
    redrawCanvas();
  });
  zoomVal.addEventListener('input', () => {
    zoomSlider.value = zoomVal.value;
    redrawCanvas();
  });
}

// === Связка ползунок <-> числовое поле ===
function linkSliderToInput(slider, input) {
  slider.addEventListener('input', () => {
    input.value = slider.value;
    debouncedApplyFilter();
  });
  input.addEventListener('input', () => {
    slider.value = input.value;
    debouncedApplyFilter();
  });
}

// === Загрузка изображения ===
function handleUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    originalImageElement = img;
    originalWidth = img.width;
    originalHeight = img.height;
    applyFilter(); // сразу применяем фильтр
  };
  img.src = URL.createObjectURL(file);
}

// === Скачивание изображения ===
function handleDownload() {
  const link = document.createElement('a');
  link.download = 'filtered_image.png';
  link.href = canvas.toDataURL();
  link.click();
}