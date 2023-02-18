"use strict";

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
// auto add a book to local storage
var book_collection = [
  {
    id: 1,
    title: "Test book 1",
    author: "Mark_Nguyen",
    nbr_of_pages: "200",
    language: "	Vietnamese",
    publishing_date: "July 1 2023",
    read_status: true,
    insertion_date: "11/23/2023, 1:48:58 PM"
  }
];

// add books to the localStorage
(function add_testing_books() {
  localStorage.setItem("book_collection", JSON.stringify(book_collection));
})();

// capitalize first letter of any string
// source stackoverflow
String.prototype.capitalize = function () {
  return this.toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.substring(1);
    })
    .join(" ");
};
var _localStorage = /*#__PURE__*/ (function () {
  function _localStorage() {
    _classCallCheck(this, _localStorage);
  }
  _createClass(_localStorage, null, [
    {
      key: "read",
      value: function read(book_id) {
        book_id = parseInt(book_id);
        var local_storage_book_collection =
          localStorage.getItem("book_collection");
        var book_collection = JSON.parse(local_storage_book_collection);
        if (local_storage_book_collection && book_collection.length > 0) {
          if (book_id) {
            return new Book(
              book_collection.filter(function (book) {
                return book.id === book_id;
              })[0]
            );
          } else {
            return book_collection;
          }
        } else {
          return false;
        }
      }
    },
    {
      key: "write",
      value: function write(book_collection) {
        var book_array = Array.isArray(book_collection)
          ? book_collection
          : [book_collection];
        localStorage.setItem("book_collection", JSON.stringify(book_array));
      }
    },
    {
      key: "add",
      value: function add(book) {
        var local_storage_book_collection = _localStorage.read();
        if (local_storage_book_collection) {
          local_storage_book_collection.push(book);
          _localStorage.write(local_storage_book_collection);
        } else {
          _localStorage.write(book);
        }
      }
    },
    {
      key: "remove",
      value: function remove(rm_book_id) {
        rm_book_id = parseInt(rm_book_id);
        var local_storage_book_collection = _localStorage.read();
        if (local_storage_book_collection) {
          var temp_collection = local_storage_book_collection.filter(function (
            book
          ) {
            if (book.id != rm_book_id) {
              return book;
            }
          });
          _localStorage.write(temp_collection);
        }
      }
    },
    {
      key: "update",
      value: function update(book) {
        var local_storage_book_collection = _localStorage.read();
        if (local_storage_book_collection) {
          var temp_collection = local_storage_book_collection.map(function (
            element
          ) {
            if (element.id === book.id) {
              return book;
            } else {
              return element;
            }
          });
          _localStorage.write(temp_collection);
        }
      }
    }
  ]);
  return _localStorage;
})();
var Book = /*#__PURE__*/ (function () {
  function Book(book) {
    _classCallCheck(this, Book);
    this.id = book.id || null;
    this.title = book.title;
    this.author = book.author;
    this.nbr_of_pages = book.nbr_of_pages;
    this.language = book.language;
    this.publishing_date = book.publishing_date;
    this.read_status = book.read_status;
    this.insertion_date = new Date().toLocaleString();
  }
  _createClass(Book, [
    {
      key: "htmlMarkup",
      get: function get() {
        var book_html_template =
          '\n    <div class="single_book scale-in-center '
            .concat(this.read_status ? "read" : "", '" id="book-')
            .concat(
              this.id,
              '">\n      <span class="material-icons remove-book"> close </span>\n      <h3 class="book-title">'
            )
            .concat(
              this.title,
              '</h3>\n      <span class="book-author">\n      <span class="b-lable">By: </span>'
            )
            .concat(
              this.author,
              '</span>\n      <span class="pages-count">\n        <span class="b-lable">Number of pages: </span> '
            )
            .concat(
              this.nbr_of_pages,
              '</span>\n      <span class="book-language">\n        <span class="b-lable">Language: </span> '
            )
            .concat(
              this.language,
              '</span>\n      <span class="book-published">\n        <span class="b-lable">Published: </span> '
            )
            .concat(
              this.publishing_date,
              '</span>\n\n      <span class="read_toggle_label">Mark as read:</span>\n      <label class="toggle-control">\n        <input type="checkbox" id="read_toggle" '
            )
            .concat(
              this.read_status ? "checked" : "unchecked",
              '>\n        <span class="control"></span>\n      </label>\n\n    </div>'
            );
        return book_html_template;
      }
    },
    {
      key: "generateID",
      get: function get() {
        var book_collection = _localStorage.read();
        if (book_collection) {
          var last_book = book_collection[book_collection.length - 1];
          return last_book.id + 1;
        } else {
          return 1;
        }
      }
    },
    {
      key: "toggleReadOrNot",
      value: function toggleReadOrNot() {
        this.read_status = !this.read_status;
      }
    }
  ]);
  return Book;
})();
var VueManager = /*#__PURE__*/ (function () {
  function VueManager(dom_element) {
    _classCallCheck(this, VueManager);
    this.dom_element = dom_element;
  }
  _createClass(VueManager, [
    {
      key: "checkForEmptyBookCollection",
      value: function checkForEmptyBookCollection() {
        var book_collection = _localStorage.read();
        var order_by_dom_el = Array.from(
          document.querySelectorAll(".order select")
        );
        if (!book_collection || book_collection.length === 0) {
          empty_lib_section.style.display = "flex";
          order_by_dom_el.forEach(function (element) {
            element.disabled = true;
          });
        } else {
          empty_lib_section.style.display = "none";
          order_by_dom_el.forEach(function (element) {
            element.disabled = false;
          });
        }
      }
    },
    {
      key: "clearFormFields",
      value: function clearFormFields() {
        new_book_input_fields.forEach(function (field) {
          if (field.tagName.toLowerCase() == "select") {
            field.selectedIndex = 0;
            field.nextSibling.style.display = "none";
          } else {
            field.value = "";
            field.nextSibling.style.display = "none";
          }
        });
      }
    },
    {
      key: "checkUserEntries",
      value: function checkUserEntries() {
        var score = 6;
        new_book_input_fields.forEach(function (element) {
          if (element.tagName.toLowerCase() === "select") {
            element.value === "null"
              ? (score--, (element.nextSibling.style.display = "block"))
              : (element.nextSibling.style.display = "none");
          } else if (element.type.toLowerCase() === "date") {
            element.value === ""
              ? (score--, (element.nextSibling.style.display = "block"))
              : (element.nextSibling.style.display = "none");
          } else if (element.type.toLowerCase() === "number") {
            isNaN(parseInt(element.value))
              ? (score--, (element.nextSibling.style.display = "block"))
              : (element.nextSibling.style.display = "none");
          } else {
            element.value.trim() === ""
              ? (score--, (element.nextSibling.style.display = "block"))
              : (element.nextSibling.style.display = "none");
          }
        });
        return score === 6 ? true : false;
      }
    },
    {
      key: "generateBookFromUserEntries",
      value: function generateBookFromUserEntries() {
        var temp_book = {};
        new_book_input_fields.forEach(function (element) {
          var element_id = element.id.substr(element.id.indexOf("-") + 1);
          if (element.tagName.toLowerCase() === "select") {
            temp_book["".concat(element_id)] = element.value === "true";
          } else if (element.type.toLowerCase() === "date") {
            var book_formatted_date = new Date(element.value).toDateString();
            temp_book["".concat(element_id)] = book_formatted_date.substring(
              book_formatted_date.indexOf(" ") + 1
            );
          } else if (element.type.toLowerCase() === "number") {
            temp_book["".concat(element_id)] = element.value;
          } else {
            temp_book["".concat(element_id)] = element.value.capitalize();
          }
        });
        var book = new Book(temp_book);
        book.id = book.generateID;
        return book;
      }
    },
    {
      key: "removeBook",
      value: function removeBook(book_id) {
        bookshelf.dom_element.removeChild(
          document.querySelector("#book-".concat(book_id))
        );
        bookshelf.checkForEmptyBookCollection();
      }
    },
    {
      key: "displayBook",
      value: function displayBook(book) {
        bookshelf.checkForEmptyBookCollection();
        bookshelf.dom_element.insertAdjacentHTML("afterbegin", book);
        read_toggle = document.querySelector("#read_toggle");
      }
    },
    {
      key: "displayBookCollection",
      value: function displayBookCollection(book_collection) {
        //clear the bookshelf to display the collection
        Array.from(bookshelf.dom_element.children).forEach(function (item) {
          if (item.className !== "empty_library_section") {
            bookshelf.dom_element.removeChild(item);
          }
        });
        book_collection.forEach(function (element) {
          var book = new Book(element);
          bookshelf.displayBook(book.htmlMarkup);
        });
      }
    },
    {
      key: "updateBookStatus",
      value: function updateBookStatus(id) {
        document.querySelector("#".concat(id)).classList.toggle("read");
      }
    },
    {
      key: "updateBookLog",
      value: function updateBookLog() {
        var local_book_collection = _localStorage.read();
        if (local_book_collection) {
          books_total_count.textContent = local_book_collection.length;
          var read = local_book_collection.filter(function (book) {
            return book.read_status;
          });
          read_count.textContent = read.length;
          not_read_count.textContent =
            local_book_collection.length - read.length;
        } else {
          books_total_count.textContent = 0;
          read_count.textContent = 0;
          not_read_count.textContent = 0;
        }
      }
    },
    {
      key: "reorder",
      value: function reorder() {
        var order_by = order_by_toggle.value;
        var order = order_toggle.value === "ascending" ? true : false;
        var book_collection = _localStorage.read();

        // if the selected order is ascending the order value is true and the array is sorted accordingly else its false and again the array is sorted accordingly

        if (order_by === "insertion_date") {
          book_collection.sort(function (a, b) {
            var result = order
              ? new Date(b.insertion_date) - new Date(a.insertion_date)
              : new Date(a.insertion_date) - new Date(b.insertion_date);
            return result;
          });
        }
        if (order_by === "publishing_date") {
          book_collection.sort(function (a, b) {
            var result = order
              ? new Date(b.publishing_date) - new Date(a.publishing_date)
              : new Date(a.publishing_date) - new Date(b.publishing_date);
            return result;
          });
        }
        bookshelf.displayBookCollection(book_collection);
      }
    }
  ]);
  return VueManager;
})(); //im selection the second row avoiding the status_section row
var bookshelf = new VueManager(document.querySelectorAll(".row")[1]);
var new_book_form = new VueManager(document.querySelector(".add-book-form"));

