import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
const employees = [
  {name: "Kate", birthday: new Date("1992-10-01"), salary: 8000},
  {name: "Hulan", birthday: new Date("2008-06-08"), salary: 7500},
  {name: "Suren", birthday: new Date("1990-10-01"), salary: 9000},
  {name: "John", birthday: new Date("1984-10-03"), salary: 6000},
  {name: "Lkhagva", birthday: new Date("1984-02-15"), salary: 6000},
  {name: "Nomin", birthday: new Date("1989-02-25"), salary: 3500},
  {name: "Baaska", birthday: new Date("1985-10-18"), salary: 2500},
  {name: "Dorj", birthday: new Date("1975-07-12"), salary: 5000},
  {name: "Nemekh", birthday: new Date("1990-08-03"), salary: 6000},
  {name: "Munkh", birthday: new Date("1980-05-16"), salary: 6400},
  {name: "Erdene", birthday: new Date("1988-04-28"), salary: 4860},
  {name: "Sukh", birthday: new Date("1998-03-24"), salary: 3200},
];

for(const employee of employees) {
  await createEmployee(employee);
}

console.log("Successful seed of Employee!");

};


