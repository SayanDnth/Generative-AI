document.addEventListener("DOMContentLoaded", function () {
    const csvForm = document.getElementById("csvForm");
    const columnInputs = document.getElementById("columnInputs");
    const output = document.getElementById("output");

    csvForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fileName = document.getElementById("fileName").value;
        const numRows = parseInt(document.getElementById("numRows").value);
        const numColumns = parseInt(document.getElementById("numColumns").value);

        fetch("/generate_csv", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName,
                numRows,
                numColumns,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                output.innerHTML = `<a href="${data.fileUrl}" download>Download CSV File</a>`;
            })
            .catch((error) => {
                console.error("Error:", error);
                output.innerHTML = "<p>Error generating CSV.</p>";
            });
    });

    document.getElementById("numColumns").addEventListener("input", function () {
        const numColumns = parseInt(this.value);
        let columnInputsHTML = "";

        for (let i = 0; i < numColumns; i++) {
            columnInputsHTML += `
                <div>
                    <label for="header${i}">Header for Column ${i + 1}:</label>
                    <input type="text" id="header${i}" required>
                    <label for="dataType${i}">Data Type for Column ${i + 1}:</label>
                    <input type="text" id="dataType${i}" required>
                </div>
            `;
        }

        columnInputs.innerHTML = columnInputsHTML;
    });
});
