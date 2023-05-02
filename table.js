class Table {
    constructor(headers, data) {
        this.headers = headers;
        this.data = data;
        this.table = document.createElement("table");
        this.tableHeader = document.createElement("thead");
        this.tableBody = document.createElement("tbody");
        this.table.appendChild(this.tableHeader);
        this.table.appendChild(this.tableBody);
        this.addHeader();
        this.addData();
        this.addButton();
        this.addEditableCells();
    }

    addHeader() {
        let row = document.createElement("tr");
        for (let header of this.headers) {
            let th = document.createElement("th");
            let text = document.createTextNode(header);
            th.appendChild(text);
            row.appendChild(th);
        }
        this.tableHeader.appendChild(row);
    }

    addData() {
        for (let row of this.data) {
            let tr = document.createElement("tr");
            for (let cell of row) {
                let td = document.createElement("td");
                let text = document.createTextNode(cell);
                td.appendChild(text);
                tr.appendChild(td);
            }
            this.tableBody.appendChild(tr);
        }
    }

    addButton() {
        let self = this;
        let button = document.createElement("button");
        let text = document.createTextNode("Добавить строку");
        button.appendChild(text);
        button.onclick = function() {
            let row = prompt("Введите данные для добавления через запятую");
            if (row) {
                let cells = row.split(",");
                let tr = document.createElement("tr");
                for (let cell of cells) {
                    let td = document.createElement("td");
                    let text = document.createTextNode(cell);
                    td.appendChild(text);
                    tr.appendChild(td);
                }
                self.tableBody.appendChild(tr);
                self.addEditableCells();
            }
        }
        this.table.appendChild(button);
    }

    addEditableCells() {
        let self = this;
        let cells = this.table.querySelectorAll("td");
        for (let cell of cells) {
            cell.onclick = function() {
                let text = cell.innerText;
                cell.innerHTML = `<input type="text" value="${text}">`;
                let input = cell.querySelector("input");
                input.focus();
                input.addEventListener("blur", function() {
                    cell.innerText = input.value;
                });
            }
        }
    }

    render() {
        return this.table;
    }
}

let header = ["Имя", "Фамилия", "Возраст"];
let tableCells = [["Павел", "Шепелев", "22"],["Дмитрий", "Боня", "36"],["Николай", "Тугодумцев", "99"],];

let headers = header;
let data = tableCells;

let myTable = new Table(headers, data);
document.body.appendChild(myTable.render());
