let admins = [
  {
    id: 1,
    username: "admin",
    image: "images/logo.png",
    fullname: "Thái Thị Nhàn",
    email: "ttnhandn@gmail.com",
    password: "Admin123@",
    role: "Admin",
    level: "1",
    status: "Active",
  },
];
if (!localStorage.getItem("list-admin")) {
  localStorage.setItem("list-admin", JSON.stringify(admins));
}
