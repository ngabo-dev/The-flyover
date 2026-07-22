'use strict';



/**
 * navbar toggle
 */

const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
}

/**
 * toggle navbar when click any navbar link
 */

const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
  });
}





/**
 * header active when window scrolled down
 */

const header = document.querySelector("[data-header]");

const heroSection = document.querySelector("#home");

window.addEventListener("scroll", function () {
  window.scrollY >= 50 ? header.classList.add("active")
    : header.classList.remove("active");

  const heroBottom = heroSection.offsetHeight;

  if (window.scrollY >= heroBottom - 1) {
    header.classList.add("slide-up");
  } else {
    header.classList.remove("slide-up");
  }
});

/**
 * tab functionality
 */

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = {
  "Our Mission": {
    text: "We believe every child deserves to belong, learn, and grow, regardless of ability. Our mission is to break down the barriers that keep children with disabilities in East Africa out of school, out of clinics, and out of community life.",
    items: ["Inclusive Education for Every Child", "Therapy, Assistive Devices & Healthcare", "Safe Shelter & Family Support", "Community Awareness & Acceptance"]
  },
  "Our Vision": {
    text: "We envision an East Africa where children with disabilities are seen first as children: valued, included in their schools and communities, and given every tool they need to thrive.",
    items: ["Inclusive Classrooms in Every Community", "A Generation Raised Without Stigma", "Families Equipped to Support Their Children", "Communities That Choose Inclusion"]
  },
  "Next Plan": {
    text: "Our next plan focuses on opening 5 new inclusive learning centers across Kenya, Uganda, and Rwanda, training 200 teachers in inclusive education, and providing assistive devices to over 3,000 children with disabilities.",
    items: ["Open 5 Inclusive Learning Centers", "Launch Mobile Therapy Clinics", "Train 200 Teachers in Inclusive Education", "Provide Assistive Devices to 3,000 Children"]
  }
};

for (let i = 0; i < tabBtns.length; i++) {
  tabBtns[i].addEventListener("click", function () {
    for (let j = 0; j < tabBtns.length; j++) {
      tabBtns[j].classList.remove("active");
    }
    this.classList.add("active");

    const tabName = this.textContent.trim();
    const content = tabContents[tabName];
    if (!content) return;

    const sectionText = document.querySelector(".tab-content .section-text");
    const tabList = document.querySelector(".tab-list");
    if (sectionText) sectionText.textContent = content.text;
    if (tabList) {
      const items = tabList.querySelectorAll(".tab-text");
      for (let k = 0; k < items.length && k < content.items.length; k++) {
        items[k].textContent = content.items[k];
      }
    }
  });
}