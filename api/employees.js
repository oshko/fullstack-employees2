import { createEmployee, deleteEmployee, getEmployee, getEmployees, updateEmployee } from "#db/queries/employees";
import express from "express";
const router = express.Router();
export default router;

router.route('/')
.get(async (req, res)=>{

const employees = await getEmployees();
res.json(employees);
})
.post( async(req, res)=>{
    if (!req.body) return res.status(400).send("Request body required.");

    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary) {
      return res
        .status(400)
        .send("Missing requiredq fields: name, birthday, salary");
    }
    const employees = await createEmployee({name, birthday, salary});
    if(!employees) return res.status(404).send({ error: "Employees not found" });

    res.status(201).send(employees);
});

router.route('/:id')
.get(async (req, res)=>{
    const { id } = req.params
    if(!id) return res.status(400).send("Request need ID!");
    const employee = await getEmployee(id);
    res.status(201).send(employee);
})
.put( async(req, res)=>{
     if (!req.body) return res.status(400).send("Request body required.");

    const { id, name, birthday, salary } = req.body;

    if (!id || !name || !birthday || !salary) {
      return res
        .status(400)
        .send("Missing required fields: id, name, birthday, salary");
    }
    const updatedEmployees = await updateEmployee({id, name, birthday, salary});
    res.status(201).send(updatedEmployees);
})
.delete(async (req, res)=>{
    const { id } = req.params
    if(!id) return res.status(400).send("Request need ID!");
    await deleteEmployee(id);
    res.sendStatus(204);
});
// TODO: this file!
