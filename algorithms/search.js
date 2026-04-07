function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

function runBinarySearch() {
    let arr = JSON.parse(document.getElementById('search-array').value);
    let target = Number(document.getElementById('search-target').value);
    let index = binarySearch(arr, target);
    document.getElementById('binary-output').textContent = 
        `Массив: [${arr}]\nИщем: ${target}\nИндекс: ${index === -1 ? 'не найден' : index}`;
}