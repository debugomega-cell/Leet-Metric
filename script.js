document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("user-input");
  const searchbutton = document.getElementById("search-btn");

  const statscontainer = document.querySelector(".stats");
  const progress = document.querySelector(".progress");

  const easydiv = document.querySelector(".easydiv");
  const harddiv = document.querySelector(".harddiv");
  const mediumdiv = document.querySelector(".mediumdiv");
  const easyprogress = document.querySelector("#easy-label");
  const mediumprogress = document.querySelector("#medium-label");
  const hardprogress = document.querySelector("#hard-label");

  const cardstatscontainer = document.querySelector(".stats-card");

  function validateusername(username) {
    if (username.trim() === "^[a-zA-Z][a-zA-Z0-9_]{2,19}$") {
      //trim removes whitespaces
      alert("INVALID USERNAME");
      return false;
    } else return true;
  }

  async function fetchuserdetails(username) {
    const url = `https://leetcode-stats-api.herokuapp.com/${username}`;

    try {
      searchbutton.textContent = "Searching...";
      searchbutton.disabled = true;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("unable to fetch user detail");
      }

      const data = await response.json();
      console.log("loggin data :", data);
      displayUserdata(data);
      updatecard(data);
    } catch (error) {
      progress.innerHTML = "<p>No data Found</p>";
      console.log(error);
    } finally {
      searchbutton.disabled = false;
      searchbutton.innerHTML = "search";
    }
  }

  function displayUserdata(data) {
    const totalquestion = data.totalQuestion;
    const totaleasysolved = data.easySolved;
    const totaleasyquestion = data.totalEasy;
    const totalmediumsolved = data.mediumSolved;
    const totalmediumquestion = data.totalMedium;
    const totalhardsolved = data.hardSolved;
    const totalhardquestion = data.totalHard;

    const e = (totaleasysolved / totaleasyquestion) * 100;
    const m = (totalmediumsolved / totalmediumquestion) * 100;
    const h = (totalhardsolved / totalhardquestion) * 100;

    const easy = ` ${totaleasysolved} / ${totaleasyquestion} `;
    const medium = ` ${totalmediumsolved} / ${totalmediumquestion}`;
    const hard = `${totalhardsolved} / ${totalhardquestion}`;

    updateprogress(e, m, h, easy, medium, hard);
  }

  function updateprogress(e, m, h, easy, medium, hard) {
    easyprogress.innerHTML = easy;
    hardprogress.innerHTML = hard;
    mediumprogress.innerHTML = medium;
    easydiv.style.setProperty("--progress--degree", `${e}%`);
    harddiv.style.setProperty("--progress--degree", `${h}%`);
    mediumdiv.style.setProperty("--progress--degree", `${m}%`);
  }

  function updatecard(data) {
    cardstatscontainer.innerHTML = "";
    const rank = data.ranking;
    const acceptratio = data.acceptanceRate;
    const points = data.contributionPoints;

    let element1 = document.createElement("p");
    cardstatscontainer.appendChild(element1);
    element1.innerHTML = `Current Ranking : ${rank}`;

    let element2 = document.createElement("p");
    cardstatscontainer.appendChild(element2);
    element2.innerHTML = ` Acceptance Rate : ${acceptratio}`;

    let element3 = document.createElement("p");
    cardstatscontainer.appendChild(element3);
    element3.innerHTML = `Contribution Points : ${points} `;
  }

  searchbutton.addEventListener("click", function () {
    const username = usernameInput.value;
    console.log("login username : ", username);

    if (validateusername(username)) {
      fetchuserdetails(username);
    }
  });
});
