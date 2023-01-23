
const elements = [...document.querySelectorAll("input")].reduce((acc, e) => {
    acc[e.id] = e;
    acc[e.id] = {
        element: e,
        value: parseFloat(e.value)
    }
    document.addEventListener("input", valueChanged)
    return acc;
}, {});
calculate();

function valueChanged(e) {
    if (e.target.value !== elements[e.target.id].value) {
        elements[e.target.id].value = parseFloat(e.target.value);
        calculate()
    }
}

function calculate() {
    const deposit = elements['deposit'].value;
    const mortgage = elements['price'].value - deposit;

    elements['mortgage-calculation'].value = mortgage;
    elements['mortgage-calculation'].element.value = mortgage;
    const depositCost = parseFloat((mortgage - elements["deeds"].value) * .02).toFixed(2)
    elements['deposit-cost'].element.value = depositCost;
    elements['deposit-cost'].value = depositCost;

    const stampDuty = .015 * elements['price'].value
    elements['stamp-duty'].value = stampDuty;
    elements['stamp-duty'].element.value = stampDuty;

    const depositMinimum = elements['price'].value * .15;
    elements['deposit-minimum'].value = depositMinimum;
    elements['deposit-minimum'].element.value = depositMinimum;

    const interestPerMonth = ((2000000 * elements['employee-mortgage-rate'].value + (mortgage - 2000000) * elements['mortgage-rate'].value) / 12) / 100;
    elements['interest-cost-per-month'].value = interestPerMonth;
    elements['interest-cost-per-month'].element.value = interestPerMonth;

    const depositAndTaxes = parseFloat(depositCost) + stampDuty + deposit;
    elements['deposit-and-taxes'].value = depositAndTaxes;
    elements['deposit-and-taxes'].element.value = depositAndTaxes;

    const monthlyCost = amortizationInPercent(mortgage);


    elements['interest-cost'].value = interestPerMonth;
    elements['interest-cost'].element.value = parseFloat(interestPerMonth).toFixed(4);
    const drift = parseFloat(elements['driftkostnad'].value / 12).toFixed(4);
    elements['other-expenses'].value = drift
    elements['other-expenses'].element.value = drift;
    console.log(drift)
    elements['monthly-cost'].element.value = parseFloat(monthlyCost + parseFloat(interestPerMonth) + parseFloat(drift)).toFixed(4);

}

function amortizationInPercent(mortgage) {
    const price = elements['price'].value;
    const salary = elements['salary'].value;
    let result = 0;
    if (mortgage / price >= .7) {
        // .0.2;
        console.log("hit 70%")
        result += .02;
    }
    else if (mortgage / price >= .5) {
        console.log("hit 50%")
        result += .01;

        ///
    }
    if ((salary * 4.5) < mortgage) {
        // 
        console.log("hit salary")
        result += .01;
    }

    elements['amortization-percentage'].value = result;
    elements['amortization-percentage'].element.value = result;

    const monthlyCost = parseFloat(result * mortgage / 12).toFixed(4);
    elements['amortization-cost-per-month'].value = monthlyCost;
    elements['amortization-cost-per-month'].element.value = monthlyCost;

    const debtRatio = parseFloat(mortgage / elements['salary'].value).toFixed(2);
    elements['debt-ratio'].value = debtRatio;
    elements['debt-ratio'].element.value = debtRatio;

    elements['amortization'].value = monthlyCost
    elements['amortization'].element.value = monthlyCost;

    return parseFloat(monthlyCost);
}

function updateValue(element, value) {
    element.value = value;
    element.element.value;
}

