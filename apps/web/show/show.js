const bookTable = document.getElementById("bookTable");
var books;

fetch('http://127.0.0.1:8000/api/books').then((response) => response.json())
.then(fillBookTable);

function fillBookTable(books) {

    for (let book of books) {
        let row = document.createElement('tr');
        for(let attribute in book) {
            let cell = document.createElement('td');
            cell.appendChild(document.createTextNode(book[attribute]));

            row.appendChild(cell);
        }

        bookTable.appendChild(row);
    };
}
/*var books = [
    {
        "id": 1,
        "title": "Pipikakaland",
        "author": ''
    },
    {
        "id": 2,
        "title": "Gutenachtgeschichten",
        "author": ''
    },
    {
        "id": 3,
        "title": "Gregs Tagebuch",
        "author": ''
    }
];*/