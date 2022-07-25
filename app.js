//variables

class Insurance {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }
  //calculate
  calculateQuotation(insurance) {
    let price;
    const base = 2000;

    const make = insurance.make;
    switch (make) {
      case "american":
        price = base * 1.15;
        break;
      case "asian":
        price = base * 1.05;
        break;
      case "european":
        price = base * 1.135;
    }
    const year = insurance.year;
    const difference = this.getYearsDifference(year);
    price = price - (difference * 3 * price) / 100;
    const level = insurance.level;
    price = this.calculateLevel(price, level);
    return price;
  }
  // calculate year difference
  getYearsDifference(year) {
    return new Date().getFullYear() - year;
  }
  calculateLevel(price, level) {
    if (price === "basic") {
      price = price * 1.3;
    } else {
      price = price * 1.5;
    }
    return price;
  }
}
class HTMLUI {
  displayYears() {
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYears = document.getElementById("year");
    for (let i = min; i <= max; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      selectYears.appendChild(option);
    }
  }
  displayError(message) {
    const div = document.createElement("div");
    div.classList = "error";
    div.innerHTML = `<p>${message}</p>`;
    form.insertBefore(div, document.querySelector(".form-group"));
    setTimeout(function () {
      document.querySelector(".error").remove();
    }, 3000);
  }
  showResult(price, insurance) {
    const result = document.getElementById("result");
    const div = document.createElement("div");

    div.innerHTML = `
           <p class='header'>Summary</p>    
           <p class='total'>Total: $ ${price}</P>
           <p class='total'>Make:  ${insurance.make}</P>
           <p class='total'>Level:  ${insurance.level}</P>
           <p class='total'>Year:  ${insurance.year}</P>
           `;
    const spinner = document.querySelector('#loading img');
    spinner.style.display = "block";
    setTimeout(function () {
      spinner.style.display = "none";
      result.appendChild(div);
    }, 3000);
  }
}

const form = document.getElementById("request-quote");
const html = new HTMLUI();

eventlisteners();
function eventlisteners() {
  document.addEventListener("DOMContentLoaded", function () {
    html.displayYears();
  });
  //when form is submitted
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const make = document.getElementById("make").value;
    const year = document.getElementById("year").value;
    const level = document.querySelector('input[name="level"]').value;
    //display error
    if (make === "" || year === "" || level === "") {
      html.displayError("All Fields are madatory");
    } else {
      const prevResult = document.querySelector("#result div");
      if (prevResult != null) {
        prevResult.remove();
      }
      const insurance = new Insurance(make, year, level);
      const price = insurance.calculateQuotation(insurance);
      html.showResult(price, insurance);
    }
  });
}


