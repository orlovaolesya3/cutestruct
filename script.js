// ========== ПЕРЕКЛЮЧАТЕЛЬ ТЕМ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем сохранённую тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme + '-theme');
    
    // Создаём переключатель, если его нет
    if (!document.querySelector('.theme-switch-wrapper')) {
        const themeWrapper = document.createElement('div');
        themeWrapper.className = 'theme-switch-wrapper';
        themeWrapper.innerHTML = `
            <label class="theme-switch">
                <div class="switch">
                    <input type="checkbox" id="theme-toggle" ${savedTheme === 'dark' ? 'checked' : ''}>
                    <span class="slider"></span>
                </div>
            </label>
        `;
        document.body.appendChild(themeWrapper);
        
        // Добавляем обработчик
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.remove('light-theme');
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.classList.remove('dark-theme');
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});

// Функция для вставки лапки вместо смайликов
function addPawIcons() {
    // Заменяем смайлики в заголовках карточек
    const cards = document.querySelectorAll('.category-card h2, .algorithm-card h3');
    cards.forEach(card => {
        let text = card.innerHTML;
        // Убираем старые смайлики и добавляем лапку
        text = text.replace(/[📊🔄🔍🧮🌊🌳📈➗💫🎯🔢⚡🔎]/g, '');
        if (!text.includes('paw')) {
            card.innerHTML = `<span class="paw"></span>${text}`;
        }
    });
    
    // Заменяем в кнопках
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        let text = button.innerHTML;
        if (text.includes('→') || text.includes('Запустить') || text.includes('Найти') || text.includes('Перейти')) {
            if (!text.includes('paw')) {
                button.innerHTML = `<span class="paw"></span>${text}`;
            }
        }
    });
}

// Запускаем добавление лапок после загрузки страницы
setTimeout(addPawIcons, 100);

// ============ СОРТИРОВКИ ============
function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

function runBubbleSort() {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const sorted = bubbleSort([...input]);
    const output = document.getElementById('bubble-output');
    if (output) {
        output.innerHTML = `
            📊 Исходный: [${input.join(', ')}]<br>
            ✅ Отсортированный: [${sorted.join(', ')}]<br>
            ⏱️ Сложность: O(n²)
        `;
    }
}

function runBubbleSortWithCustomInput() {
    const inputStr = document.getElementById('bubble-custom-input');
    if (!inputStr) return;
    const inputValue = inputStr.value;
    if (!inputValue) {
        document.getElementById('bubble-output').innerHTML = '❌ Введите массив!';
        return;
    }
    let arr = inputValue.split(',').map(x => parseInt(x.trim()));
    if (arr.some(isNaN)) {
        document.getElementById('bubble-output').innerHTML = '❌ Ошибка: введите числа через запятую';
        return;
    }
    const sorted = bubbleSort([...arr]);
    document.getElementById('bubble-output').innerHTML = `
        📊 Исходный: [${arr.join(', ')}]<br>
        ✅ Отсортированный: [${sorted.join(', ')}]<br>
        ⏱️ Сложность: O(n²)
    `;
}

function runQuickSort() {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const sorted = quickSort([...input]);
    const output = document.getElementById('quick-output');
    if (output) {
        output.innerHTML = `
            📊 Исходный: [${input.join(', ')}]<br>
            ✅ Быстрая сортировка: [${sorted.join(', ')}]<br>
            ⏱️ Сложность: O(n log n)
        `;
    }
}

// ============ ПОИСК ============
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

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

