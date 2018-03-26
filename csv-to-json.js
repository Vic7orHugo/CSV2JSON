/*
	csv-to-json.js - Turns a CSV file into a JSON one.
	25/03/2018 16:20
*/

// Importing modules
const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// File names and directory
const csvFile = "customer-data.csv";
const jsonFile = "customer-data.json";
const filePath = path.join(__dirname, csvFile);

// Empty arrays
let csvRows = []; 	// CSV rows array
let jsonObjs = [];	// JSON objects array

// Method to get the information from the CSV file 
csv({noheader:true}).fromFile(filePath).on('csv', (csvRow) => {
	csvRows.push(csvRow);			// Pushes each row to the CSV rows array
}).on('done', () => { 				// Method to transform the CSV data to JSON data only after collection the information from the CSV file
	console.log(csvFile ,'read.');  // Prints that the file is read
	let keys = csvRows[0]; 			// Saves the objects keys to another variable
	csvRows.shift(); 				// Deletes the row containing the objects keys
	for (let row = 0; row < csvRows.length; row++) {	// Loops through all the information rows
		let emptyObj = {};								// Creates an empty object for each row (person information)
		for (let key = 0; key < keys.length; key++) {	// Loops through all the keys
			emptyObj[keys[key]] = csvRows[row][key];	// Links the information related to its respective key
		}
		jsonObjs.push((emptyObj));						// Pushes each object to the JSON objects array
	}
	// Solution to prettify the JSON file taken from user "nym" at https://stackoverflow.com/questions/5670752/how-can-i-pretty-print-json-using-node-js
	/* Takes the array of objects "jsonObjs" and formats it to JSON prettified;
	   Because of the parameter "null", the JSON string will keep the objects properties;
	   The parameter "4" puts four empty spaces everytime it needs to "tab" the information
	*/
	const data = JSON.stringify(jsonObjs, null, 4); 
	fs.writeFileSync(path.join(__dirname, jsonFile), (data)); 			// Writes the JSON prettified data to a JSON file
	setTimeout(() => {console.log("Done writting on", jsonFile)}, 300);	// Logs an information on the console to inform the JSON file is ready assynchronously.
});
