import fs from 'fs';
import csv from 'csv-parser';

async function extractDataByDate(csvFile, targetDate) {
    return new Promise((resolve, reject) => {
        const extractedData = [];

        // Read the CSV file
        fs.createReadStream(csvFile)
            .pipe(csv())
            .on('data', (row) => {
                // Convert the time string to Date object
                const [date, time] = row.time.split(' ');
                const hour = time.split(':')[0];

                // Check if the date matches the target date
                if (date === targetDate) {
                    // Extract the hour and temperature values
                    const temp = parseFloat(row.temp);
                    extractedData.push({ hour: hour + ':00', temp: temp });
                }
            })
            .on('end', () => {
                // Resolve with the extracted data
                resolve(extractedData);
            })
            .on('error', (error) => {
                // Reject with the error
                reject(error);
            });
    });
}

// Example usage:
const csvFile = 'predicted_data.csv';
const targetDate = '2024-04-25';

async function example() {
    try {
        const extractedData = await extractDataByDate(csvFile, targetDate);
        console.log(extractedData);
    } catch (error) {
        console.error('Error:', error);
    }
}

example();
