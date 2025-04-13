// main.js
const projects = [
   {
      title: "🍔 Food Ordering App",
      description: "A backend for a food ordering app built with Node.js, Express.js, and MongoDB.",
      technologies: ["Node.js", "Express.js", "MongoDB"],
      githubLink: "#",
      Documentation: "#",
   },
   {
      title: "📝 Blog API",
      description: "A RESTful API for a blogging platform built with Node.js and Express.js.",
      technologies: ["Node.js", "Express.js", "MongoDB"],
      githubLink: "#",
      Documentation: "#",
   },
];

const skills = ["Node.js", "Express.js", "MongoDB", "JavaScript", "HTML", "CSS"];

// Insert projects
const projectGrid = document.querySelector(".project-grid");
projects.forEach((project) => {
   const projectCard = document.createElement("div");
   projectCard.className = "project-card";
   projectCard.innerHTML = `
    <h3>${project.title}</h3>
    <p>${project.description}</p>
    <p><strong>Technologies:</strong> ${project.technologies.join(", ")}</p>
    <a href="${project.githubLink}" target="_blank">🔗 GitHub</a>
    <a href="${project.docLink}" target="_blank">🌐 Documentation</a>
  `;
   projectGrid.appendChild(projectCard);
});

// Insert skills
const skillsList = document.querySelector(".skills-list");
skills.forEach((skill) => {
   const skillItem = document.createElement("li");
   skillItem.textContent = skill;
   skillsList.appendChild(skillItem);
});