//dom Elements
var add_new_book_btn = document.querySelector(".add-new-book");
var new_book_section = document.querySelector(".add_book_section");
var new_book_input_fields = document.querySelectorAll(
  "input, .add-book-form select"
);
var empty_lib_section = document.querySelector(".empty_library_section");
var books_total_count = document.querySelector("#books_count");
var read_count = document.querySelector("#read_b_count");
var not_read_count = document.querySelector("#not_read_b_count");
var order_by_toggle = document.querySelector("#order_by");
var order_toggle = document.querySelector("#order");
var read_toggle = null;
var dark_mode_toggle = document.querySelector("#dark-mode-toggle");
window.addEventListener("load", function (e) {
  bookshelf.checkForEmptyBookCollection();
  bookshelf.updateBookLog();
  var local_book_collection = _localStorage.read();
  bookshelf.displayBookCollection(local_book_collection);
});
bookshelf.dom_element.addEventListener("click", function (e) {
  if (e.target.classList.contains("remove-book")) {
    var book_id = e.target.parentNode.id.substring(
      e.target.parentNode.id.indexOf("-") + 1
    );
    _localStorage.remove(book_id);
    document
      .querySelector("#book-".concat(book_id))
      .classList.add("scale-out-center");
    setTimeout(function () {
      bookshelf.removeBook(book_id);
      bookshelf.updateBookLog();
    }, 350);
  } else if (e.target.id === "read_toggle") {
    var _book_id = e.target.parentNode.parentNode.id;
    var clicked_book = _localStorage.read(
      _book_id.substring(_book_id.indexOf("-") + 1)
    );
    clicked_book.toggleReadOrNot();
    _localStorage.update(clicked_book);
    bookshelf.updateBookStatus(_book_id);
    bookshelf.updateBookLog();
  }
});

