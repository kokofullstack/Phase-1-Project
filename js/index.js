const dropList = document.querySelectorAll('.drop-list select');
fromCurrency = document.querySelector('.from select');
toCurrency = document.querySelector('.to select');
getButton = document.querySelector('form button');

for (let i = 0; i < dropList.length; i++) {
  for (let currencyCode in countryCode) {
    //selecting USD and MYR by default
    let selected =
      i == 0
        ? currencyCode == 'USD'
          ? 'selected'
          : ''
        : currencyCode == 'MMK'
        ? 'selected'
        : '';
    //creating currency code as a text and value
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    // inserting option tag
    dropList[i].insertAdjacentHTML('beforeend', optionTag);
  }
  // dropList[i].addEventListener('change', (e) => {
  //   loadFlag(e.target);
  // });
}

window.addEventListener('onload', () => {
  getExchangeRate();
});

getButton.addEventListener('click', (e) => {
  e.preventDefault();
  //preventing form from submitting
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector('.amount input');
  exchangeRateTxt = document.querySelector('.exchange-rate');
  let amountVal = amount.value;
  //default value is 1 if user don't enter any value or 0
  if (amountVal == '' || amountVal == '0') {
    amount.value = '1';
    amountVal = 1;
  }
  exchangeRateTxt.innerText = 'Getting exchange rate...';
  let url = `https://open.er-api.com/v6/latest/USD${fromCurrency.value}`;
  //fetching api response
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      const exchangeRateTxt = document.querySelector('.exchange-rate');
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    });
}
