
document.addEventListener("DOMContentLoaded", () => {

  console.log("Dashboard Loaded");

  // =========================
  // SIDEBAR ACTIVE MENU
  // =========================

  const menuItems = document.querySelectorAll(".menu li");

  menuItems.forEach(item => {

    item.addEventListener("click", () => {

      menuItems.forEach(li => {
        li.classList.remove("active");
      });

      item.classList.add("active");

    });

  });

  
  // ADD ATTENDANCE BUTTON


  const addBtn = document.querySelector(".add-btn");

  addBtn.addEventListener("click", () => {

    const tbody = document.querySelector("tbody");

    const today = new Date();

    const formattedDate =
      today.getDate().toString().padStart(2, '0') +
      " " +
      today.toLocaleString('default', { month: 'short' }) +
      " " +
      today.getFullYear();

    const rowCount = tbody.querySelectorAll("tr").length + 1;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${rowCount}</td>
      <td>${formattedDate}</td>
      <td><span class="online">ONLINE</span></td>
    `;

    tbody.appendChild(tr);

    // Add to allRows array
    allRows.push(tr);

    filterRows();

    alert("Attendance Added Successfully");

  });

  // =========================
  // MONTH DROPDOWN
  // =========================

  const monthBtn = document.getElementById("selectedMonthBtn");

const monthGrid = document.getElementById("monthGrid");

if(monthBtn && monthGrid){

  monthBtn.addEventListener("click", () => {

    monthGrid.classList.toggle("show");

  });

}
  // =========================
  // TABLE + PAGINATION
  // =========================

  const tbody = document.querySelector("tbody");

  const allRows = Array.from(tbody.querySelectorAll("tr"));

  const entriesSelect = document.getElementById("entries");

  const prevBtn = document.querySelector(".prev-btn");

  const nextBtn = document.querySelector(".next-btn");

  const page1Btn = document.querySelectorAll(".page-btn")[1];

  const page2Btn = document.querySelectorAll(".page-btn")[2];

  let currentMonth = "Jan";

  let currentPage = 1;

  let rowsPerPage = 10;

  let filteredRows = [];

  // =========================
  // OPEN MONTH DROPDOWN
  // =========================

  monthBtn.addEventListener("click", () => {

    monthGrid.classList.toggle("show");

  });

  // =========================
  // CLOSE DROPDOWN
  // =========================

  if(monthGrid){

  document.addEventListener("click", (e) => {

    if (!e.target.closest(".month-dropdown")) {

      monthGrid.classList.remove("show");

    }

  });

}

  // =========================
  // MONTH FILTER
  // =========================

  monthItems.forEach(item => {

    item.addEventListener("click", () => {

      currentMonth = item.dataset.month;

      monthBtn.innerText = currentMonth + " 2026";

      monthItems.forEach(m => {
        m.classList.remove("active-month");
      });

      item.classList.add("active-month");

      monthGrid.classList.remove("show");

      currentPage = 1;

      filterRows();

    });

  });

  // =========================
  // ENTRIES SELECT
  // =========================

  entriesSelect.addEventListener("change", (e) => {

    rowsPerPage = parseInt(e.target.value);

    currentPage = 1;

    displayRows();

  });

  // =========================
  // PREV BUTTON
  // =========================

  prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {

      currentPage--;

      displayRows();

    }

  });

  // =========================
  // NEXT BUTTON
  // =========================

  nextBtn.addEventListener("click", () => {

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

    if (currentPage < totalPages) {

      currentPage++;

      displayRows();

    }

  });

  // =========================
  // PAGE NUMBER BUTTONS
  // =========================

  page1Btn.addEventListener("click", () => {

    currentPage = 1;

    displayRows();

  });

  page2Btn.addEventListener("click", () => {

    currentPage = 2;

    displayRows();

  });

  // =========================
  // FILTER ROWS BY MONTH
  // =========================

  function filterRows() {

    filteredRows = allRows.filter(row => {

      const dateText = row.children[1].innerText;

      return dateText.includes(currentMonth);

    });

    displayRows();

  }

  // =========================
  // DISPLAY ROWS
  // =========================

  function displayRows() {

    tbody.innerHTML = "";

    const start = (currentPage - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    const paginatedRows = filteredRows.slice(start, end);

    paginatedRows.forEach(row => {

      tbody.appendChild(row);

    });

    updatePagination();

  }

  // =========================
  // UPDATE PAGINATION
  // =========================

  function updatePagination() {

    page1Btn.classList.remove("active-page");

    page2Btn.classList.remove("active-page");

    if (currentPage === 1) {

      page1Btn.classList.add("active-page");

    }

    if (currentPage === 2) {

      page2Btn.classList.add("active-page");

    }

  }

  // =========================
  // INITIAL LOAD
  // =========================

  filterRows();

});

// =========================
// ASSIGNMENT SEARCH
// =========================

if(document.body.classList.contains("assignments-page")){

  const searchInput = document.getElementById("searchInput");

  const rows = document.querySelectorAll("#assignmentTable tr");

  searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    rows.forEach(row => {

      const text = row.innerText.toLowerCase();

      if(text.includes(value)){

        row.style.display = "";

      }else{

        row.style.display = "none";

      }

    });

  });

}
const assignments = {

  1: {
    title: "Build Fullstack App",

    description:
      "Build a web app where students can manage their daily tasks (add, edit, delete, mark complete) with a simple backend and database — no authentication required. const taskSchema = new mongoose.Schema({ title: String, description: String, status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, createdAt: { type: Date, default: Date.now } });",
    start: "23 Apr 2026",

    end: "27 Apr 2026",

    status: "ACTIVE"
  },

  2: {
    title: "Create Mini Project in React",

    description:
      "Create a mini project in react js with props.",

    start: "25 Mar 2026",

    end: "26 Mar 2026",

    status: "ACTIVE"
  },

  3: {
    title: "React JS Task",

    description:
      "Build a React application called “Student Profile Card App” where you create a reusable StudentCard component that receives all student information such as name, age, course, and an optional profile image through props from the parent App.js. In the main app file, define an array of at least three student objects and render a StudentCard for each by passing the data via props. Inside each card, implement state using the useState hook to add interactivity: include a button that toggles between “Show Details” and “Hide Details” to conditionally display additional information like email, skills, or address. Also add a “Like 👍” button that increments a like counter stored in state every time it is clicked. Finally, apply basic CSS styling to give each card a clean layout with proper spacing, borders, and visually distinct buttons, ensuring the UI looks organized and user-friendly.",

    start: "20 Mar 2026",

    end: "23 Mar 2026",

    status: "ACTIVE"
  },

  4: {
    title: "Create a website",  
    description:
      "Create a website using HTML, CSS, and JavaScript. The website should have a homepage, about page, and contact page. The homepage should have a hero section with a call-to-action button. The about page should have information about the website and its purpose. The contact page should have a form that allows users to send a message to the website owner.",
    start: "17 Mar 2026",
    end: "18 Mar 2026",
    status: "COMPLETED"
  },

  5: {
    title: "Js Test - Submission",  
    description: "test submission",
    start: "17 Mar 2026",
    end: "18 Mar 2026",
    status: "COMPLETED"
  },

  6: {
    title: "Create Ecommerce Page",  
    description: "Create a ecommerce page using html css & javascript Reference link: Link: https://saurabhpranjalesupermarket.netlify.app/",   
    start: "09 Mar 2026",
    end: "10 Mar 2026",
    status: "ACTIVE"
  },
  7: {
    title: "Natural Icecream Clone",  
    description:"Create Natural Icecream store website clone using HTML ,CSS and Bootstrap",
    start: "06 Feb 2026",
    end: "10 Feb 2026",
    status: "ACTIVE"  
  },
  8: {
    title: "Create portfolio clone",  
    description: "using html ,css and bootstrap create portfolio clone of your choice",
    start: "03 Feb 2026",
    end: "03 Feb 2026",
    status: "ACTIVE"
  },
  9: {
    title: "Create Bootstrap Portfolio",  
    description: "create your own portfolio using html css and bootstrap",
    start: "02 Feb 2026",
    end: "03 Feb 2026",
    status: "ACTIVE"
  },
  10: {
     title: "Create a Website in html css",
    description: "best and awsome website attractive website using html and css",
    start: "15 Jan 2026",
    end: "19 Jan 2026",
    status: "ACTIVE"
  },
  11: {
    title: "Create basic Webpage",
    description: "Create basic Webpage with HTML and CSS",
    start: "13 Jan 2026",
    end: "15 Jan 2026",
    status: "ACTIVE"
  },
  12: {
    title: "Tribute Page in HTML",
    description: "create a tribute page in html for your role model.",
    start: "07 Jan 2026",
    end: "13 Jan 2026",
    status: "ACTIVE"
  },
};

function showAssignment(id) {

  const assignment = assignments[id];

  document.getElementById("assignmentDetails").style.display = "block";

  document.getElementById("detailTitle").innerText =
    assignment.title;

  document.getElementById("detailDescription").innerText =
    assignment.description;

  document.getElementById("detailStart").innerText =
    assignment.start;

  document.getElementById("detailEnd").innerText =
    assignment.end;

  document.getElementById("detailStatus").innerText =
    assignment.status;
}

// Search Functionality

const searchInput = document.querySelector(".search-box input");

const tableRows = document.querySelectorAll("tbody tr");

searchInput.addEventListener("keyup", function () {

  const searchValue = searchInput.value.toLowerCase();

  tableRows.forEach(function (row) {

    const topic =
      row.cells[1].textContent.toLowerCase();

    if (topic.includes(searchValue)) {

      row.style.display = "";

    } else {

      row.style.display = "none";

    }

  });

});

// Join Button Click

const joinButtons =
  document.querySelectorAll(".join-btn");

joinButtons.forEach(function (button) {

  button.addEventListener("click", function () {

    alert("Joining Lecture...");

  });

});


// Save Academic Details

const saveBtn =
  document.querySelector(".save-btn");

saveBtn.addEventListener("click", function () {

  alert("Academic Details Saved Successfully!");

});

// Upload Resume

const uploadBtn =
  document.querySelector(".upload-btn");

uploadBtn.addEventListener("click", function () {

  alert("Resume Upload Feature Coming Soon!");

});


// JOB SEARCH

const searchInput =
  document.getElementById("searchInput");

const rows =
  document.querySelectorAll("#jobTable tr");

searchInput.addEventListener("keyup", function () {

  const value =
    searchInput.value.toLowerCase();

  rows.forEach(function (row) {

    const text =
      row.textContent.toLowerCase();

    if (text.includes(value)) {

      row.style.display = "";

    } else {

      row.style.display = "none";

    }

  });

});

// CLEAR BUTTON

const clearBtn =
  document.getElementById("clearBtn");

clearBtn.addEventListener("click", function () {

  searchInput.value = "";

  rows.forEach(function (row) {

    row.style.display = "";

  });

});