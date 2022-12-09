USE employees;

INSERT INTO department(name)

VALUES ("maternity"), ("paternity"), ("milk");

INSERT INTO role(title, salary, department_id)

VALUES ("Mom", 500000, 1), ("Pops", 5000, 2), ("milkman", 200, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)

VALUES ("Janet", "Jackson", 1, null), ("Rod", "Johnson", 2, 1), ("Kevin", "Blevins", 3, 1);
