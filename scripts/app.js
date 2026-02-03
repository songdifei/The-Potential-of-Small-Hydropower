// Loading screen initialization
window.addEventListener('load', function() {
  const loadingScreen = document.getElementById('loadingScreen');
  // After 3.5 seconds, fade out the loading screen
  setTimeout(function() {
    loadingScreen.classList.add('fade-out');
  }, 3500);
});

// 每张纸有正反两面
const sheets = [
  {
    front: {
      title: "Intro & Etymology",
      badge: "Taxonomy",
      text: "Palms (Arecaceae) trace their name to the Latin 'palma', evoking the shape of the human hand. Botanists classify them into overlapping tribes defined by frond architecture and inflorescence traits.",
    },
    back: {
      title: "Morphology",
      badge: "Leaf plan",
      text: "Most species feature pinnate or palmate leaves emerging from a crownshaft. Trunk textures range from ringed scars to armored spines depending on the genus.",
    }
  },
  {
    front: {
      title: "Range & Habitat",
      badge: "Biomes",
      text: "Palms thrive in tropical belts yet several tolerate savannas and monsoon climates. Coastal species anchor dunes while understory palms adapt to low light canopies.",
    },
    back: {
      title: "Evolution",
      badge: "Timeline",
      text: "Fossil pollen dates palms to the Late Cretaceous. Their rise paralleled angiosperm diversification, spreading alongside early frugivorous birds and mammals.",
    }
  },
  {
    front: {
      title: "Uses",
      badge: "Culture",
      text: "Beyond coconuts and dates, palms supply fibers, oils, sugars, timber, and thatch. Their silhouettes mark trade routes and ceremonial spaces globally.",
    },
    back: {
      title: "Conservation",
      badge: "Status",
      text: "Island endemics face habitat loss; sustainable harvesting and seed banks safeguard genetic diversity. Urban planting now favors drought-resistant species.",
    }
  },
  {
    front: {
      title: "Pollination",
      badge: "Reproduction",
      text: "Palm flowers attract beetles, bees, and specialized pollinators. Some species are wind-pollinated while others rely on specific insect partnerships for seed production.",
    },
    back: {
      title: "Growth Patterns",
      badge: "Development",
      text: "Most palms grow from a single apical meristem. Damage to this growing point can be fatal, unlike branching trees that regenerate from lateral buds.",
    }
  },
  {
    front: {
      title: "Fruit Types",
      badge: "Dispersal",
      text: "Palm fruits range from drupes to berries. Coconuts float across oceans while acai and açaí berries are consumed by rainforest birds and mammals.",
    },
    back: {
      title: "Root Systems",
      badge: "Anchoring",
      text: "Adventitious roots emerge from the stem base, forming dense mats. Some species develop stilt roots or pneumatophores in waterlogged soils.",
    }
  },
  {
    front: {
      title: "Climate Adaptation",
      badge: "Resilience",
      text: "Desert palms minimize water loss through waxy cuticles and reduced transpiration. Mountain species tolerate frost through cold-hardiness mechanisms.",
    },
    back: {
      title: "Future Research",
      badge: "Science",
      text: "Genomic studies reveal palm evolution and stress tolerance. Climate models predict range shifts as researchers work to preserve threatened populations.",
    }
  },
];

const stage = document.getElementById("stage");

let rotationY = 0;
let tiltX = 0;
let radius = 0;
let sceneScale = 1;
let isDragging = false;
let dragStart = { x: 0, y: 0, rotationAtStart: 0, tiltAtStart: 0 };

// 从 assets/page_test 加载每一页需要展示的图片（顺序对应页码）
const pageImages = [
  "assets/page_test/test-01.jpg",
  "assets/page_test/test-02.jpg",
  "assets/page_test/test-03.jpg",
  "assets/page_test/test-04.jpg",
  "assets/page_test/test-05.jpg",
  "assets/page_test/test-06.jpg",
  "assets/page_test/test-07.jpg",
  "assets/page_test/test-08.jpg",
  "assets/page_test/test-09.jpg",
  "assets/page_test/test-10.jpg",
  "assets/page_test/test-11.jpg",
  "assets/page_test/test-12.jpg",
];

// 将页面索引映射为从左到右的阅读顺序（保持 page1 位置不变，使其右侧位置为 page2）
// 顺序为：1→2 映射到 [idx 0, 3]，随后 3→4 映射到 [2, 5]，依次类推
const readingOrder = [0, 3, 2, 5, 4, 7, 6, 9, 8, 11, 10, 1];

function getImageIndexForPage(pageIdx) {
  const pos = readingOrder.indexOf(pageIdx);
  return pos === -1 ? pageIdx : pos;
}

function createPageContent(item, index, total) {
  const imgIdx = getImageIndexForPage(index);
  const src = pageImages[imgIdx];
  return `
    <img src="${src}" alt="Page ${index + 1}" draggable="false" data-page-index="${index}" data-page-src="${src}" style="width:100%; height:100%; object-fit: contain; cursor: pointer;" />
  `;
}

function createSheet(sheet, sheetIndex) {
  // 创建一个容器包含正反两面
  const container = document.createElement("div");
  container.className = "sheet";
  
  // 正面
  const front = document.createElement("article");
  front.className = "page page-front";
  front.innerHTML = createPageContent(sheet.front, sheetIndex * 2, sheets.length * 2);
  
  // 反面
  const back = document.createElement("article");
  back.className = "page page-back";
  back.innerHTML = createPageContent(sheet.back, sheetIndex * 2 + 1, sheets.length * 2);
  
  container.appendChild(front);
  container.appendChild(back);
  
  return container;
}

function populate() {
  sheets.forEach((sheet, i) => {
    const sheetEl = createSheet(sheet, i);
    stage.appendChild(sheetEl);
  });

  sprinkleSparkles();
  createGeneratorCore();
  updateTransforms();
}

