const dropList = document.querySelectorAll('.drop-list select');

for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_code) {
    //selecting USD and MYR by default
    let selected =
      i == 0
        ? currency_code == 'USD'
          ? 'selected'
          : ''
        : currency_code == 'MYR'
        ? 'selected'
        : '';
    //creating currency code as a text and value
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    // inserting option tag
    dropList[i].insertAdjacentHTML('beforeend', optionTag);
  }
  dropList[i].addEventListener('change', (e) => {
    loadFlag(e.target);
  });
}
