function handleInactive(e, id) {
  const users = JSON.parse(localStorage.getItem("list-user"));
  const chooseUser = users.find((user) => user.id == id);

  if (chooseUser.status.toLowerCase() == "active") {
    chooseUser.status = "Inactive";
  }
  e.nextElementSibling.style.display = "inline-block";
  e.nextElementSibling.innerHTML = chooseUser.status;
  e.style.display = "none";
  users.forEach((user, index) => {
    if (user.id == chooseUser.id) {
      users[index].status = chooseUser.status;
    }
  });
  localStorage.setItem("list-user", JSON.stringify(users));
}
function handleActive(e, id) {
  const users = JSON.parse(localStorage.getItem("list-user"));
  const chooseUser = users.find((user) => user.id == id);

  if (chooseUser.status.toLowerCase() == "inactive") {
    chooseUser.status = "Active";
  }
  e.previousElementSibling.style.display = "inline-block";
  e.previousElementSibling.innerHTML = chooseUser.status;
  e.style.display = "none";
  users.forEach((user, index) => {
    if (user.id == chooseUser.id) {
      users[index].status = chooseUser.status;
    }
  });
  localStorage.setItem("list-user", JSON.stringify(users));
}
