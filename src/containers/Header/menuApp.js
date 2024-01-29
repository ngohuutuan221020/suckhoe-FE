export const adminMenu = [
  {
    //quan ly nguoi dung
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
    ],
  },
  {
    //quan ly phong kham
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    //quan ly chuyen khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    //quan ly bac si
    name: "menu.admin.manage-doctor",
    menus: [
      {
        name: "menu.doctor.manage-infor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      //quan ly benh nhan kham benh
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient-doctor",
      },
    ],
  },
  {
    //dashboard
    name: "menu.admin.dashboard",
    menus: [
      {
        name: "menu.admin.dashboard",
        link: "/system/dashboard",
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: "menu.doctor.manage-schedule",
    menus: [
      //quan ly ke hoach kham benh
      {
        name: "menu.doctor.manage-schedule",
        link: "/doctor/manage-schedule",
      },
      //quan ly benh nhan kham benh
      {
        name: "menu.doctor.manage-patient",
        link: "/doctor/manage-patient",
      },
    ],
  },
];