function findMax(arr) {
    if (arr.length === 0) return null;
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

function runBinarySearch() {
    const searchArray = document.getElementById('search-array');
    const searchTarget = document.getElementById('search-target');
    if (!searchArray || !searchTarget) return;
    
    try {
        let arrayInput = searchArray.value;
        let arr;
        if (arrayInput.includes('[')) {
            arr = JSON.parse(arrayInput);
        } else {
            arr = arrayInput.split(',').map(x => parseInt(x.trim()));
        }
        const target = parseInt(searchTarget.value);
        if (isNaN(target)) throw new Error('Введите число');
        
        const sortedArr = [...arr].sort((a, b) => a - b);
        const index = binarySearch(sortedArr, target);
        
        document.getElementById('binary-output').innerHTML = `
            🔍 Исходный: [${arr.join(', ')}]<br>
            📏 Отсортированный: [${sortedArr.join(', ')}]<br>
            🎯 Ищем: ${target}<br>
            ${index !== -1 ? `✅ Найдено на позиции ${index}` : '❌ Не найдено'}<br>
            ⏱️ Сложность: O(log n)
        `;
    } catch(e) {
        document.getElementById('binary-output').innerHTML = '❌ Ошибка: проверьте формат массива';
    }
}

function runLinearSearch() {
    const linearArray = document.getElementById('linear-array');
    const linearTarget = document.getElementById('linear-target');
    if (!linearArray || !linearTarget) return;
    
    const arr = linearArray.value.split(',').map(x => parseInt(x.trim()));
    const target = parseInt(linearTarget.value);
    const index = linearSearch(arr, target);
    
    document.getElementById('linear-output').innerHTML = `
        🔍 Массив: [${arr.join(', ')}]<br>
        🎯 Ищем: ${target}<br>
        ${index !== -1 ? `✅ Найдено на позиции ${index}` : '❌ Не найдено'}<br>
        ⏱️ Сложность: O(n)
    `;
}

function runFindMax() {
    const maxArray = document.getElementById('max-array');
    if (!maxArray) return;
    
    const arr = maxArray.value.split(',').map(x => parseInt(x.trim()));
    const max = findMax(arr);
    
    document.getElementById('max-output').innerHTML = `
        📊 Массив: [${arr.join(', ')}]<br>
        🎯 Максимальный элемент: <strong>${max}</strong><br>
        ⏱️ Сложность: O(n)
    `;
}

// ============ ГРАФЫ ============
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    let result = [start];
    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            result.push(...dfs(graph, neighbor, visited));
        }
    }
    return result;
}

function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];
    
    visited.add(start);
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (let neighbor of graph[vertex]) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return result;
}

function runDFS() {
    const graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    
    const traversal = dfs(graph, 'A');
    const output = document.getElementById('dfs-output');
    if (output) {
        output.innerHTML = `
            🌲 Граф:<br>
            <pre style="margin:5px 0">${JSON.stringify(graph, null, 2)}</pre>
            🚀 Обход DFS от A:<br>
            <strong>${traversal.join(' → ')}</strong><br>
            ⏱️ Сложность: O(V + E)
        `;
    }
}

function runBFS() {
    const graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    
    const traversal = bfs(graph, 'A');
    const output = document.getElementById('bfs-output');
    if (output) {
        output.innerHTML = `
            🌲 Граф:<br>
            <pre style="margin:5px 0">${JSON.stringify(graph, null, 2)}</pre>
            🚀 Обход BFS от A:<br>
            <strong>${traversal.join(' → ')}</strong><br>
            ⏱️ Сложность: O(V + E)
        `;
    }
}

// ============ МАТЕМАТИЧЕСКИЕ АЛГОРИТМЫ ============
function fibonacci(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo);
    return memo[n];
}

function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n-1);
}

function runFibonacci() {
    const fibNumber = document.getElementById('fib-number');
    if (!fibNumber) return;
    
    const n = parseInt(fibNumber.value);
    if (isNaN(n) || n < 0) {
        document.getElementById('fib-output').innerHTML = '❌ Введите неотрицательное число';
        return;
    }
    
    const start = performance.now();
    const result = fibonacci(n);
    const end = performance.now();
    
    document.getElementById('fib-output').innerHTML = `
        🔢 F(${n}) = ${result}<br>
        ⏱️ Вычислено за ${(end - start).toFixed(2)} мс<br>
        📈 Сложность: O(n) с мемоизацией
    `;
}

function runFactorial() {
    const factorialNumber = document.getElementById('factorial-number');
    if (!factorialNumber) return;
    
    const n = parseInt(factorialNumber.value);
    if (isNaN(n) || n < 0) {
        document.getElementById('factorial-output').innerHTML = '❌ Введите неотрицательное число';
        return;
    }
    if (n > 20) {
        document.getElementById('factorial-output').innerHTML = '⚠️ Число слишком большое (максимум 20)';
        return;
    }
    
    const result = factorial(n);
    document.getElementById('factorial-output').innerHTML = `
        ➗ ${n}! = ${result}<br>
        📈 Сложность: O(n)
    `;
}

// ============ СТРОКИ ============
function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[^а-яa-z0-9]/g, '');
    return cleanStr === cleanStr.split('').reverse().join('');
}

