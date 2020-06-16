const fs = require("fs"); // fs = file system
const yargs = require("yargs");
const chalk = require("chalk");

const loadData = () => {
	try {
		const buffer = fs.readFileSync("data.json");
		// console.log(buffer)
		const data = buffer.toString();
		// console.log(data)
		const dataObj = JSON.parse(data);
		return dataObj;
	} catch (err) {
		return [];
	}
};

const saveData = (data) => {
	fs.writeFileSync("data.json", JSON.stringify(data));
};

const addTodo = (todo, status) => {
	const data = loadData();
	const newTodo = { todo: todo, status: status };
	data.push(newTodo);
	saveData(data);
};

// if (process.argv[2] === "list") {
// 	console.log("Listing todos");
// 	const data = loadData();
// 	data.forEach(({ todo, status }) =>
// 		console.log(`
//         todo: ${todo}
//         status: ${status}`)
// 	);
// } else if (process.argv[2] === "add") {
// 	console.log("Adding a new todo the list");
// 	let todo = process.argv[3] || null;
// 	let status = process.argv[4] || false;
// 	if (todo) {
// 		addTodo(todo, status);
// 	} else {
// 		console.log("Need to provide todo body");
// 	}
// 	// 3. Need a function to modify data(adding new obj to the existing array)
// } else {
// 	console.log("Cannot understand your command");
// }

yargs.command({
	command: "list",
	describe: "listing all todo",
	alias: "l",

	handler: function () {
		console.log("Listing todos");
		const data = loadData();
		data.forEach(({ todo, status }, idx) => {
			console.log(
				status == true
					? chalk.green(`idx: ${idx}todo: ${todo}status: ${status}`)
					: chalk.red(`idx: ${idx}todo: ${todo}status: ${status}`)
			);
		});
	},
});

yargs.command({
	command: "list_complete",
	describe: "listing all todo",
	alias: "l",

	handler: function () {
		console.log(chalk.blue.bold("Listing todos"));
		const data = loadData();
		const filterList = data.filter((elm) => elm.status === true);
		filterList.forEach(({ todo, status }, idx) =>
			console.log(`
			idx: ${idx}
        todo: ${todo}
		status: ${status}`)
		);
	},
});

yargs.command({
	command: "list_incomplete",
	describe: "listing all todo",
	alias: "l",

	handler: function () {
		console.log(chalk.red.bold("Listing todos"));
		const data = loadData();
		const filterList = data.filter((elm) => elm.status === false);
		filterList.forEach(({ todo, status }, idx) =>
			console.log(`
			idx: ${idx}
        todo: ${todo}
		status: ${status}`)
		);
	},
});

yargs.command({
	command: "add",
	describe: "add a new todo",
	builder: {
		todo: {
			describe: "todo content",
			demandOption: true,
			type: "string",
			alias: "t",
		},
		status: {
			describe: "Status of your todo",
			demandOption: false,
			type: "Boolean",
			alia: "s",
			default: false,
		},
	},
	handler: function ({ todo, status }) {
		addTodo(todo, status);
	},
});

yargs.parse();

//To add a new todo:
// 1. Need a command to receive info: todo's body, status
// 2. Need a function to save the data
// 3. Need a function to modify data(adding new obj to the existing array)
