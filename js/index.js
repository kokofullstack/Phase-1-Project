const dropList = document.querySelectorAll('.drop-list select');
getButton = document.querySelectorAll('form button');

for (let i = 0; i < dropList.length; i++) {
  for (let currencyCode in countryCode) {
    //selecting USD and MYR by default
    let selected =
      i == 0
        ? currencyCode == 'USD'
          ? 'selected'
          : ''
        : currencyCode == 'MYR'
        ? 'selected'
        : '';
    //creating currency code as a text and value
    let optionTag = `<option value="${currencyCode}" ${selected}>${currencyCode}</option>`;
    // inserting option tag
    dropList[i].insertAdjacentHTML('beforeend', optionTag);
  }
  dropList[i].addEventListener('change', (e) => {
    loadFlag(e.target);
  });
}

getButton.addEventListener('click', (e) => {
  e.preventDefault();
  //preventing form from submitting
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector('.amount input');
  let amountVal = amount.value;
  if (amountVal == '' || amountVal == '0') {
    amount.value = '1';
    amountVal = 1;
  }
  let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`;
}
