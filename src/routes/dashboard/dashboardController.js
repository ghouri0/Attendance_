import User from "../../model/user.js";
import Attendance from "../../model/attendance.js";

export const getEmployees = async (req, res) => {
  const count = await User.countDocuments({ role: "employee" });
  console.log(count);
  res.send({ count: count });
};

export const getInternees = async (req, res) => {
  const count = await User.countDocuments({ role: "internee" });
  console.log(count);
  res.send({ count: count });
};

async function getStatus(email) {
  return User.findOne({ email: email }, { role: 1, _id: 0 });
}

export const getPresentEmp = async (req, res) => {
  var [emp, intern] = [0, 0];

  const date = new Date();
  const found = await Attendance.findOne(
    { date: date.getDate(), month: date.getMonth() },
    { details: 1, _id: 0 }
  );
  if (!found) {
    res.send({ message: "No attendance" });
  } else {
    var arr = found.details;
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      const role = await getStatus(element.email);
      if (element.status === "present" && role.role === "employee") {
        emp += 1;
      } else if (element.status === "present" && role.role === "internee") {
        intern += 1;
      }
    }
    res.send({ emp, intern });
  }
};
