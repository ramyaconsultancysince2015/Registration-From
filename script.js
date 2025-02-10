function submitForm(event) {
    event.preventDefault();
    document.getElementById('successMessage').style.display = 'block';
    const formData = new FormData(document.getElementById('registrationForm'));
    const companyName = formData.get('companyName');

    const docContent = `
      <table border="1" cellpadding="5" cellspacing="0">
        <tr><th colspan="2">REGISTRATION FORM</th></tr>
        <tr><td>Date</td><td>${new Date().toLocaleDateString()}</td></tr>
        <tr><td>Full Name</td><td>${formData.get('fullName')}</td></tr>
        <tr><td>Gender</td><td>${formData.get('gender')}</td></tr>
        <tr><td>Father Name</td><td>${formData.get('fatherName')}</td></tr>
        <tr><td>PAN Number</td><td>${formData.get('panNumber')}</td></tr>
        <tr><td>Date of Birth</td><td>${formatDate(formData.get('dob'))}</td></tr>
        <tr><td>Mobile Number</td><td>${formData.get('mobileNumber')}</td></tr>
        <tr><td>Alternate Number</td><td>${formData.get('alternateNumber')}</td></tr>
        <tr><td>Email ID</td><td>${formData.get('email')}</td></tr>
        <tr><td>Permanent Address</td><td>${formData.get('address')}</td></tr>
        <tr><td>Technology or Course</td><td>${formData.get('technology')}</td></tr>
        <tr><td>Chosen Company Name</td><td>${companyName}</td></tr>
        <tr><td>Offer Date</td><td>${formatDate(formData.get('offerDate'))}</td></tr>
        <tr><td>Joining Date</td><td>${formatDate(formData.get('joiningDate'))}</td></tr>
        <tr><td>Offer Letter Designation</td><td>${formData.get('offerDesignation')}</td></tr>
        <tr><td>Offer Letter Salary (CTC)</td><td>${formData.get('offerSalary')} LPA</td></tr>
        <tr><td>Hike/Appraisal Designation</td><td>${formData.get('hikeDesignation')}</td></tr>
        <tr><td>Hike/Appraisal Salary (CTC)</td><td>${formData.get('hikeSalary')} LPA</td></tr>
        <tr><td>Hike Details</td><td>${formData.get('hikeDetails')}</td></tr>
        <tr><td>Last Working Day</td><td>${formatDate(formData.get('lastWorkingDay'))}</td></tr>
        <tr><td>Type of Employment</td><td>${formData.get('employmentType')}</td></tr>
        <tr><td>Resignation Date</td><td>${formatDate(formData.get('resignationDate'))}</td></tr>
        <tr><td>Relieving Date</td><td>${formatDate(formData.get('relievingDate'))}</td></tr>
        <tr><td>Bank Name</td><td>${formData.get('bankName')}</td></tr>
        <tr><td>Account Number</td><td>${formData.get('accountNumber')}</td></tr>
      </table>
    `;

    const blob = new Blob([docContent], { type: 'application/msword' });
    const link = document.createElement('a');
    const candidateName = formData.get('fullName') || 'Unknown Candidate';
    link.href = URL.createObjectURL(blob);
    link.download = `${candidateName}_Registration_Form.doc`;

    setTimeout(function() {
        link.click();
    }, 100);

    document.getElementById('registrationForm').reset();
}

async function fetchCompanyList() {
    const url = 'https://script.google.com/macros/s/AKfycbybNUfVKj1LZqZBYCshgQFjl71G1nPCtOew1ursATJln0k0TqJPwtwbtkLSRH9aSbHx/exec';
    try {
        const response = await fetch(url);
        const companies = await response.json();

        const companyList = document.getElementById('companyList');
        companyList.innerHTML = '<tr><th>Company Name</th><th>Website</th><th>Location</th></tr>';

        companies.forEach(company => {
            // Ensure the URL starts with 'http://' or 'https://'
            let website = company['Website'];
            if (!/^https?:\/\//i.test(website)) {
                website = 'http://' + website; // Add 'http://' if missing
            }

            const row = `<tr>
                <td>${company['Company Name']}</td>
                <td><a href="${website}" target="_blank">${website}</a></td>
                <td>${company['Location']}</td>
            </tr>`;
            companyList.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchCompanyList);

function formatDate(dateString) {
    if (!dateString || isNaN(new Date(dateString).getTime())) {
        return '--'; // Return "--" for empty or invalid dates
    }
    const date = new Date(dateString);
    const options = { month: 'long' };
    const month = date.toLocaleDateString('en-US', options);
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

function showAdminPage() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
}

function backToDashboard() {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('adminPage').style.display = 'none';
}
