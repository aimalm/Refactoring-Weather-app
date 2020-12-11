(function () {
  // get global variables from document
  let resultDiv = document.querySelector(".results");
  let cityInput = document.getElementById("search_id")
  let searchButton = document.querySelector(".js-search-button");
  let todayDiv = document.querySelector(".today_weather")
  let weekDaysIndex = 0;

  const api = {
    key: "f93f0f6ec73b9962c8732f8123da14d5",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const resetResults = () => {
    resultDiv.innerHTML = "";
    todayDiv.innerHTML = "";
  }

  const dateBuilderDayOne = (currentDate) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = currentDate.getDate();
    let month = months[currentDate.getMonth()];

    return `${date} ${month}`;
  }

  const printDays = (currentDate) => {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[currentDate.getDay() + weekDaysIndex];

    return day;
  }

  const dateBuilderForeCastingDays = (currentDate) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = currentDate.getDate() + weekDaysIndex;
    let month = months[currentDate.getMonth()];

    return `${date} ${month}`;
  }

  const addToday = (data) => {
    let divCard1 = document.createElement("div");
    divCard1.classList.add("card1");

    let day1 = document.createElement("h2");
    day1.classList.add("day");

    let now1 = new Date();
    day1.innerHTML = "Today";

    let date1 = document.createElement("p")
    date1.classList.add("date");
    date1.innerHTML = dateBuilderDayOne(now1);

    let temperature1 = document.createElement("p");
    temperature1.classList.add("temp");
    temperature1.innerHTML = Math.round(data.list[0].main.temp) + " °C"

    let iconDiv1 = document.createElement("div");
    iconDiv1.classList.add("icon");

    let icon1 = document.createElement("img");
    icon1.classList.add("icon_img");
    icon1.src = "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + "@2x.png";

    todayDiv.appendChild(divCard1)
    divCard1.append(day1);
    divCard1.appendChild(date1)
    divCard1.appendChild(temperature1);
    divCard1.appendChild(iconDiv1)
    iconDiv1.appendChild(icon1)
  }

  const addDay = (data, i) => {
    ++weekDaysIndex;

    let divCard = document.createElement("div");
    divCard.classList.add("card2");

    let day = document.createElement("h2");
    day.classList.add("day");

    let now = new Date();
    day.innerHTML = printDays(now);

    let date = document.createElement("p")
    date.classList.add("date");
    date.innerHTML = dateBuilderForeCastingDays(now);

    let temperature = document.createElement("p");
    temperature.classList.add("temp");
    temperature.innerHTML = Math.round(data.list[i].main.temp) + " °C";

    let iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");

    let icon = document.createElement("img");
    icon.classList.add("icon_img");
    icon.src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png";

    resultDiv.appendChild(divCard);
    divCard.append(day);
    divCard.appendChild(date);
    divCard.appendChild(temperature);
    divCard.appendChild(iconDiv);
    iconDiv.appendChild(icon);
  }

  const searchClicked = (event) => {
    event.preventDefault();
    let city = cityInput.value;

    fetch(`${api.base}forecast?q=${city}&appid=${api.key}&units=metric`)
        .then((response) => {
          resetResults();

          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' + response.status);
            return;
          }

          return response.json();
        }).then((data) => {
      addToday(data);

      for (let i = 0; i < data.list.length; i += 8) {
        addDay(data, i);
      }
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err);
    });
  }

  searchButton.addEventListener("click", searchClicked);
}());