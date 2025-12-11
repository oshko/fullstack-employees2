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


// Id checking at once:
router.param('id', (req, res, next, id) => {
    // Check if id is a valid positive integer (reject scientific notation like 1e10)
    if (!/^\d+$/.test(id) || +id < 0) {
        return res.status(400).send("ID must be a positive integer");
    }
    next();
});

// ID 
router.route('/:id')
.get(async (req, res)=>{
    const { id } = req.params
    const employee = await getEmployee(id);
    if(!employee) return res.status(404).send("Employee not found!");
    res.status(200).send(employee);
})

.put( async(req, res)=>{

     if (!req.body) return res.status(400).send("Request body required.");
    const { id } = req.params;
    const { name, birthday, salary } = req.body;

    if (!name || !birthday || !salary) {
      return res
        .status(400)
        .send("Missing required fields: name, birthday, salary");
    }
    const updatedEmployees = await updateEmployee({id, name, birthday, salary});
    if(!updatedEmployees) return res.status(404).send("Employee not found");
    res.status(200).send(updatedEmployees);
})

.delete(async (req, res)=>{
    const { id } = req.params
    const deletedEmployee = await deleteEmployee(id);

    if(!deletedEmployee) return res.status(404).send("Delete failed: employee with that ID not found!");
    res.sendStatus(204);
});

