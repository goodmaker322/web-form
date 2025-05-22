function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

document.getElementById('primeForm').onsubmit = function(e) {
    e.preventDefault();
    const input = document.getElementById('numberInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (!/^\d+$/.test(input) || Number(input) < 0) {
        resultDiv.innerHTML = '<span style="color:red">Vui lòng nhập một số tự nhiên hợp lệ.</span>';
        return;
    }

    const n = Number(input);
    let primes = [];
    for (let i = 2; i < n; i++) {
        if (isPrime(i)) primes.push(i);
    }

    if (primes.length === 0) {
        resultDiv.innerHTML = `Không có số nguyên tố nào nhỏ hơn ${n}.`;
    } else {
        resultDiv.innerHTML = `Các số nguyên tố nhỏ hơn ${n}:<br>` + primes.join(',<br>');
    }

};