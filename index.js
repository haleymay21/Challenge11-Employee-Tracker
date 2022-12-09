const inquirer = require("inquirer");
const connection = require("./db/connection");
// require("console.table");

function questionsPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "what would you like to do?",
        choices: [
          {
            name: "view all employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "view all the departments",
            value: "VIEW_DEPARTMENTS",
          },
          {
            name: "view all the employees by the role",
            value: "VIEW_ROLE",
          },
          {
            name: "add employee?",
            value: "ADD_EMPLOYEE",
          },
          // add a department, add a role, add an employee, and update an employee role
          {
            name: "update an employee role?",
            value: "UPDATE_EMPLOYEE_ROLE",
          },
          {
            name: "add a department",
            value: "ADD_DEPARTMENT",
          },
          {
            name: "add a role",
            value: "ADD_ROLE",
          },
        ],
      },
      // 'res' is an object that represents a reponse from a request. (AKA when the user selects a choice ('name:') the 'res' gives back the correct reponsee ('value:') ))
    ])
    .then((res) => {
      let choice = res.choice;
      switch (choice) {
        case "VIEW_EMPLOYEES":
          viewEmployees();
          break;
        case "VIEW_DEPARTMENTS":
          viewDepartments();
          break;
        case "VIEW_ROLE":
          viewRole();
          break;
        case "ADD_EMPLOYEE":
          addEmployee();
          break;
        case "UPDATE_EMPLOYEE_ROLE":
          updateEmployeeRole();
          break;
        case "ADD_DEPARTMENT":
          addDepartment();
          break;
        case "ADD_ROLE":
          addRole();
          break;
        default:
          quit();
      }
    });
}
function viewEmployees() {
  connection.query("select * from employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    questionsPrompt();
  });
}

function viewDepartments() {
  connection.query("select * from department", (err, res) => {
    if (err) throw err;
    console.table(res);
    questionsPrompt();
  });
}

function viewRole() {
  connection.query("select * from role", (err, res) => {
    if (err) throw err;
    console.table(res);
    questionsPrompt();
  });
}

function addEmployee() {
  connection.query("select * from role", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the new employee's first name?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the new employee's last name?",
        },
        {
          type: "list",
          name: "title",
          message: "What is the new employee's role",
          choices: res.map((role) => role.title),
        },
      ])
      .then((data) => {
        let role = res.find((role) => role.title === data.title);
        connection.query("insert into employee set ?", {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: role.id,
        });
        questionsPrompt();
      });
  });
}

function addDepartment() {
  connection.query("select * from department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentName",
          message: "What Department would you like to add?",
        },
      ])
      .then((data) => {
        connection.query("insert into department set ?", {
          name: data.departmentName,
        });
        console.log(`added ${data.departmentName} to list of departments`);

        questionsPrompt();
      });
  });
}

function addRole() {
  connection.query("select * from department", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of this role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of this role?",
        },
        {
          type: "list",
          name: "name",
          message: "What department is this role in?",
          choices: res.map((department) => department.name),
        },
      ])
      .then((data) => {
        let department = res.find(
          (department) => department.name === data.name
        );
        connection.query("insert into role set ?", {
          title: data.title,
          salary: data.salary,
          department_id: department.id,
        });
        console.log(`added ${data.title} to list of roles`);

        questionsPrompt();
      });
  });
}

questionsPrompt();
