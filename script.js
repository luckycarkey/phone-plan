document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.getElementById("loginButton");
  const signOutButton = document.getElementById("signOutButton");
  const nameInput = document.getElementById("nameInput");
  const numberInput = document.getElementById("numberInput");
  const loginSection = document.getElementById("loginSection");
  const userInfo = document.getElementById("userInfo");
  const userDetails = document.getElementById("userDetails");

  // Function to fetch users from the server
  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://sheet2api.com/v1/Mb6vsH6tSF2k/lucky-daai-ketaa-haru"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Could not fetch users:", error);
    }
  }

  loginButton.addEventListener("click", async function () {
    const name = nameInput.value.trim().toLowerCase();
    const number = parseInt(numberInput.value, 10);
    const users = await fetchUsers();
    const user = users.find(
      (user) => user.name.toLowerCase() === name && user.number === number
    );

    if (user) {
      userDetails.innerHTML = `Name: ${user.name}<br><br>Number: ${user.number}<br><br>Amount: $${user.Amount}<br><br>Notes: ${user.Notes}`;
      loginSection.style.display = "none";
      userInfo.style.display = "block";
    } else {
      alert("Not matched. Please contact the admin.");
    }
  });

  signOutButton.addEventListener("click", function () {
    loginSection.style.display = "block";
    userInfo.style.display = "none";
    nameInput.value = "";
    numberInput.value = "";
  });
});