function sprinkleSparkles() {
  const total = 14;
  for (let i = 0; i < total; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = `${Math.random() * 88 + 6}%`;
    s.style.top = `${Math.random() * 70 + 8}%`;
    s.style.animationDelay = `${Math.random() * 2}s`;
    stage.parentElement.appendChild(s);
  }
}

function createGeneratorCore() {
  const core = document.getElementById("generatorCore");
  
  // 创建发电机外壳
  const housing = document.createElement("div");
  housing.className = "generator-housing";
  
  // 创建中心轴
  const shaft = document.createElement("div");
  shaft.className = "generator-shaft";
  
  // 组装发电机
  housing.appendChild(shaft);
  
  core.appendChild(housing);
}

function updateTransforms() {
  stage.style.transform = `scale(${sceneScale}) rotateX(${tiltX}deg) rotateY(${rotationY}deg)`;
  const sheetEls = stage.querySelectorAll(".sheet");
  const totalPages = sheets.length * 2;
  const step = 360 / totalPages;

  sheetEls.forEach((sheet, idx) => {
    // 每张纸占据两个页面位置
    const baseAngle = idx * 2 * step;
    sheet.style.transformStyle = "preserve-3d";
    sheet.style.transform = `translate(-100%, -50%) rotateY(${baseAngle}deg) translateZ(${radius}px)`;
    
    // 正面（不需要额外旋转）
    const front = sheet.querySelector(".page-front");
    front.style.transform = "rotateY(0deg)";
    
    // 反面（旋转180度）
    const back = sheet.querySelector(".page-back");
    back.style.transform = "rotateY(180deg)";
  });
}


// 已移除导航交互（focusSection、setActive）以禁用右侧导航

function handlePointerDown(e) {
  e.preventDefault();
  isDragging = true;
  dragStart = {
    x: e.clientX,
    y: e.clientY,
    rotationAtStart: rotationY,
    tiltAtStart: tiltX,
  };
  window.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("pointerup", handlePointerUp);
}

function handlePointerMove(e) {
  if (!isDragging) return;
  const dx = e.clientX - dragStart.x;
  rotationY = dragStart.rotationAtStart + dx * 0.35;
  tiltX = 0;
  updateTransforms();
}

function handlePointerUp() {
  isDragging = false;
  window.removeEventListener("pointermove", handlePointerMove);
  window.removeEventListener("pointerup", handlePointerUp);
}

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

stage.addEventListener("pointerdown", handlePointerDown);
// 禁用元素的原生拖拽（尤其是图片）
stage.addEventListener("dragstart", (e) => e.preventDefault());

// Modal functionality
const pageModal = document.getElementById("pageModal");
const modalOverlay = pageModal.querySelector(".modal-overlay");
const modalClose = pageModal.querySelector(".modal-close");
const modalImage = document.getElementById("modalImage");

function openModal(imageSrc) {
  modalImage.src = imageSrc;
  pageModal.classList.add("active");
  document.body.style.overflow = "hidden";
  
  // Wait for image to load and calculate proper dimensions
  modalImage.onload = function() {
    const imgWidth = this.naturalWidth;
    const imgHeight = this.naturalHeight;
    const aspectRatio = imgWidth / imgHeight;
    
    // Height is fixed at 80vh
    const containerHeight = window.innerHeight * 0.8;
    const containerWidth = containerHeight * aspectRatio;
    
    // Check if width exceeds max width (90vw), if so adjust
    const maxWidth = window.innerWidth * 0.9;
    if (containerWidth > maxWidth) {
      const adjustedHeight = maxWidth / aspectRatio;
      modalImage.style.height = adjustedHeight + 'px';
      modalImage.style.width = 'auto';
    } else {
      modalImage.style.height = containerHeight + 'px';
      modalImage.style.width = 'auto';
    }
  };
}

function closeModal() {
  pageModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalOverlay.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && pageModal.classList.contains("active")) {
    closeModal();
  }
});

// Page click handler for modal
stage.addEventListener("click", (e) => {
  if (isDragging) return;
  
  // Check if click is within a page container
  const pageElement = e.target.closest(".page");
  if (pageElement) {
    const img = pageElement.querySelector("img");
    if (img) {
      const imageSrc = img.getAttribute("data-page-src");
      if (imageSrc) {
        openModal(imageSrc);
      }
    }
  }
});

document.addEventListener("keydown", (e) => {
  const totalPages = sheets.length * 2;
  if (e.key === "ArrowLeft") {
    rotationY += 360 / totalPages;
  } else if (e.key === "ArrowRight") {
    rotationY -= 360 / totalPages;
  }
  updateTransforms();
});

function resizeScene() {
  const gutter = 80;
  const availableW = Math.max(320, window.innerWidth - gutter);
  const availableH = Math.max(320, window.innerHeight - gutter);
  
  // 根据窗口大小动态设置页面尺寸（保持 4:5 比例）
  const aspectRatio = 4 / 5;
  let newPageWidth, newPageHeight;
  
  if (availableW / availableH > aspectRatio) {
    // 窗口更宽，以高度为基准
    newPageHeight = availableH * 0.75;
    newPageWidth = newPageHeight * aspectRatio;
  } else {
    // 窗口更窄，以宽度为基准
    newPageWidth = availableW * 0.45;
    newPageHeight = newPageWidth / aspectRatio;
  }
  
  // 更新 CSS 变量
  document.documentElement.style.setProperty('--page-width', `${newPageWidth}px`);
  document.documentElement.style.setProperty('--page-height', `${newPageHeight}px`);
  
  sceneScale = 1.1;
  updateTransforms();
}

window.addEventListener("resize", resizeScene);

populate();
resizeScene();
