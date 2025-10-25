const team = [
  {
    name: "Shohjahon Ataboyev",
    role: "Frontend dasturchi (JavaScript)",
    img: "https://cdn.pixabay.com/photo/2016/03/26/13/09/man-1281562_1280.jpg",
    about: "Saytning JavaScript va interaktiv qismlarini ishlab chiqqan."
  },
  {
    name: "Nuriddin Abdusharipov",
    role: "HTML/CSS Dizayner",
    img: "https://cdn.pixabay.com/photo/2017/01/31/13/14/computer-2026445_1280.jpg",
    about: "Saytning tuzilishi va dizaynini ishlab chiqqan."
  },
  {
    name: "Saparboyev Maqsadbek",
    role: "Backend va kontent muharriri",
    img: "https://cdn.pixabay.com/photo/2019/11/09/14/34/programmer-4610828_1280.jpg",
    about: "Kontentni joylashtirib, sayt ma'lumotlarini to‘liqlashtirgan."
  }
];

const container = document.getElementById("team");

team.forEach(member => {
  const card = document.createElement("div");
  card.classList.add("card");

  card.innerHTML = `
    <img src="${member.img}" alt="${member.name}">
    <h2>${member.name}</h2>
    <p class="role">${member.role}</p>
    <p>${member.about}</p>
  `;

  container.appendChild(card);
});
