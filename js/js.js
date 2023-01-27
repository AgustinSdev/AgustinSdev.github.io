const d = document;
const $box = d.querySelector(".box");
const $box2 = d.querySelector(".box2");
const $footer = d.querySelector(".footer");
$body = d.querySelector("body");
let limit = 9;
let from = 1;
//pokemon search form
const $pokemon__input = d.querySelector("#pokemon__input");
const $pokemon__search = d.querySelector(".pokemon__search--btn");
async function searchPokemon() {
  $box2.style.display = "flex";
  $box.style.display = "none";
  $box2.classList.remove("notFound");

  $body.style.position = "inherit";
  $footer.style.position = "relative";
  const value = d.getElementById("pokemon__input").value;
  await fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then((res) => res.json())
    .then((data) => pokemonSearch(data))
    .catch((err) => renderNotFound(err));
}
const pokemonSearch = (data) => {
  const { types } = data;
  //figcaption
  const $pokemon_figure = d.createElement("figcaption");
  $pokemon_figure.classList.add("pokemon__figure");
  //pokemon__img--container
  const $pokemon__img__container = d.createElement("div");
  $pokemon__img__container.classList.add("pokemon__img--container");
  const $pokemon__img = d.createElement("img");
  $pokemon__img.src = data.sprites.other.home.front_default;
  //pokemon exp types abilities
  const $pokemon__data__container = d.createElement("div");
  $pokemon__data__container.classList.add("pokemon__data--container");
  const $pokemon__exp = d.createElement("h1");
  $pokemon__exp.textContent = `Base XP - ${data.base_experience}`;
  //pokemon id
  const $pokemon__id = d.createElement("div");
  $pokemon__id.classList.add("pokemon__id");
  $pokemon__id.textContent = `#${data.id.toString().padStart(3, 0)}`;
  //pokemon name
  const $pokemon__name = d.createElement("div");
  $pokemon__name.classList.add("pokemon__name");
  $pokemon__name.textContent = data.name;
  //pokemon stats
  const $pokemon__stats = d.createElement("div");
  $pokemon__stats.classList.add("pokemon__stats");
  const $stat_hp = d.createElement("p");
  $stat_hp.classList.add("pokemon__hp");
  const $stat_dmg = d.createElement("p");
  $stat_dmg.classList.add("pokemon__dmg");
  const $stat_def = d.createElement("p");
  $stat_def.classList.add("pokemon__def");
  $stat_hp.textContent = `HP ${data.stats[0].base_stat}`;
  $stat_dmg.textContent = `DMG ${data.stats[1].base_stat}`;
  $stat_def.textContent = `DEF ${data.stats[2].base_stat}`;
  $pokemon__stats.appendChild($stat_hp);
  $pokemon__stats.appendChild($stat_dmg);
  $pokemon__stats.appendChild($stat_def);

  ////////////////////////////
  ////////////////////////////
  ////////////////////////////
  ////////////////////////////

  ////////////////////////////
  ////////////////////////////
  ////////////////////////////
  $pokemon_figure.appendChild($pokemon__id);
  $pokemon_figure.appendChild($pokemon__name);
  $pokemon__img__container.appendChild($pokemon__img);
  $pokemon__data__container.appendChild($pokemon__exp);
  $pokemon__data__container.appendChild(renderT(data.types));
  $pokemon__data__container.appendChild(renderA(data.abilities));
  $pokemon__data__container.appendChild($pokemon__stats);
  $pokemon_figure.appendChild($pokemon__img__container);
  $pokemon_figure.appendChild($pokemon__data__container);
  $box2.appendChild($pokemon_figure);
  //colors
  const renderColors = (types) => {
    const primaryBg = types__bg[types[0].type.name];
    const secondaryBg = types[1]
      ? types__bg[types[1].type.name]
      : types__bg.default;
    $pokemon__img__container.style.background = `linear-gradient(286deg, ${secondaryBg} 20%, ${primaryBg} 80%, #212121 100%)`;
  };
  renderColors(types);
};
const renderT = (types) => {
  const $types__container = d.createElement("div");
  $types__container.textContent = "TYPES";
  $types__container.classList.add("pokemon__types--container");
  types.forEach((type) => {
    const typeText = document.createElement("p");

    typeText.textContent = `${type.type.name}`;
    $types__container.appendChild(typeText);
  });
  return $types__container;
};
const types__b = {
  normal: "#abac87",
  fire: "#ff9400",
  fighting: "#ff0000",
  water: "#39a5ff",
  flying: "#9f72ff",
  grass: "#06d700",
  poison: "#9a00d7",
  electric: "#ffef2c",
  ground: "#d9c13c",
  psychic: "#c9437d",
  rock: "#aa8210",
  ice: "#a4ffff",
  bug: "#b6cb00",
  dragon: "#5a00c2",
  ghost: "#5c4873",
  dark: "#524a2e",
  steel: "#b8b8b8",
  fairy: "#ffa7c7",
  default: "#ededed",
};
const renderA = (abilities) => {
  const $pokemon__abilities = d.createElement("div");
  $pokemon__abilities.textContent = "ABILITIES";
  $pokemon__abilities.classList.add("pokemon__abilities--container");
  abilities.forEach((ability) => {
    const abilityText = document.createElement("p");
    abilityText.textContent = ability.ability.name;
    $pokemon__abilities.appendChild(abilityText);
  });
  return $pokemon__abilities;
};

