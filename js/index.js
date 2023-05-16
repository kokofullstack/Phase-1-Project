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
  dropList[i].addEventListener('change', (e) => {
    loadFlag(e.target);
    //calling load flag
  });
}

function loadFlag(element) {
  for (code in countryCode) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector('img');
      // selecting flag img tag
      imgTag.src = `https://flagsapi.com/${countryCode[code]}/shiny/64.png`;
      //passing img from url
    }
  }
}

window.addEventListener('load', () => {
  getExchangeRate();
});

getButton.addEventListener('click', (e) => {
  e.preventDefault();
  //preventing form from submitting
  conversionHistory(); //test1
  getExchangeRate();
});

const exchangeIcon = document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener('click', () => {
  let tempCode = fromCurrency.value; //temp currency code of From drop list
  fromCurrency.value = toCurrency.value; // passing To currency code to From currency Code
  toCurrency.value = tempCode; // passing temp code to To currency code
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate() {
  const amount = document.querySelector('.amount input');
  const exchangeRateTxt = document.querySelector('.exchange-rate');
  let amountVal = amount.value;
  //default value is 1 if user don't enter any value or 0
  if (amountVal == '' || amountVal == '0') {
    amount.value = '1';
    amountVal = 1;
  }
  exchangeRateTxt.innerText = 'Getting exchange rate...';
  let url = `https://open.er-api.com/v6/latest/${fromCurrency.value}`;
  //fetching api response
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
      const exchangeRateTxt = document.querySelector('.exchange-rate');
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = 'Something went wrong';
    });
}

function conversionHistory() {
  //list the history of conversion
  const exchangeRateTxt = document.querySelector('.exchange-rate');
  let p = document.createElement('p');
  let btn = document.createElement('button');
  btn.addEventListener('click', handleDelete);
  btn.textContent = ' X ';
  p.textContent = `${exchangeRateTxt.innerText} `;
  p.appendChild(btn);
  console.log(p);
  document.querySelector('.wrapper').appendChild(p);
}

function handleDelete(e) {
  e.target.parentNode.remove();
}
//remove the handle from conversionHistory