// document events listeners
add_new_book_btn.addEventListener("click", function (e) {
  new_book_section.style.display = "flex";
});
new_book_section.addEventListener("click", function (e) {
  // close form if clicked on the empty portion or on close btn
  if (
    e.target.className === "add_book_section" ||
    e.target.classList.contains("close-form")
  ) {
    new_book_section.style.display = "none";
    new_book_form.clearFormFields();
  }
});
new_book_form.dom_element.addEventListener("click", function (e) {
  // clear fields button events
  if (e.target.classList.contains("clear")) {
    new_book_form.clearFormFields();
  }

  // add new book button event
  else if (e.target.classList.contains("add-book")) {
    if (new_book_form.checkUserEntries()) {
      var new_book = new_book_form.generateBookFromUserEntries();
      _localStorage.add(new_book);
      var rendered_book = new_book.htmlMarkup;
      bookshelf.displayBook(rendered_book);
      new_book_form.clearFormFields();
      new_book_section.style.display = "none";
    }
    bookshelf.updateBookLog();
  }
});
order_by_toggle.addEventListener("change", function (e) {
  bookshelf.reorder();
});
order_toggle.addEventListener("change", function (e) {
  bookshelf.reorder();
});
dark_mode_toggle.addEventListener("click", function (e) {
  var dark_mode_link = document.querySelector("#dark-css");
  if (dark_mode_link.getAttribute("href")) {
    dark_mode_toggle.style.color = "#000";
    dark_mode_link.removeAttribute("href");
  } else {
    dark_mode_toggle.style.color = "#fff";
    dark_mode_link.setAttribute("href", "dark-theme.css");
  }
});
