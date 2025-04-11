
document.addEventListener("DOMContentLoaded", function () {
  // App state
  const state = {
    activeTab: "beranda",
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
  const navLinks = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const footerNavLinks = document.querySelectorAll(".footer-nav-link");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  const contentTabs = document.querySelectorAll(".content-tab");
  const newsContainer = document.getElementById("news-container");

  // Initialize the app
  function init() {
    renderActiveTab();
    renderNewsItems();
    setupEventListeners();
  }

  // Render the active tab
  function renderActiveTab() {
    // Hide all tabs
    contentTabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    // Show active tab
    const activeTab = document.getElementById(`${state.activeTab}-tab`);
    if (activeTab) {
      activeTab.classList.add("active");
    }

    // Update nav links
    navLinks.forEach((link) => {
      if (link.dataset.tab === state.activeTab) {
        link.classList.add("active");
        link.style.color = "#2563eb";
      } else {
        link.classList.remove("active");
        link.style.color = "#64748b";
      }
    });
  }

  // Render news items
  function renderNewsItems() {
    if (!newsContainer) return;

    newsContainer.innerHTML = "";

    state.newsItems.forEach((item) => {
      const newsCard = document.createElement("article");
      newsCard.className = "news-card";

      newsCard.innerHTML = `
        <img src="${item.img}" alt="${item.title}" class="news-image">
        <h3 class="news-title">${item.title}</h3>
        <p class="news-date">Tanggal: ${item.date}</p>
      `;

      newsContainer.appendChild(newsCard);
    });
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

    // Tab navigation
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveTab(link.dataset.tab);
      });
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveTab(link.dataset.tab);
        toggleMobileMenu();
      });
    });

    footerNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveTab(link.dataset.tab);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });

    // Dropdown toggles
    dropdownToggles.forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown(toggle.dataset.dropdown);
      });
    });

    // Dropdown items
    dropdownItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        setActiveTab(item.dataset.tab);
        closeDropdowns();
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", (e) => {
      // Only close if click is outside dropdown
      if (!e.target.closest(".dropdown")) {
        closeDropdowns();
      }
    });

    // Close modal when clicking outside
    if (loginModal) {
      loginModal.addEventListener("click", (e) => {
        if (e.target === loginModal) {
          toggleLoginModal();
        }
      });
    }

    // Close modal on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.showLoginModal) {
        toggleLoginModal();
      }
    });
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
    loginModal.classList.toggle("show", state.showLoginModal);

    if (state.showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();
    // Here you would typically handle the login logic
    toggleLoginModal();
  }

  // Set active tab
  function setActiveTab(tab) {
    if (!tab) return;

    state.activeTab = tab;
    renderActiveTab();
  }

  // Toggle dropdown
  function toggleDropdown(dropdown) {
    if (!dropdown) return;

    // Prevent changing the active tab when toggling dropdown
    event.preventDefault();
    event.stopPropagation();

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

