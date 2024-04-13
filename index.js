const gross = document.getElementById("gross");
const result = document.getElementById("resultDiv");
const form = document.getElementById("form");
const extra = document.getElementById("extra");
const age = document.getElementById("age");
const deductions = document.getElementById("deductions");
const resultAmt = document.getElementById("resultAmt");
const btn = document.getElementById("submitBtn");
const close = document.getElementById("closeBtn");
const deductionsExclam = document.getElementById("deductionsExclam");
const grossExclam = document.getElementById("grossExclam");
const extraExclam = document.getElementById("extraExclam");
const grossInfoIcon = document.getElementById("grossInfoIcon");
const grossInfo = document.getElementById("grossInfo");
const extraInfo = document.getElementById("extraInfo");
const extraInfoIcon = document.getElementById("extraInfoIcon");
const deductionsInfo = document.getElementById("deductionsInfo");
const deductionsInfoIcon = document.getElementById("deductionsInfoIcon");
const ageInfo = document.getElementById("ageInfo");
const ageInfoIcon = document.getElementById("ageInfoIcon");
const errorInfoDeductions = document.getElementById("errorInfoDeductions");
const errorInfoGross = document.getElementById("errorInfoGross");
const errorInfoExtra = document.getElementById("errorInfoExtra");
let grossForward = false;
let extraForward = false;
let deductionsForward = false;

grossInfoIcon.addEventListener("mouseenter", () => {
  grossInfo.classList.add("grossInfoShow");
});

grossInfoIcon.addEventListener("mouseleave", () => {
  grossInfo.classList.remove("grossInfoShow");
});

extraInfoIcon.addEventListener("mouseenter", () => {
  extraInfo.classList.add("grossInfoShow");
});

extraInfoIcon.addEventListener("mouseleave", () => {
  extraInfo.classList.remove("grossInfoShow");
});

deductionsInfoIcon.addEventListener("mouseenter", () => {
  deductionsInfo.classList.add("grossInfoShow");
});

deductionsInfoIcon.addEventListener("mouseleave", () => {
  deductionsInfo.classList.remove("grossInfoShow");
});

ageInfoIcon.addEventListener("mouseenter", () => {
  ageInfo.classList.add("grossInfoShow");
});

ageInfoIcon.addEventListener("mouseleave", () => {
  ageInfo.classList.remove("grossInfoShow");
});

deductionsExclam.addEventListener("mouseenter", () => {
  errorInfoDeductions.classList.add("errorInfoShow");
});

deductionsExclam.addEventListener("mouseleave", () => {
  errorInfoDeductions.classList.remove("errorInfoShow");
});

grossExclam.addEventListener("mouseenter", () => {
  errorInfoGross.classList.add("errorInfoShow");
});

grossExclam.addEventListener("mouseleave", () => {
  errorInfoGross.classList.remove("errorInfoShow");
});

extraExclam.addEventListener("mouseenter", () => {
  errorInfoExtra.classList.add("errorInfoShow");
});

extraExclam.addEventListener("mouseleave", () => {
  errorInfoExtra.classList.remove("errorInfoShow");
});

function onlyNum(str) {
  for (let i = 0; i < str.length; i++) {
    if (!(str.charAt(i) >= "0" && str.charAt(i) <= "9")) {
      return false;
    }
  }
  return true;
}

function calcTax() {
  const grossValue = Number(gross.value);
  const extraValue = Number(extra.value);
  const ageValue = age.value;
  const deductionsValue = Number(deductions.value);
  let total = grossValue + extraValue - deductionsValue;
  let tax = 0;
  if (total > 800000) {
    const remainAmt = total - 800000;
    if (ageValue === "40") tax = 0.3 * remainAmt;
    else if (ageValue === "60") tax = 0.4 * remainAmt;
    else tax = 0.1 * remainAmt;
  }
  resultAmt.innerText = (total - tax).toFixed("2").toLocaleString();
}

gross.addEventListener("input", () => {
  const grossValue = gross.value;
  if (!onlyNum(grossValue)) {
    grossExclam.classList.add("showExclam");
    grossForward = false;
    return;
  } else {
    grossExclam.classList.remove("showExclam");
    grossForward = true;
  }
});

extra.addEventListener("input", () => {
  const extraValue = extra.value;
  if (!onlyNum(extraValue)) {
    extraExclam.classList.add("showExclam");
    extraForward = false;
    return;
  } else {
    extraExclam.classList.remove("showExclam");
    extraForward = true;
  }
});

deductions.addEventListener("input", () => {
  const deductionsValue = deductions.value;
  if (!onlyNum(deductionsValue)) {
    deductionsExclam.classList.add("showExclam");
    deductionsForward = false;
    return;
  } else {
    deductionsExclam.classList.remove("showExclam");
    deductionsForward = true;
  }
});

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (deductionsForward && extraForward && grossForward) {
    if (age.value === "") {
      alert("Selecting age range is mandatory");
      return;
    }
    form.classList.add("formDivHide");
    result.classList.add("showHide");
    deductionsExclam.classList.remove("showExclam");
    extraExclam.classList.remove("showExclam");
    grossExclam.classList.remove("showExclam");
    calcTax();
    form.reset();
  } else {
    return;
  }
});

close.addEventListener("click", () => {
  form.classList.remove("formDivHide");
  result.classList.remove("showHide");
});