const renderNF = () => {
  poke__name.textContent = "Not found";
  poke__name.style.background =
    "linear-gradient(286deg, rgba(255,255,255,1) 2%, rgba(245,85,85,1) 50%, rgba(115,0,0,1) 98%)";
  poke__img.setAttribute("src", "/img/notfound.png");
  poke__img.classList.add("pokemon__notfound");
  poke__figure.style.background =
    "linear-gradient(286deg, rgba(255,255,255,1) 2%, rgba(245,85,85,1) 50%, rgba(115,0,0,1) 98%)";
  poke__types.innerHTML = "";
  poke__stats.innerHTML = "";
  poke__id.textContent = "Error not found";
  poke__id.style.background =
    "linear-gradient(286deg, rgba(255,255,255,1) 2%, rgba(245,85,85,1) 50%, rgba(115,0,0,1) 98%)";
};
$pokemon__input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    return false;
  }
});
$pokemon__search.addEventListener("click", (e) => {
  e.preventDefault();
  $box2.innerHTML = "";
  searchPokemon();
});
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//pokemon index
async function search(id) {
  $box2.style.display = "none";
  await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((res) => res.json())
    .then((data) => renderPokemon(data));
}

function pokemon(from, limit) {
  for (let i = from; i <= from + limit; i++) {
    search(i);
  }
}
const renderPokemon = (data) => {
  const { types } = data;
  //figcaption
  const $pokemon_figure = d.createElement("figcaption");
  $pokemon_figure.classList.add("pokemon__figure");
  //pokemon__img--container
  const $pokemon__img__container = d.createElement("div");
  $pokemon__img__container.classList.add("pokemon__img--container");
  const $pokemon__img = d.createElement("img");
  $pokemon__img.src = data.sprites.other.home.front_default;
  //pokemon exp types abilities
  const $pokemon__data__container = d.createElement("div");
  $pokemon__data__container.classList.add("pokemon__data--container");
  const $pokemon__exp = d.createElement("h1");
  $pokemon__exp.textContent = `Base XP - ${data.base_experience}`;
  //pokemon id
  const $pokemon__id = d.createElement("div");
  $pokemon__id.classList.add("pokemon__id");
  $pokemon__id.textContent = `#${data.id.toString().padStart(3, 0)}`;
  //pokemon name
  const $pokemon__name = d.createElement("div");
  $pokemon__name.classList.add("pokemon__name");
  $pokemon__name.textContent = data.name;
  //pokemon stats
  const $pokemon__stats = d.createElement("div");
  $pokemon__stats.classList.add("pokemon__stats");
  const $stat_hp = d.createElement("p");
  $stat_hp.classList.add("pokemon__hp");
  const $stat_dmg = d.createElement("p");
  $stat_dmg.classList.add("pokemon__dmg");
  const $stat_def = d.createElement("p");
  $stat_def.classList.add("pokemon__def");
  $stat_hp.textContent = `HP ${data.stats[0].base_stat}`;
  $stat_dmg.textContent = `DMG ${data.stats[1].base_stat}`;
  $stat_def.textContent = `DEF ${data.stats[2].base_stat}`;
  $pokemon__stats.appendChild($stat_hp);
  $pokemon__stats.appendChild($stat_dmg);
  $pokemon__stats.appendChild($stat_def);

  ////////////////////////////
  ////////////////////////////
  ////////////////////////////
  $pokemon_figure.appendChild($pokemon__id);
  $pokemon_figure.appendChild($pokemon__name);
  $pokemon__img__container.appendChild($pokemon__img);
  $pokemon__data__container.appendChild($pokemon__exp);
  $pokemon__data__container.appendChild(renderTypes(data.types));
  $pokemon__data__container.appendChild(renderAbilities(data.abilities));
  $pokemon__data__container.appendChild($pokemon__stats);
  $pokemon_figure.appendChild($pokemon__img__container);
  $pokemon_figure.appendChild($pokemon__data__container);
  $box.appendChild($pokemon_figure);
  //colors
  const renderColors = (types) => {
    const primaryBg = types__bg[types[0].type.name];
    const secondaryBg = types[1]
      ? types__bg[types[1].type.name]
      : types__bg.default;
    $pokemon__img__container.style.background = `linear-gradient(286deg, ${secondaryBg} 20%, ${primaryBg} 80%, #212121 100%)`;
  };
  renderColors(types);
};
const renderTypes = (types) => {
  const $types__container = d.createElement("div");
  $types__container.textContent = "TYPES";
  $types__container.classList.add("pokemon__types--container");
  types.forEach((type) => {
    const typeText = document.createElement("p");

    typeText.textContent = `${type.type.name}`;
    $types__container.appendChild(typeText);
  });
  return $types__container;
};
const types__bg = {
  normal: "#abac87",
  fire: "#ff9400",
  fighting: "#ff0000",
  water: "#39a5ff",
  flying: "#9f72ff",
  grass: "#06d700",
  poison: "#9a00d7",
  electric: "#ffef2c",
  ground: "#d9c13c",
  psychic: "#c9437d",
  rock: "#aa8210",
  ice: "#a4ffff",
  bug: "#b6cb00",
  dragon: "#5a00c2",
  ghost: "#5c4873",
  dark: "#524a2e",
  steel: "#b8b8b8",
  fairy: "#ffa7c7",
  default: "#ededed",
};
const renderAbilities = (abilities) => {
  const $pokemon__abilities = d.createElement("div");
  $pokemon__abilities.textContent = "ABILITIES";
  $pokemon__abilities.classList.add("pokemon__abilities--container");
  abilities.forEach((ability) => {
    const abilityText = document.createElement("p");
    abilityText.textContent = ability.ability.name;
    $pokemon__abilities.appendChild(abilityText);
  });
  return $pokemon__abilities;
};
const renderNotFound = () => {
  const $notFoundtext = d.createElement("span");
  $notFoundtext.textContent = "There's NOTHING here..";
  $box2.appendChild($notFoundtext);
  const $notFound = d.createElement("img");
  $notFound.setAttribute("src", "/img/notfound.png");
  $box2.appendChild($notFound);
  $box2.classList.add("notFound");
  $box2.style.display = "flex";
  $body.style.position = "inherit";
  $footer.style.position = "absolute";
  $footer.style.bottom = 0;
};

pokemon(from, limit);
