const TOTAL_CREATIVES = 5;

fetch("https://random-flat-colors.vercel.app/api/random?count=6")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    document.getElementById("color-skeleton").style.display = "none";
    document.getElementById("color-container").style.display = "flex";
    document.getElementById("drawer-color-container").style.display = "flex";
    res.colors.map((color) => {
      const colorElement = document.createElement("div");
      colorElement.classList.add("color-circle");
      colorElement.style.backgroundColor = color;
      colorElement.onclick = handleFilterColorClick;
      document.getElementById("color-body").appendChild(colorElement);
      const drawercolorElement = document.createElement("div");
      drawercolorElement.classList.add("color-circle");
      drawercolorElement.style.backgroundColor = color;
      drawercolorElement.onclick = handleColorClick;
      document
        .getElementById("drawer-color-body")
        .appendChild(drawercolorElement);
    });
  });

function handleAddingCreative() {
  document.getElementById("drawer").classList.add("modal-open");
  document.getElementById("title").focus();
  document.getElementById("creative-button").setAttribute("disabled", true);
}

function handleModalClose() {
  document.getElementById("drawer").classList.remove("modal-open");
  document.getElementById("creative-button").removeAttribute("disabled");
}

function handleColorClick() {
  document.querySelectorAll(".color-circle").forEach((el) => {
    if (el.classList.contains("color-selected")) {
      el.classList.remove("color-selected");
      el.removeAttribute("id");
    }
  });
  event.target.classList.add("color-selected");
  event.target.id = "color-selected";
  if (
    document.getElementById("title").value.trim() !== "" &&
    document.getElementById("subtitle").value.trim() !== ""
  ) {
    document.getElementById("done-button").removeAttribute("disabled");
  }
}

function handleFilterColorClick() {
  document.getElementById("filter-input").value = "";
  document.querySelectorAll(".color-circle").forEach((el) => {
    if (el.classList.contains("color-selected")) {
      el.classList.remove("color-selected");
      el.removeAttribute("id");
    }
  });
  event.target.classList.add("color-selected");
  event.target.id = "color-selected";
  document.querySelectorAll(".creative-box").forEach((el) => {
    if (el.style.backgroundColor !== event.target.style.backgroundColor)
      el.style.display = "none";
    else el.style.display = "flex";
  });
}

function handleFilterTitle() {
  const colorFilterApplied = document.getElementById("color-selected");
  if (colorFilterApplied) {
    colorFilterApplied.classList.remove("color-selected");
    colorFilterApplied.removeAttribute("id");
  }
  const text = document.getElementById("filter-input").value;
  document.querySelectorAll(".creative-box").forEach((el) => {
    if (el.textContent.includes(text)) el.style.display = "flex";
    else el.style.display = "none";
  });
}

function handleTitle() {
  let colorSelected;
  document.querySelectorAll(".color-circle").forEach((el) => {
    if (el.classList.contains("color-selected")) {
      colorSelected = true;
    }
  });
  if (
    document.getElementById("title").value.trim() === "" ||
    document.getElementById("subtitle").value.trim() === ""
  ) {
    document.getElementById("done-button").setAttribute("disabled", true);
  }
  if (
    document.getElementById("title").value.trim() !== "" &&
    document.getElementById("subtitle").value.trim() !== "" &&
    colorSelected
  ) {
    document.getElementById("done-button").removeAttribute("disabled");
  }
}

function handleDone() {
  document.getElementById("drawer").classList.remove("modal-open");
  const creativeCount = document.querySelectorAll(".creative-box").length;
  if (creativeCount !== TOTAL_CREATIVES - 1)
    document.getElementById("creative-button").removeAttribute("disabled");
  const boxElement = document.createElement("div");
  boxElement.classList.add("creative-box");
  const color = document.getElementById("color-selected").style.backgroundColor;
  boxElement.style.backgroundColor = color;
  const rgbArray = color.substring(4, color.length - 1).split(",");
  const textColor =
    rgbArray[0] * 0.299 + rgbArray[1] * 0.587 + rgbArray[2] * 0.114 > 186
      ? "#000000"
      : "#ffffff";
  console.log("ele", rgbArray, textColor);
  boxElement.style.color = textColor;
  boxElement.innerHTML = `
  <h2>${document.getElementById("title").value}</h2>
  <h3>${document.getElementById("subtitle").value}</h3>`;
  document.getElementById("content").appendChild(boxElement);
  document.getElementById("title").value = "";
  document.getElementById("subtitle").value = "";
  document.getElementById("color-selected").classList.remove("color-selected");
  document.getElementById("color-selected").removeAttribute("id");
  document.getElementById("done-button").setAttribute("disabled", true);
  document.getElementById("creative-count").innerHTML = `${
    creativeCount + 1
  } / ${TOTAL_CREATIVES} Creatives`;
  console.log("wid", `${creativeCount + 1}` / `${TOTAL_CREATIVES}`);
  document.getElementById("bar-item").style.width =
    (`${creativeCount + 1}` / `${TOTAL_CREATIVES}`) * 100 + "%";
}
