let requestURL = "resume.json";
let request = new XMLHttpRequest();
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  const data = request.response;
  populateLeftColumn(data);
  populateRightColumn(data);
};

function populateLeftColumn(obj) {
  const data = obj;

  showContactInformation(data);
  showSkills(data);
  showLanguages(data);
}

function populateRightColumn(obj) {
  const data = obj;

  showWorkExperience(data);
  showEducation(data);
}

function showContactInformation(obj) {
  const data = obj;
  const contactInformation = document.getElementById("contact-information");
  const fullName = document.getElementById("full-name");
  fullName.textContent = obj.basics.name;

  const education = data.education[0].area;
  const city = data.basics.location.city + ", " + data.basics.location.region;
  const emailAddress = data.basics.email;
  const phoneNumber = data.basics.phone;

  const para1 = document.createElement("p");
  const para2 = document.createElement("p");
  const para3 = document.createElement("p");
  const para4 = document.createElement("p");

  const faBriefcase = document.createElement("i");
  const faHome = document.createElement("i");
  const faEnvelope = document.createElement("i");
  const faPhone = document.createElement("i");

  faBriefcase.className = "fa fa-briefcase fa-fw me-3 fs-5 text-teal";
  faHome.className = "fa fa-home fa-fw me-3 fs-5 text-teal";
  faEnvelope.className = "fa fa-envelope fa-fw me-3 fs-5 text-teal";
  faPhone.className = "fa fa-phone fa-fw me-3 fs-5 text-teal";

  para1.append(faBriefcase, education);
  para2.append(faHome, city);
  para3.append(faEnvelope, emailAddress);
  para4.append(faPhone, phoneNumber);
  contactInformation.append(para1, para2, para3, para4);

  const profiles = data["basics"].profiles;

  for (let i = 0; i < profiles.length; i++) {
    const para = document.createElement("p");
    const faIcon = document.createElement("i");
    const linkItem = document.createElement("a");
    const linkURL = data["basics"]["profiles"][i].url;
    const network = data["basics"]["profiles"][i].network;

    faIcon.className =
      "fa fa-" +
      network.toString().toLowerCase() +
      " fa-fw me-3 fs-5 text-teal";

    linkItem.href = linkURL;
    linkItem.className = "text-reset";
    linkItem.innerHTML = network;
    para.append(faIcon, linkItem);

    contactInformation.appendChild(para);
  }
}

function showSkills(obj) {
  const data = obj;
  const sectionSkills = document.getElementById("skills");
  const skills = data.skills;
  const skillList = document.createElement("ul");

  for (let i = 0; i < skills.length; i++) {
    const listItem = document.createElement("li");
    listItem.textContent = skills[i].name;
    skillList.appendChild(listItem);
  }

  sectionSkills.appendChild(skillList);
}

function showLanguages(obj) {
  const data = obj;
  const sectionLanguages = document.getElementById("languages");
  const languages = data.languages;

  for (let i = 0; i < languages.length; i++) {
    const para = document.createElement("p");
    const progressDiv = document.createElement("div");
    const progressBarDiv = document.createElement("div");

    para.textContent = languages[i].language;

    let ariaValueNow;
    const level = languages[i].level;
    switch (level) {
      case "A1":
        ariaValueNow = "16.67";
        break;
      case "A2":
        ariaValueNow = "33.33";
        break;
      case "B1":
        ariaValueNow = "50";
        break;
      case "B2":
        ariaValueNow = "66.67";
        break;
      case "C1":
        ariaValueNow = "83.33";
        break;
      case "C2":
        ariaValueNow = "100";
        break;
      default:
        ariaValueNow = "0";
    }

    progressDiv.className = "progress mb-3";
    progressBarDiv.className =
      "progress-bar bg-teal progress-bar-striped progress-bar-animated text-center text-white";
    progressBarDiv.setAttribute("role", "progressbar");
    progressBarDiv.style.width = ariaValueNow + "%";
    progressBarDiv.setAttribute("aria-valuenow", ariaValueNow);
    progressBarDiv.setAttribute("aria-valuemin", "0");
    progressBarDiv.setAttribute("aria-valuemax", "100");

    sectionLanguages.appendChild(para);
    progressDiv.appendChild(progressBarDiv);
    sectionLanguages.appendChild(progressDiv);
  }
}

