const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const message = document.querySelector(".msg");
let amount = document.querySelector(".amount input");

for (let select of dropdowns){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name == "from" && currCode == "USD"){
            newOption.selected = true;
        } else if (select.name == "to" && currCode == "INR"){
            newOption.selected = true;
        }
        select.append(newOption); 
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click", async (evt) =>{
    evt.preventDefault();
    let amt = amount.value;
    if (amt === "" || amt < 1){
        amt = 1;
        amount.value = 1; 
    }
    const URL = `${BASE_URL}/currencies/${fromCurrency.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let initialRate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    let finalRate = amt*initialRate;
    console.log(initialRate);
    console.log(finalRate);
    displayMsg(finalRate, fromCurrency.value, toCurrency.value, initialRate);
})
const displayMsg = (finalRate, fromCurrency, toCurrency, initialRate) =>{
    message.innerText = `${amount.value} ${fromCurrency} = ${finalRate.toFixed(3)} ${toCurrency}`;
}


