function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

document.getElementById('primeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('numberInput').value.trim();
    const resultDiv = document.getElementById('result');
    const n = Number(input);

    if (!/^\d+$/.test(input) || n < 1) {
        resultDiv.textContent = "Vui lòng nhập một số tự nhiên hợp lệ!";
        resultDiv.className = "result not-prime";
        return;
    }

    if (isPrime(n)) {
        resultDiv.textContent = `${n} là số nguyên tố!`;
        resultDiv.className = "result prime";
    } else {
        resultDiv.textContent = `${n} không phải số nguyên tố!`;
        resultDiv.className = "result not-prime";
    }
});