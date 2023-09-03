from flask import Flask, request, jsonify
import csv
from faker import Faker

app = Flask(__name__)

fake = Faker()

# Your existing Python code for data generation

@app.route('/generate_csv', methods=['POST'])
def generate_csv():
    # Extract data from the POST request
    data = request.get_json()
    fileName = data["fileName"]
    numRows = data["numRows"]
    numColumns = data["numColumns"]

    # Generate CSV data
    headers = []
    data_types = []

    for i in range(numColumns):
        header = request.form[f"header{i}"]
        data_type = request.form[f"dataType{i}"]
        headers.append(header)
        data_types.append(data_type.strip())

    data = generate_data(data_types, numRows)
    
    # Create and save the CSV file
    with open(f"{fileName}.csv", 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(headers)
        csv_writer.writerows(data)

    return jsonify({"fileUrl": f"{fileName}.csv"})

if __name__ == "__main__":
    app.run(debug=True)
