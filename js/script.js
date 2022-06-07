const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const clickButton = document.querySelector("form button");
// const body = document.querySelector("body");
// const toggle = document.querySelector("#toggle");
// const sunIcon = document.querySelector(".toggle .fa fa-sun");
// const moonIcon = document.querySelector(".toogle .fas fa-moon");

for (let i = 0; i < dropList.length; i++) {
  for (currency_code in country_code) {
    let selected;
    if (i == 0) {
      selected = currency_code == "USD" ? " selected" : "";
    } else if (i == 1) {
      selected = currency_code == "PLN" ? " selected" : "";
    }

    let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML("beforeend", optionTag);
  }
  dropList[i].addEventListener("change", (e) => {
    loadFlag(e.target);
  });
}
function loadFlag(element) {
  for (code in country_code) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector("img");
      imgTag.src = `https://flagcdn.com/48x36/${country_code[code]}.png`;
    }
  }
}
window.addEventListener("load", (e) => {
  getRate();
});

clickButton.addEventListener("click", (e) => {
  e.preventDefault();
  getRate();
});
const exchangeIcon = document.querySelector(".drop-list .icon ");
exchangeIcon.addEventListener("click", () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getRate() {
  const amount = document.querySelector(".amount input");
  const exchangeRateTxt = document.querySelector(".exchange-rate");
  let amountVal = amount.value;
  if (amountVal == "" || amountVal == "0") {
    amount.value = "1";
    amountVal = 1;
  }

  exchangeRateTxt.innerText = "Przeliczanie...";

  let url = `https://v6.exchangerate-api.com/v6/ba7fb2d450c362bc21a2a245/latest/${fromCurrency.value}`; // użyłem tego bo http://api.nbp.pl/api/exchangerates/a/ używając tego nie przeliczało mi PLN
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalRate} ${toCurrency.value}`;
    });
}
const body = document.querySelector("body");
const toggle = document.querySelector("#toggle");
const sunIcon = document.querySelector(".toggle .bxs-sun");
const moonIcon = document.querySelector(".toggle .bx-moon");

toggle.addEventListener("change", () => {
  body.classList.toggle("dark");
  sunIcon.className =
    sunIcon.className == "bx bxs-sun" ? "bx bx-sun" : "bx bxs-sun";
  moonIcon.className =
    moonIcon.className == "bx bxs-moon" ? "bx bx-moon" : "bx bxs-moon";
});
