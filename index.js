const timeEl = document.getElementById("curTime");
const alarmList = [];

setInterval(() => {
  const date = new Date();
  const time = date.toLocaleTimeString();
  timeEl.textContent = time;
  let hr = date.getHours();
  let mnt = String(date.getMinutes());
  let sec = String(date.getSeconds());
  let mdm = "AM";
  if (hr - 12 > 0) {
    hr -= 12;
    mdm = "PM";
  }
  hr = String(hr);
  if (hr.length < 2) {
    hr = `0${hr}`;
  }
  if (mnt.length < 2) {
    mnt = `0${mnt}`;
  }
  if (sec.length < 2) {
    sec = `0${sec}`;
  }
  const alarm = `${hr}:${mnt}:${sec} ${mdm}`;
  const index = alarmList.indexOf(alarm);
  if (index != -1) {
    alert(`Alarm for ${alarm}`);
    // when alarm goes of deleting that alarm from list as well
    deleteAlarm(index);
  }
}, 1000);

const formEl = document.getElementById("inpBtnCont");
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(formEl);
  const hr = formData.get("hr");
  const mnt = formData.get("mnt");
  const sec = formData.get("sec");
  const mdm = formData.get("mdm");
  setAlarm(hr, mnt, sec, mdm);
});

const alarmListEl = document.getElementById("alarmList");
const hrEl = document.getElementById("hr");
const mntEl = document.getElementById("mnt");
const secEl = document.getElementById("sec");

// This function is to set Alarm
function setAlarm(hr, mnt, sec, mdm) {
  if (hr.length < 2) {
    hr = `0${hr}`;
  }
  if (mnt.length < 2) {
    mnt = `0${mnt}`;
  }
  if (sec.length < 2) {
    sec = `0${sec}`;
  }
  const alarm = `${hr}:${mnt}:${sec} ${mdm}`;
  alarmList.push(alarm);
  hrEl.value = "";
  mntEl.value = "";
  secEl.value = "";
  hrEl.focus();
  showAlarm();
}

// This functin will show the alarms set by user in list
function showAlarm() {
  alarmListEl.textContent = "";
  alarmList.forEach((alarm, index) => {
    const alarmEl = document.createElement("li");
    alarmListEl.appendChild(alarmEl);
    alarmEl.classList.add("alarmSec", index);
    alarmEl.innerHTML = createItem(alarm);

    const btnEl = document.createElement("button");
    btnEl.setAttribute("id", index);
    btnEl.textContent = "Delete";
    alarmEl.appendChild(btnEl);
    btnEl.addEventListener("click", () => {
      deleteAlarm(index);
    });
  });
}

function createItem(alarm) {
  return `<div class="time">${alarm}</div>`;
}

// This function is to delete any upcomint alarm
function deleteAlarm(index) {
  alarmList.splice(index, 1);
  showAlarm();
}
