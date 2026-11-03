const sessions = JSON.parse(localStorage.getItem("sessions")) || [];
localStorage.setItem("sessions", JSON.stringify(sessions));

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const currentWeek = [];

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const year = String(date.getFullYear());

  return `${day}/${month}/${year}`;
}

function getCurrentWeek() {
  const today = new Date();
  let startDate = (function () {
    if (today.getDay() == 0) {
      return today.getDate();
    }

    let startDate = new Date();

    startDate.setDate(today.getDate() - (today.getDay() - 1));
    return startDate;
  })();

  for (let i = 0; i < 6; i++) {
    let date = new Date();
    date.setDate(startDate.getDate() + i);

    currentWeek.push({ day: dayNames[date.getDay()], date: formatDate(date) });
  }
}

getCurrentWeek();
// console.log(currentWeek);

const week_display = document.querySelector("#current-week");
week_display.innerHTML = `${currentWeek[0].date} - ${currentWeek[5].date}`;

const links = document.querySelectorAll("a");
links.forEach((link, index) => {
  link.href = `./edit.html?date=${currentWeek[index].date}`;
});

const forms = document.querySelectorAll(".form");
forms.forEach((form, index) => {
  form.classList.add(`${currentWeek[index].day}`);
  form.id = `${currentWeek[index].date}`;
});

const dateDisplays = document.querySelectorAll('.date');
dateDisplays.forEach((dateDisplay, index) => {
  dateDisplay.innerHTML = currentWeek[index].date;
})

function formatSessionDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function findSession(date) {
  return sessions.find((session) => {
    console.log(formatSessionDate(session.date) === date);
    return formatSessionDate(session.date) === date;
  });
}

forms.forEach((form, index) => {
  console.log(`inside loop of form ${form.id}`);
  const session = findSession(form.id);
  console.log(session);

  if (session) {
    lessonDetail = form.querySelector(".lesson");

    // Lesson title
    lessonTitle = document.createElement("div");
    lessonTitle.classList = "lesson-title";
    category = document.createElement("p");
    category.innerHTML = `${session.category}`;
    title = document.createElement("h4");
    title.innerHTML = `${session.title}`;
    time = document.createElement("p");
    time.innerHTML = `${session.start_time} - ${session.end_time}`;

    // lesson title add up
    lessonDetail.appendChild(lessonTitle);
    lessonTitle.appendChild(category);
    lessonTitle.appendChild(title);
    lessonTitle.appendChild(time);

    // lesson description
    lessonDes = document.createElement('div');
    lessonDes.classList = 'lesson-description';

    lessonDetail.appendChild(lessonDes);
    techniqueTitle = document.createElement('h4');
    techniqueTitle.innerHTML = 'Techniques';

    lessonDes.appendChild(techniqueTitle);
    list = document.createElement('ul')
    lessonDes.appendChild(list);
    session.techniques.forEach((technique) => {
      item = document.createElement('li');
      item.classList = 'technique-item'
      item.innerHTML = `${technique}`
      list.appendChild(item);
    })

    senseiName = document.createElement('p');
    senseiName.innerHTML = `Sensei: ${session.sensei}`
    lessonDes.appendChild(senseiName);
  }
});