function showWorkExperience(obj) {
  const data = obj;
  const sectionWorkExperience = document.getElementById("work-experience");
  const workExperience = [data.work, data.additionalWork];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < workExperience.length; i++) {
    for (let j = 0; j < workExperience[i].length; j++) {
      workExperience[i][j].startDate = new Date(workExperience[i][j].startDate);
      workExperience[i][j].endDate = new Date(workExperience[i][j].endDate);

      const startYear = workExperience[i][j].startDate.getFullYear();
      const startMonth = workExperience[i][j].startDate.getMonth();
      const endYear = workExperience[i][j].endDate.getFullYear();
      const endMonth = workExperience[i][j].endDate.getMonth();

      const container = document.createElement("div");
      container.className = "container";

      const h5WorkPosition = document.createElement("h5");
      h5WorkPosition.className = "text-black-50";
      h5WorkPosition.innerHTML = "<b>" + workExperience[i][j].position + "</b>";

      const h6CompanyName = document.createElement("h6");
      h6CompanyName.className = "text-black-50";
      h6CompanyName.textContent =
        workExperience[i][j].company + " " + workExperience[i][j].location;

      const h6WorkingPeriod = document.createElement("h6");
      h6WorkingPeriod.className = "text-teal";

      const faCalendar = document.createElement("i");
      faCalendar.className = "fa fa-calendar fa-fw me-3";

      let workingPeriod = months[startMonth] + " " + startYear + " - ";

      if (isNaN(workExperience[i][j].endDate)) {
        const span = document.createElement("span");
        span.className = "badge bg-teal fs-6 fw-light";
        span.textContent = "heden";
        h6WorkingPeriod.append(faCalendar, workingPeriod, span);
      } else {
        workingPeriod += months[endMonth] + " " + endYear;
        h6WorkingPeriod.append(faCalendar, workingPeriod);
      }

      const para = document.createElement("p");
      para.textContent = workExperience[i][j].summary;
      const hr = document.createElement("hr");
      const br = document.createElement("br");

      // Checks if it's not last value.
      if (
        !(
          workExperience[i][j] ==
          workExperience[workExperience.length - 1][
            workExperience[i].length - 1
          ]
        )
      ) {
        container.append(
          h5WorkPosition,
          h6CompanyName,
          h6WorkingPeriod,
          para,
          hr
        );
        sectionWorkExperience.append(container);
      } else {
        container.append(
          h5WorkPosition,
          h6CompanyName,
          h6WorkingPeriod,
          para,
          br
        );
        sectionWorkExperience.append(container);
      }
    }
  }
}

function showEducation(obj) {
  const data = obj;
  const sectionEducation = document.getElementById("education");
  const education = data.education;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Okt",
    "Nov",
    "Dec",
  ];

  for (let i = 0; i < education.length; i++) {
    education[i].startDate = new Date(education[i].startDate);
    education[i].endDate = new Date(education[i].endDate);

    const startYear = education[i].startDate.getFullYear();
    const startMonth = education[i].startDate.getMonth();
    const endYear = education[i].endDate.getFullYear();
    const endMonth = education[i].endDate.getMonth();

    const container = document.createElement("div");
    container.className = "container";

    const h5EducationArea = document.createElement("h5");
    h5EducationArea.className = "text-black-50";
    h5EducationArea.innerHTML = "<b>" + education[i].area + "</b>";

    const h6Institution = document.createElement("h6");
    h6Institution.className = "text-black-50";
    if (!(education[i].location === "")) {
      h6Institution.textContent =
        education[i].institution + ", " + education[i].location;
    } else {
      h6Institution.textContent = education[i].institution;
    }

    const h6StudyType = document.createElement("h6");
    h6StudyType.className = "text-black-50";
    h6StudyType.textContent = education[i].studyType;

    const row1 = document.createElement("row");
    const col1_left = document.createElement("div");
    const col1_right = document.createElement("div");
    row1.className = "row";
    col1_left.className = "col-8";
    col1_right.className = "col-4 text-end";
    col1_left.appendChild(h6Institution);
    col1_right.appendChild(h6StudyType);
    row1.append(col1_left, col1_right);

    const h6StudyPeriod = document.createElement("h6");
    h6StudyPeriod.className = "text-teal";

    const faCalendar = document.createElement("i");
    faCalendar.className = "fa fa-calendar fa-fw me-3";

    let studyPeriod = months[startMonth] + " " + startYear + " - ";

    if (isNaN(education[i].endDate)) {
      const span = document.createElement("span");
      span.className = "badge bg-teal fs-6 fw-light";
      span.textContent = "heden";
      h6StudyPeriod.append(faCalendar, studyPeriod, span);
    } else {
      studyPeriod += months[endMonth] + " " + endYear;
      h6StudyPeriod.append(faCalendar, studyPeriod);
    }

    const row2 = document.createElement("div");
    const col2_left = document.createElement("div");
    const col2_right = document.createElement("div");
    row2.className = "row";
    col2_left.className = "col-8";
    col2_right.className = "col-4 text-end text-black-50";
    col2_left.appendChild(h6StudyPeriod);
    row2.appendChild(col2_left);
    if (education[i].diploma === true) {
      col2_right.innerHTML = "<h6><i>Behaald</i></h6>";
      row2.appendChild(col2_right);
    }

    const hrEl = document.createElement("hr");
    const brEl = document.createElement("br");

    if (!(i == education.length - 1)) {
      container.append(h5EducationArea, row1, row2, hrEl);
      sectionEducation.append(container);
    } else {
      container.append(h5EducationArea, row1, row2, brEl);
      sectionEducation.append(container);
    }
  }
}
