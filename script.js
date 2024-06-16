document.addEventListener("DOMContentLoaded", function() {
    const inputInfoTab = document.getElementById('input-info-tab');
    const resultTab = document.getElementById('result-tab');
    const inputForm = document.getElementById('input-form');
    const resultSection = document.getElementById('result');
    const patients = [];
    
    resultSection.style.display = 'none';
    
    inputInfoTab.addEventListener('click', function() {
        inputForm.style.display = 'block';
        resultSection.style.display = 'none';
    });

    resultTab.addEventListener('click', function() {
        inputForm.style.display = 'none';
        displayPatientList();
       resultSection.style.display = 'block';
    });

    /*inputForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(inputForm);
        let resultHTML = "<h2>Kết quả dự đoán</h2>";
        for (const [key, value] of formData.entries()) {
            resultHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
        resultSection.innerHTML = resultHTML;
        inputForm.style.display = 'none';
        resultSection.style.display = 'block';
    });*/
    inputForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(inputForm);
        const patient = {};
        formData.forEach((value, key) => patient[key] = value);
        patients.push(patient);
        displayResult(patient);
        inputForm.style.display = 'none';
        resultSection.style.display = 'block';
    });

    function displayResult(patient) {
        let resultHTML = "<h2>Kết quả dự đoán</h2>";
        for (const key in patient) {
            resultHTML += `<p><strong>${key}:</strong> ${patient[key]}</p>`;
        }
        resultHTML += '<button id="close-details">Close</button>';
        resultSection.innerHTML = resultHTML;

        document.getElementById('close-details').addEventListener('click', function() {
            displayPatientList();
        });
    }

    function displayPatientList() {
        let listHTML = "<h2>Danh sách bệnh nhân</h2>";
        listHTML += "<ul>";
        patients.forEach(patient => {
            listHTML += `<li>${patient.ID}</li>`;
        });
        listHTML += "</ul>";
        resultSection.innerHTML = listHTML;
    }

    function redirectToDetails(patientId) {
  // Redirect to details page with the patient ID
  window.location.href = 'details.php?id=' + patientId;
}
});
