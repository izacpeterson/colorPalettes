/** @format */

class pallete {
  constructor(name, pal, id) {
    this.name = name;
    this.palette = pal;
    this.id = paletteArray.length;
  }
}
let paletteArray = [];
let newPal = [];
newPal = JSON.parse(localStorage.getItem("paletteArray")).palettes;

console.log(newPal.palettes);
newPal.forEach((pal) => {
  paletteArray.push(new pallete(pal.name, pal.palette));
});

let navbarItems = [
  { name: "Home", url: "/index.html" },
  { name: "New Palette", url: "/newPalette.html" },
];

function activePage() {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("col");
  console.log(myParam);
  return myParam;
}

Vue.component("palette-item", {
  props: ["pal"],
  template: `<li class='card'>
  <h1>{{pal.name}}</h1>
  <div class="palette">
  <color-item v-for="col in pal.palette" v-bind:col="col"></color-item>
  </div>
  <form action="/edit.html"><button type="submit" name="col" v-bind:value="pal.id">Edit</button></form>
  </li>`,
});
Vue.component("color-item", {
  props: ["col"],
  template: "<span class='color' v-bind:style='{backgroundColor:col}'></span>",
});

Vue.component("navbar", {
  props: ["link"],
  template: "<a v-bind:href='link.url' class='navItem'>{{link.name}}</a>",
});

var app = new Vue({
  el: "#app",
  data: {
    palettes: paletteArray,
    blank: {
      name: "new pal",
      palette: ["#000", "#000", "#000", "#000", "#000"],
    },
    navbar: navbarItems,
    editing: activePage(),
  },
  methods: {
    newPalette: function () {
      paletteArray.push(
        new pallete("New Palette", ["#111", "#222", "#333", "#444", "#555"])
      );
      console.log(paletteArray);
      // save();
    },
    savePalette: function () {
      localStorage.setItem(
        "paletteArray",
        JSON.stringify({ palettes: paletteArray })
      );
    },
  },
});

function rando(num) {
  for (let i = 0; i < num; i++) {
    let newCol = [];
    for (let j = 0; j < 5; j++) {
      newCol.push(
        `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
          Math.random() * 255
        )},${Math.floor(Math.random() * 255)})`
      );
    }
    console.log(newCol);
    paletteArray.push(new pallete("i", newCol));
  }
  app.savePalette();
}
function reset() {
  localStorage.clear();
  localStorage.setItem(
    "paletteArray",
    JSON.stringify({
      palettes: [
        {
          name: "palette-1",
          palette: ["#363537", "#9BC53D", "#3F7CAC", "#D62246", "#E7E6F7"],
        },
        {
          name: "palette-2",
          palette: ["#2C3E50", "#E74C3C", "#ECF0F1", "#3498DB", "#2980B9"],
        },
      ],
    })
  );
}
