const API = {
  courses: "/api/courses",
  deadlines: "/api/deadlines",
  lectures: "/api/lectures"
};

const mockData = {
  courses: [
    { id: 1, title: "HTML", progress: 70 },
    { id: 2, title: "JavaScript Basics", progress: 40 },
    { id: 3, title: "Python Programming", progress: 85 }
  ],
  deadlines: [
    { course: "HTML", due: "10 April" },
    { course: "JavaScript Basics", due: "12 April" },
    { course: "Python Programming", due: "15 April" }
  ],
  lectures: [
    { title: "Intro to JS", url: "video1.mp4" },
    { title: "Functions in JS", url: "video2.mp4" }
  ]
};
function fetchAPI(endpoint) {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockData[endpoint]), 500);
  });
}


fetchAPI("courses").then(data => {
  const container = document.getElementById("courseContainer");

  data.forEach(course => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${course.title}</h3>
      <p>Progress: ${course.progress}%</p>
      <div class="progress-bar">
        <div class="progress" style="width:${course.progress}%"></div>
      </div>
    `;

    container.appendChild(card);
  });
});
fetchAPI("deadlines").then(data => {
  const list = document.getElementById("deadlineList");

  data.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.course} - Due: ${item.due}`;
    list.appendChild(li);
  });
});


fetchAPI("lectures").then(data => {
  const video = document.getElementById("videoPlayer");
  const source = document.getElementById("videoSource");
  const trackList = document.getElementById("trackList");

  
  source.src = data[0].url;
  video.load();

  data.forEach(lecture => {
    const btn = document.createElement("button");
    btn.textContent = lecture.title;

    btn.onclick = () => {
      source.src = lecture.url;
      video.load();
      video.play();
    };

    trackList.appendChild(btn);
  });
});
