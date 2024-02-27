// powered by https://github.com/Vinishireis //

// GENERATORS //

function $btns(buttons) {
  return buttons.map(({ href, label, primary }) => {
    let _attrs = {
      href,
      target: "__blank",
      class: `Vinishireis-profile__button ${
        primary ? "Vinishireis-profile__button--primary" : ""
      }`
    };
    return createElement("a", _attrs, label);
  });
}
function $skills(skills) {
  return skills.map((skill) => {
    let _attrs = { class: "Vinishireis-profile__skills_item" };
    return createElement("li", _attrs, skill);
  });
}

function generateCard({
  badge,
  avatar,
  name,
  city,
  description: desc,
  buttons,
  skills
}) {
  // selectors
  const $_pro = query("#profile-pro");
  const $_pic = query("#profile-pic");
  const $_name = query("#profile-name");
  const $_city = query("#profile-city");
  const $_desc = query("#profile-desc");
  const $_btns = query("#profile-buttons");
  const $_skills = query("#profile-skills");

  // appends
  append($_pro, badge);
  $_pic.setAttribute("src", avatar);
  $_pic.setAttribute("alt", name);
  append($_name, name);
  append($_city, city);
  append($_desc, desc);
  append($_btns, $btns(buttons));
  append($_skills, $skills(skills));
}

function $meta(data) {
  let _data = _.map(data, (value, key) => ({ key, value }));
  let $_meta = createElement("meta", null, null);
  _data.map(({ key, value }) => {
    $_meta.setAttribute(key, value);
  });
  return $_meta;
}

function $theme($_element, theme) {
  let regex = /--theme_([\w\s\d]{0,})$/gi;
  $_element.className = $_element.className.replace(regex, `--theme_${theme}`);
}

function generateMeta({
  theme,
  title,
  favicon,
  description: desc,
  ogImage: og
}) {
  const $_head = document.head;
  const $_profile = document.querySelector("#profile");
  $theme($_profile, theme);

  document.title = title;
  append($_head, createElement("link", { rel: "icon", href: favicon }, null));
  append($_head, $meta({ name: "description", content: desc }));
  append($_head, $meta({ property: "og:title", content: title }));
  append($_head, $meta({ property: "og:description", content: desc }));
  append($_head, $meta({ property: "og:image", content: og }));
}

function generate({ metadata, body }) {
  generateCard(body);
  generateMeta(metadata);
}

// GENERATE //

const __image = `https://avatars.githubusercontent.com/u/95651095?v=4`;
const dataset = {
  metadata: {
    theme: "light", // light | dark | violet | ''
    title: "Vinishireis - Fullstack Developer",
    description: "Vinishireis - Fullstack Developer",
    favicon: __image,
    ogImage: __image
  },
  body: {
    badge: "Dev",
    avatar: __image,
    name: " Vinishireis",
    city: "Brazil",
    description: "Junior Developer",
    buttons: [
      {
        primary: false,
        label: "Instagram",
        href: "https://www.instagram.com/vinishireis_ai/"
      },
      { primary: true, label: "GitHub", href: "https://github.com/Vinishireis" }
    ],
    skills: [
      "Javascript",
      "Typescript",
      "ReactJS",
      "HTML / CSS",
      "SCSS",
      "Flutter",
      "Pyhton"

    ]
  }
};

generate(dataset);

// theme-select //

const $_theme = document.querySelector("#app-themes");
$_theme.onchange = function ({ target: { value } }) {
  // dataset.metadata.theme = value;
  $theme(document.querySelector("#profile"), value);
};