function runPalindromeCheck() {
    const palindromeInput = document.getElementById('palindrome-input');
    if (!palindromeInput) return;
    
    const input = palindromeInput.value;
    const result = isPalindrome(input);
    
    document.getElementById('palindrome-output').innerHTML = `
        💬 Строка: "${input}"<br>
        ${result ? '✅ Это палиндром!' : '❌ Это не палиндром'}<br>
        ⏱️ Сложность: O(n)
    `;
}

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
function generateRandomArray() {
    const length = Math.floor(Math.random() * 10) + 5;
    const arr = Array.from({length}, () => Math.floor(Math.random() * 100));
    return arr;
}

function fillExample() {
    const randomArr = generateRandomArray();
    const searchArray = document.getElementById('search-array');
    const searchTarget = document.getElementById('search-target');
    
    if (searchArray && searchTarget) {
        searchArray.value = JSON.stringify(randomArr);
        searchTarget.value = randomArr[Math.floor(Math.random() * randomArr.length)];
    }
}

function clearAllOutputs() {
    const outputs = document.querySelectorAll('pre, .output');
    outputs.forEach(output => {
        output.innerHTML = '🔄 Ожидание выполнения...';
    });
}

function runAllExamples() {
    runBubbleSort();
    runQuickSort();
    if (document.getElementById('search-array')) runBinarySearch();
    if (document.getElementById('linear-array')) runLinearSearch();
    if (document.getElementById('max-array')) runFindMax();
    if (document.getElementById('dfs-output')) runDFS();
    if (document.getElementById('bfs-output')) runBFS();
    if (document.getElementById('fib-number')) runFibonacci();
    if (document.getElementById('factorial-number')) runFactorial();
    if (document.getElementById('palindrome-input')) runPalindromeCheck();
}

// ============ BFS ДЛЯ СТРАНИЦЫ АЛГОРИТМОВ ============
function runBFSDemo() {
    try {
        const graphInput = document.getElementById('graph-input');
        const startVertex = document.getElementById('start-vertex');
        
        if (!graphInput || !startVertex) return;
        
        const graph = JSON.parse(graphInput.value);
        const start = startVertex.value;
        
        if (!graph[start]) {
            const output = document.getElementById('output');
            if (output) output.innerHTML = '❌ Ошибка: стартовая вершина не найдена в графе!';
            return;
        }
        
        function bfsAlgorithm(graph, start) {
            const visited = new Set();
            const queue = [start];
            visited.add(start);
            const result = [];
            
            while (queue.length > 0) {
                const vertex = queue.shift();
                result.push(vertex);
                
                for (const neighbor of graph[vertex]) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        queue.push(neighbor);
                    }
                }
            }
            return result;
        }
        
        const result = bfsAlgorithm(graph, start);
        
        let output = `✅ Обход BFS от вершины "${start}":\n`;
        output += `📊 Порядок обхода: ${result.join(' → ')}\n\n`;
        output += `📝 Посещённые вершины: ${result.length}\n`;
        output += `🔍 Путь охватывает все достижимые вершины`;
        
        const outputElement = document.getElementById('output');
        if (outputElement) outputElement.innerHTML = output;
        
    } catch(e) {
        const outputElement = document.getElementById('output');
        if (outputElement) outputElement.innerHTML = '❌ Ошибка в формате JSON: ' + e.message;
    }
}

function loadExample() {
    const example = {
        "A": ["B", "C"],
        "B": ["D", "E"],
        "C": ["F"],
        "D": [],
        "E": ["F"],
        "F": []
    };
    
    const graphInput = document.getElementById('graph-input');
    const startVertex = document.getElementById('start-vertex');
    
    if (graphInput) graphInput.value = JSON.stringify(example, null, 4);
    if (startVertex) startVertex.value = "A";
}

// ============ ЭКСПОРТ В ГЛОБАЛЬНУЮ ОБЛАСТЬ ============
window.runBubbleSort = runBubbleSort;
window.runBubbleSortWithCustomInput = runBubbleSortWithCustomInput;
window.runQuickSort = runQuickSort;
window.runBinarySearch = runBinarySearch;
window.runLinearSearch = runLinearSearch;
window.runFindMax = runFindMax;
window.runDFS = runDFS;
window.runBFS = runBFS;
window.runFibonacci = runFibonacci;
window.runFactorial = runFactorial;
window.runPalindromeCheck = runPalindromeCheck;
window.fillExample = fillExample;
window.clearAllOutputs = clearAllOutputs;
window.runAllExamples = runAllExamples;
window.runBFSDemo = runBFSDemo;
window.loadExample = loadExample;

console.log('✅ Сайт с алгоритмами загружен! Тема сохранена: ' + localStorage.getItem('theme'));