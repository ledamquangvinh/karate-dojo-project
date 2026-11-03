const data = localStorage.getItem("sessions");
const sessions = JSON.parse(data);

const params = new URLSearchParams(window.location.search);
const date = params.get("date");

console.log(date);

const existingSession = sessions.find(
  (session) => formatDate(session.date) === date,
);

console.log(existingSession);

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

function reverseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
}

const session_date = document.querySelector("#session-date");
session_date.value = reverseDate(date);

if (existingSession) {
  const category = document.querySelector(
    `input[name="session-type"][value=${existingSession.category}]`,
  );
  const title = document.getElementById("session-title");
  const start_time = document.querySelector("#session-hour-start");
  const end_time = document.querySelector("#session-hour-end");
  const sensei = document.querySelector("#session-sensei");

  if (category) {
    category.checked = true;
  }
  title.value = existingSession.title;
  start_time.value = existingSession.start_time;
  end_time.value = existingSession.end_time;

  existingSession.techniques.forEach((technique) => {
    const input = add_technique();
    input.value = technique;
  })

  sensei.value = existingSession.sensei;
}
btn_add_technique = document.getElementById("add-technique");

var technique_count = 0;
function add_technique() {
  console.log("button click");
  if(technique_count > 4){
    return
  }
  technique_count += 1;
  const techniques = document.querySelector(".techniques");

  const technique = document.createElement("div");
  technique.classList.add(`technique-${technique_count}`);
  const input = document.createElement("input");
  input.type = "text";
  input.name = "technique";
  const btn_remove = document.createElement("button");
  btn_remove.classList.add(`technique-${technique_count}`);
  btn_remove.textContent = "Remove";

  btn_remove.addEventListener("click", () => {
    techniques.removeChild(technique);
    technique_count--;
  });

  console.log(technique_count);
  techniques.appendChild(technique);
  technique.appendChild(input);
  technique.appendChild(btn_remove);

  return input;
}

btn_add_technique?.addEventListener("click", add_technique);

const edit_submit = document.querySelector(".session-cards");

edit_submit.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("edit save button");
  const category = document.querySelector(
    'input[name="session-type"]:checked',
  ).value;
  const title = document.getElementById("session-title").value;
  const date = document.querySelector("#session-date").value;
  const start_time = document.querySelector("#session-hour-start").value;
  const end_time = document.querySelector("#session-hour-end").value;
  const sensei = document.querySelector("#session-sensei").value;
  const techniques = document.querySelectorAll('[name="technique"]');


  const techniqueValues = [];
  techniques.forEach((technique) => {
    techniqueValues.push(technique.value);
  });

  session = {
    category,
    title,
    date,
    start_time,
    end_time,
    techniques: techniqueValues,
    sensei,
  };

  console.log("inside btn");
  console.log(session);

  if (!existingSession) {
    sessions.push(session);
  } else {
    existingSession.category = session.category;
    existingSession.title = session.title;
    existingSession.start_time = session.start_time;
    existingSession.end_time = session.end_time;
    existingSession.techniques = session.techniques;
    existingSession.sensei = session.sensei;
  }

  localStorage.setItem("sessions", JSON.stringify(sessions));
  window.location.href = "./index.html";
});
