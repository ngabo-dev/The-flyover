'use strict';

alert('Script loaded');
console.log('Script loaded');
document.body.style.background = 'lightblue';

/* navbar toggle */
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElemArr = [navOpenBtn, navCloseBtn];

for (let i = 0; i < navElemArr.length; i++) {
  navElemArr[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
  });
}

/* toggle navbar when click any navbar link */
const navbarLinks = document.querySelectorAll("[data-nav-link]");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.remove("active");
  });
}

/* header active when window scrolled down */
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

/* tab functionality */
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
  },
  "Our Team": {
    text: "Our dedicated team brings diverse expertise and passion to support children with disabilities across Africa. Each member is committed to our mission of inclusion, advocacy, and empowerment.",
    members: [
      { name: "Igisubizo Fils", role: "CEO" },
      { name: "Imani Beni Marc", role: "Vice President" },
      { name: "Umutoni Rachel", role: "Secretary" },
      { name: "Remezo Olaf", role: "Social Media Manager" },
      { name: "Ishimwe Jackson", role: "Project Manager" },
      { name: "Rugwiro Jackson", role: "Adviser" },
      { name: "Johnson", role: "Advisor" },
      { name: "Ange", role: "Advisor" },
      { name: "Ntawari Kevin", role: "Monitoring & Evaluation Officer" },
      { name: "Uwimpaye Destiny", role: "Accountant" },
      { name: "Child and Family Support Officer", role: "Child and Family Support Officer" }
    ]
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
      if (tabName === "Our Team") {
        tabList.innerHTML = "";
        const grid = document.createElement("div");
        grid.className = "team-grid";
        content.members.forEach(member => {
          const card = document.createElement("div");
          card.className = "team-card";
          const names = member.name.split(" ");
          let initials = "";
          if (names.length >= 2) {
            initials = names[0][0] + names[1][0];
          } else {
            initials = member.name.substring(0, 2);
          }
          initials = initials.toUpperCase();
          card.innerHTML = `
            <div class="team-initials">${initials}</div>
            <h3>${member.name}</h3>
            <p>${member.role}</p>
          `;
          grid.appendChild(card);
        });
        tabList.appendChild(grid);
      } else {
        const items = tabList.querySelectorAll(".tab-text");
        for (let k = 0; k < items.length && k < content.items.length; k++) {
          items[k].textContent = content.items[k];
        }
      }
    }
  });
}

// Handle hashchange for our team tab
function showOurTeamTab() {
  const tabs = document.querySelectorAll('.tab-btn');
  for (let i = 0; i < tabs.length; i++) {
    if (tabs[i].textContent.trim() === 'Our Team') {
      tabs[i].click();
      break;
    }
  }
}

window.addEventListener('hashchange', function() {
  if (location.hash === '#our-team') {
    showOurTeamTab();
  }
});

// Also check on page load
if (location.hash === '#our-team') {
  // Need to wait for the DOM to be ready? We'll put it in a setTimeout to be safe.
  setTimeout(showOurTeamTab, 0);
}
