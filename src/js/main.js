let baterrylevel = document.querySelector('.headerCalk__battery');

// let hour = document.querySelector('.hour');
// let minute = document.querySelector('.minute');
// let date = document.querySelector('.date');

navigator.getBattery().then((battery) => {
  updateLevelInfo();
  battery.addEventListener('levelchange', () => {
    updateLevelInfo();
  });
  function updateLevelInfo() {
    baterrylevel.innerHTML = `${battery.level * 100}%`;
  }
});

function clock() {
  const datetime = new Date();
  document.querySelector('.minute').innerHTML = datetime.getMinutes().toString().padStart(2, '0');
  document.querySelector('.hour').innerHTML = datetime.getHours().toString().padStart(2, '0');
  document.querySelector('.date').innerHTML = `${(datetime.getDate() + 1).toString().padStart(2, '0')}.${(
    datetime.getMonth() + 1
  )
    .toString()
    .padStart(2, '0')}.${datetime.getFullYear()}`;
}

setInterval(() => {
  document.querySelector('.twoDotet').classList.toggle('is-notTwoDotet');
  clock();
}, 1000);
