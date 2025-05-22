// Lấy danh sách quốc gia từ API
fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data => {
        const countrySelect = document.getElementById('country');
        // Sắp xếp tên quốc gia theo alphabet
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2; // mã quốc gia 2 ký tự
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    });

document.getElementById('regForm').onsubmit = async function(e) {
    e.preventDefault();
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');
    document.querySelectorAll('input, select').forEach(el => el.classList.remove('input-error'));

    // Khai báo các biến 1 lần ở đầu hàm
    const userid = document.getElementById('userid');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    const country = document.getElementById('country');
    const zip = document.getElementById('zip');
    const email = document.getElementById('email');
    const sexMale = document.getElementById('male');
    const sexFemale = document.getElementById('female');
    const langEnglish = document.getElementById('english');
    const langNonEnglish = document.getElementById('nonenglish');

    // User id
    if (!userid.value.trim()) {
        setError(userid, 'useridErr', 'Required and must be of length 5 to 12');
        isValid = false;
    } else if (userid.value.length < 5 || userid.value.length > 12) {
        setError(userid, 'useridErr', 'Must be of length 5 to 12');
        isValid = false;
    }

    // Password
    if (!password.value.trim()) {
        setError(password, 'passwordErr', 'Required and must be of length 7 to 12');
        isValid = false;
    } else if (password.value.length < 7 || password.value.length > 12) {
        setError(password, 'passwordErr', 'Must be of length 7 to 12');
        isValid = false;
    }

    // Name
    if (!name.value.trim()) {
        setError(name, 'nameErr', 'Required and alphabets only');
        isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name.value)) {
        setError(name, 'nameErr', 'Alphabets only');
        isValid = false;
    }

    // Country
    if (!country.value) {
        setError(country, 'countryErr', 'Select a country');
        isValid = false;
    }

    // ZIP Code
    if (!zip.value.trim()) {
        setError(zip, 'zipErr', 'Required. Must be numberic only');
        isValid = false;
    } else if (!/^\d+$/.test(zip.value)) {
        setError(zip, 'zipErr', 'Required. Must be numberic only');
        isValid = false;
    }

    // Email
    if (!email.value.trim()) {
        setError(email, 'emailErr', 'Required. Must be a valid email');
        isValid = false;
    } else if (!/^[\w\.-]+@[\w\.-]+\.\w{2,}$/.test(email.value)) {
        setError(email, 'emailErr', 'Must be a valid email');
        isValid = false;
    }

    // Sex
    if (!sexMale.checked && !sexFemale.checked) {
        document.getElementById('sexErr').textContent = 'Required';
        isValid = false;
    }

    // Language
    if (!langEnglish.checked && !langNonEnglish.checked) {
        document.getElementById('languageErr').textContent = 'Required';
        isValid = false;
    }


    // ZIP Code validate
    if (!zip.value.trim()) {
        setError(zip, 'zipErr', 'Required. Must be numeric only');
        isValid = false;
    } else if (!/^\d+$/.test(zip.value)) {
        setError(zip, 'zipErr', 'Must be numeric only');
        isValid = false;
    }

    if (isValid) {
        alert('Registration successful!');
        // this.submit();
    }
};

function setError(input, errId, message) {
    document.getElementById(errId).textContent = message;
    input.classList.add('input-error');
}