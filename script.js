
document.addEventListener("DOMContentLoaded", function () {
  // App state
  const state = {
    mobileMenuOpen: false,
    dropdownUPT: false,
    dropdownBerita: false,
    showLoginModal: false,
    newsItems: [
      {
        title: "Berita 1: Pengumuman Penerimaan Pegawai 2024",
        date: "2024-01-15",
        img: "https://placehold.co/600x400",
      },
      {
        title: "Berita 2: Launching Program Smart City",
        date: "2024-01-10",
        img: "https://placehold.co/600x400",
      },
      {
        title: "Berita 3: Kunjungan Kerja Kepala Dinas",
        date: "2024-01-05",
        img: "https://placehold.co/600x400",
      },
    ],
  };

  // DOM Elements
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const loginButton = document.getElementById("login-button");
  const loginModal = document.getElementById("login-modal");
  const cancelLoginButton = document.getElementById("cancel-login");
  const loginForm = document.getElementById("login-form");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const newsContainer = document.getElementById("news-container");
  const paginationLinks = document.querySelectorAll(".pagination-link");
  const paginationPrev = document.querySelector(".pagination-prev");
  const paginationNext = document.querySelector(".pagination-next");

  // Initialize the app
  function init() {
    renderNewsItems();
    setupEventListeners();
    setupPagination();
  }

  // Render news items - only if we're on the berita page
  function renderNewsItems() {
    if (!newsContainer) return;

    // Check if news items are already rendered (static HTML)
    if (newsContainer.children.length > 0) return;

    newsContainer.innerHTML = "";

    state.newsItems.forEach((item) => {
      const newsCard = document.createElement("article");
      newsCard.className = "news-card";

      newsCard.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="news-image">
        <h3 class="news-title">${item.title}</h3>
        <p class="news-date">Tanggal: ${item.date}</p>
        <a href="#" class="news-link">Baca selengkapnya</a>
      `;

      newsContainer.appendChild(newsCard);
    });
  }

  // Setup pagination
  function setupPagination() {
    if (!paginationLinks.length) return;

    paginationLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all links
        paginationLinks.forEach((l) => l.classList.remove("active"));

        // Add active class to clicked link
        this.classList.add("active");

        // Enable/disable prev/next buttons based on current page
        const currentPage = parseInt(this.textContent);

        if (paginationPrev) {
          if (currentPage === 1) {
            paginationPrev.classList.add("pagination-disabled");
          } else {
            paginationPrev.classList.remove("pagination-disabled");
          }
        }

        if (paginationNext) {
          const totalPages = paginationLinks.length;
          if (currentPage === totalPages) {
            paginationNext.classList.add("pagination-disabled");
          } else {
            paginationNext.classList.remove("pagination-disabled");
          }
        }
      });
    });

    // Prev button
    if (paginationPrev) {
      paginationPrev.addEventListener("click", function (e) {
        e.preventDefault();

        const activeLink = document.querySelector(".pagination-link.active");
        if (!activeLink) return;

        const currentPage = parseInt(activeLink.textContent);
        if (currentPage > 1) {
          const prevLink = document.querySelector(
            `.pagination-link:nth-child(${currentPage - 1})`,
          );
          if (prevLink) {
            prevLink.click();
          }
        }
      });
    }

    // Next button
    if (paginationNext) {
      paginationNext.addEventListener("click", function (e) {
        e.preventDefault();

        const activeLink = document.querySelector(".pagination-link.active");
        if (!activeLink) return;

        const currentPage = parseInt(activeLink.textContent);
        const totalPages = paginationLinks.length;

        if (currentPage < totalPages) {
          const nextLink = document.querySelector(
            `.pagination-link:nth-child(${currentPage + 1})`,
          );
          if (nextLink) {
            nextLink.click();
          }
        }
      });
    }
  }

  // Setup event listeners
  function setupEventListeners() {
    // Mobile menu toggle
    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    }

    // Login modal
    if (loginButton) {
      loginButton.addEventListener("click", toggleLoginModal);
    }

    if (cancelLoginButton) {
      cancelLoginButton.addEventListener("click", toggleLoginModal);
    }

    if (loginForm) {
      loginForm.addEventListener("submit", handleLogin);
    }

    // Dropdown toggles
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", function (event) {
        toggleDropdown(toggle.dataset.dropdown, event);
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", function (e) {
      // Only close if click is outside dropdown and is not on the dropdown toggle
      if (
        !e.target.closest(".dropdown") &&
        !e.target.classList.contains("dropdown-toggle")
      ) {
        closeDropdowns();
      }
    });

    // Close modal when clicking outside
    if (loginModal) {
      loginModal.addEventListener("click", function (e) {
        if (e.target === loginModal) {
          toggleLoginModal();
        }
      });
    }

    // Close modal on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && state.showLoginModal) {
        toggleLoginModal();
      }
    });

    // Setup filter buttons on berita page
    const filterButtons = document.querySelectorAll(".filter-button");
    if (filterButtons.length > 0) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"));

          // Add active class to clicked button
          this.classList.add("active");

          // Here you would filter news items based on category
          // For now, we'll just log the filter
          console.log("Filter by:", this.textContent.trim());
        });
      });
    }

    // Setup search form on berita page
    const searchForm = document.querySelector(".search-form");
    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const searchInput = this.querySelector(".search-input");
        if (searchInput) {
          const searchTerm = searchInput.value.trim();
          if (searchTerm) {
            console.log("Searching for:", searchTerm);
            // Here you would implement search functionality
            alert(`Mencari: ${searchTerm}`);
          }
        }
      });
    }
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    state.mobileMenuOpen = !state.mobileMenuOpen;
    mobileMenu.classList.toggle("show", state.mobileMenuOpen);
    mobileMenuToggle.setAttribute("aria-expanded", state.mobileMenuOpen);
  }

  // Toggle login modal
  function toggleLoginModal() {
    state.showLoginModal = !state.showLoginModal;
    if (loginModal) {
      loginModal.classList.toggle("show", state.showLoginModal);

      if (state.showLoginModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
  }

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();
    // Here you would typically handle the login logic
    toggleLoginModal();
  }

  // Toggle dropdown
  function toggleDropdown(dropdown, event) {
    if (dropdown === "upt") {
      state.dropdownUPT = !state.dropdownUPT;
      state.dropdownBerita = false;
    } else if (dropdown === "berita") {
      state.dropdownBerita = !state.dropdownBerita;
      state.dropdownUPT = false;
    }

    const uptDropdown = document.getElementById("dropdown-upt");
    const beritaDropdown = document.getElementById("dropdown-berita");

    if (uptDropdown) {
      uptDropdown.classList.toggle("show", state.dropdownUPT);
    }

    if (beritaDropdown) {
      beritaDropdown.classList.toggle("show", state.dropdownBerita);
    }

    // Prevent event propagation to avoid immediate closing
    if (event) {
      event.stopPropagation();
    }
  }

  // Close all dropdowns
  function closeDropdowns() {
    state.dropdownUPT = false;
    state.dropdownBerita = false;

    const uptDropdown = document.getElementById("dropdown-upt");
    const beritaDropdown = document.getElementById("dropdown-berita");

    if (uptDropdown) {
      uptDropdown.classList.remove("show");
    }

    if (beritaDropdown) {
      beritaDropdown.classList.remove("show");
    }
  }

  // Initialize the app
  init();
});

