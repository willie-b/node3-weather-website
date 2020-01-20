const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messeageOne = document.querySelector('#message-1');
const messeageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;

  messeageOne.textContent = 'Loading...';
  messeageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        messeageOne.textContent = data.error;
      } else {
        messeageOne.textContent = data.location;
        messeageTwo.textContent = data.forecast;
        console.log(data.forecast);
        console.log(data.location);
      }
    });
  });
});
