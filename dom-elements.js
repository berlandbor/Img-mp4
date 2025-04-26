// === Канвас и контекст ===
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// === Боковая панель и кнопка ===
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

// === Загрузка и кнопки ===
const upload = document.getElementById('upload');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

// === Постеризация, Насыщенность, Прозрачность ===
const poster = document.getElementById('poster');
const posterInput = document.getElementById('posterInput');
const saturation = document.getElementById('saturation');
const saturationInput = document.getElementById('saturationInput');
const imageAlpha = document.getElementById('imageAlpha');
const imageAlphaVal = document.getElementById('imageAlphaVal');

// === Контуры ===
const edgeThreshold = document.getElementById('edgeThreshold');
const edgeInput = document.getElementById('edgeInput');
const edgeColor = document.getElementById('edgeColor');
const edgeAlpha = document.getElementById('edgeAlpha');
const alphaVal = document.getElementById('alphaVal');
const showEdgesCheckbox = document.getElementById('showEdges');
const onlyEdges = document.getElementById('onlyEdges');
const bgPicker = document.getElementById('bgPicker');
const bgColor = document.getElementById('bgColor');
const selectedColor = document.getElementById('selectedColor');
const colorTolerance = document.getElementById('colorTolerance');
const colorPosterization = document.getElementById('colorPosterization');
const colorSaturation = document.getElementById('colorSaturation');

// === Фильтрация по выбранным цветам ===
const selectedColor1 = document.getElementById('selectedColor1');
const colorTolerance1 = document.getElementById('colorTolerance1');
const colorToleranceVal1 = document.getElementById('colorToleranceVal1');
const colorPosterization1 = document.getElementById('colorPosterization1');
const colorPosterizationVal1 = document.getElementById('colorPosterizationVal1');
const colorSaturation1 = document.getElementById('colorSaturation1');
const colorSaturationVal1 = document.getElementById('colorSaturationVal1');

const selectedColor2 = document.getElementById('selectedColor2');
const colorTolerance2 = document.getElementById('colorTolerance2');
const colorToleranceVal2 = document.getElementById('colorToleranceVal2');
const colorPosterization2 = document.getElementById('colorPosterization2');
const colorPosterizationVal2 = document.getElementById('colorPosterizationVal2');
const colorSaturation2 = document.getElementById('colorSaturation2');
const colorSaturationVal2 = document.getElementById('colorSaturationVal2');

const selectedColor3 = document.getElementById('selectedColor3');
const colorTolerance3 = document.getElementById('colorTolerance3');
const colorToleranceVal3 = document.getElementById('colorToleranceVal3');
const colorPosterization3 = document.getElementById('colorPosterization3');
const colorPosterizationVal3 = document.getElementById('colorPosterizationVal3');
const colorSaturation3 = document.getElementById('colorSaturation3');
const colorSaturationVal3 = document.getElementById('colorSaturationVal3');

// === Масштаб ===
const zoomSlider = document.getElementById('zoom');
const zoomVal = document.getElementById('zoomVal');