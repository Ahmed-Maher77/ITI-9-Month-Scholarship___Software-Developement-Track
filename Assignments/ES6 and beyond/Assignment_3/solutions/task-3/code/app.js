// Selectors
const tableWrapper = document.getElementById('table-wrapper');
const fetchBtn = document.getElementById('fetch-btn');


// Initial Data
let users = [];
showUsersTable(users);


// Event Listeners
fetchBtn.addEventListener('click', () => {
    fetchData('https://fakestoreapi.com/users');
    // fetchData2('https://fakestoreapi.com/users').then(data => {
    //     showLoading();
    //     users = data;
    //     showUsersTable(users);
    // }).catch(error => console.log(error));
});



// =========== Functions ===========
async function fetchData(url) {
    try {
        showLoading();
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        users = data;
        showUsersTable(users);
    } catch (error) {
        console.log(error);
    }
}


function showUsersTable(usersData) {
    if (usersData.length === 0) {
        tableWrapper.innerHTML = '<p>No Data Available</p>';
        return;
    };
    tableWrapper.innerHTML = '';
    const table = document.createElement('table');
    const thead = document.createElement('tbody');
    const tbody = document.createElement('tbody');

    // Create Table Header
    const headerRow = document.createElement('tr');
    const headers = ["ID", "Username", "Actions"];
    for (const header of headers) {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create Table Body
    for (const user of usersData) {
        const tr = document.createElement('tr');
        const requiredFields = ["id", "username"];
        for (const field of requiredFields) {
            const td = document.createElement('td');
            td.innerText = user[field];
            tr.appendChild(td);
        }
        // Create Delete Button
        const deleteTd = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerText = "Delete";
        deleteBtn.setAttribute('data-userid', user.id);
        deleteTd.appendChild(deleteBtn);
        tr.appendChild(deleteTd);
        tbody.appendChild(tr);
    }
    
    table.appendChild(tbody);
    tableWrapper.appendChild(table);

    addEventListenersToDeleteButtons();
}

function showLoading() {
    tableWrapper.children[0].innerHTML = 'Loading...';
}

function addEventListenersToDeleteButtons() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    for (const deleteBtn of deleteButtons) {
        deleteBtn.addEventListener('click', () => {
            const userId = deleteBtn.getAttribute('data-userid');
            deleteUser(userId);
        });
    }
}

function deleteUser(userId) {
    const deletedIndex = users.findIndex(user => user.id == userId);
    users.splice(deletedIndex, 1);
    showUsersTable(users);
}










function fetchData2(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    resolve(data);
                } else {
                    reject('Error fetching data');
                }
            }
        }
        xhr.send();
    });
}