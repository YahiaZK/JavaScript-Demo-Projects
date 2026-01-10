const dataList = [
  {
    badge: "developer",
    image: "images/developer.jpg",
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    badge: "designer",
    image: "images/designer.jpg",
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    badge: "editor",
    image: "images/editor.jpg",
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    badge: "gamer",
    image: "images/gamer.jpg",
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    badge: "marketer",
    image: "images/marketer.jpg",
    title: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const cardList = document.querySelector(".card-list");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");
const paginationContainer = document.querySelector(".slider-pagination");

cardList.innerHTML = dataList
  .map((data) => {
    return `<li class="card-item">
            <a href="#" class="card-link">
              <img
                src="${data.image}"
                alt="Card image"
                class="card-image"
              />
              <p class="badge ${data.badge}">${data.badge}</p>
              <h2 class="card-title">
                ${data.title}
              </h2>
              <button class="card-button material-symbols-rounded">
                arrow_forward
              </button>
            </a>
          </li>
  `;
  })
  .join("");

const setupPagination = () => {
  paginationContainer.innerHTML = "";
  // Create a dot for every item (or group of items depending on view)
  dataList.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("pagination-dot");
    if (index === 0) dot.classList.add("active");

    // Click dot to scroll to specific card
    dot.addEventListener("click", () => {
      const cardWidth = cardList.querySelector(".card-item").offsetWidth + 20; // width + gap
      cardList.scrollTo({ left: index * cardWidth, behavior: "smooth" });
      updateActiveDot(index);
    });
    paginationContainer.appendChild(dot);
  });
};

const updateActiveDot = (index) => {
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach((dot) => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
};

setupPagination();

// 3. Button Click Logic
const initSlideButtons = () => {
  const cardItem = cardList.querySelector(".card-item");
  const cardWidth = cardItem.offsetWidth + 20; // Card width + gap (20px)

  nextBtn.addEventListener("click", () => {
    cardList.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    cardList.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
};

// 4. Drag / Swipe Logic (Mouse & Touch)
let isDragging = false;
let startX, startScrollLeft;

const dragStart = (e) => {
  isDragging = true;
  cardList.classList.add("dragging");
  // Record initial cursor position (mouse or touch)
  startX = e.pageX || e.touches[0].pageX;
  startScrollLeft = cardList.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  // Calculate new position
  const x = e.pageX || e.touches[0].pageX;
  const dist = x - startX;

  // Update scroll position (disable smooth behavior for direct 1:1 movement)
  cardList.style.scrollBehavior = "auto";
  cardList.scrollLeft = startScrollLeft - dist;
};

const dragStop = () => {
  isDragging = false;
  cardList.classList.remove("dragging");
  cardList.style.scrollBehavior = "smooth";
};

// 5. Update UI on Scroll (Infinite logic not applied here, just bound checking)
const handleScrollUI = () => {
  const cardWidth = cardList.querySelector(".card-item").offsetWidth + 20;
  const maxScrollLeft = cardList.scrollWidth - cardList.clientWidth;

  // Disable buttons at edges
  prevBtn.style.display = cardList.scrollLeft <= 0 ? "none" : "flex";
  nextBtn.style.display =
    cardList.scrollLeft >= maxScrollLeft - 10 ? "none" : "flex";

  // Update Pagination based on scroll position
  const activeIndex = Math.round(cardList.scrollLeft / cardWidth);
  updateActiveDot(activeIndex);
};

// Event Listeners
cardList.addEventListener("mousedown", dragStart);
cardList.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

cardList.addEventListener("touchstart", dragStart);
cardList.addEventListener("touchmove", dragging);
document.addEventListener("touchend", dragStop);

cardList.addEventListener("scroll", handleScrollUI);

// Initialize
initSlideButtons();
handleScrollUI(); // Run once to set initial state
