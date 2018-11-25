'use strict';

var getElementMenu = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var responseMenu, products, _loop, i;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch('/allMenu');

          case 2:
            responseMenu = _context.sent;
            _context.next = 5;
            return responseMenu.json();

          case 5:
            products = _context.sent;
            _context.next = 8;
            return create(products);

          case 8:
            console.log(products);

            _loop = function _loop(i) {
              document.getElementsByClassName('headerItemMenu')[i].onclick = function () {
                var idClassName = document.getElementsByClassName('headerItemMenu')[i].id;

                for (var _i = 0; _i < products.length; _i++) {
                  if (products[_i]._id === idClassName) {
                    document.getElementById('enterKind').innerHTML = products[_i].name.toUpperCase();
                  }
                }
                filter(document.getElementsByClassName('headerItemMenu')[i].id, products[i].type);
              };
            };

            for (i = 0; i < document.getElementsByClassName('headerItemMenu').length; i++) {
              _loop(i);
            }
            return _context.abrupt('return', products);

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getElementMenu() {
    return _ref.apply(this, arguments);
  };
}();

var getMenuWith = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var responseMenu, responseMenuWithout, productsWithout, products, items;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch('/menuWith');

          case 2:
            responseMenu = _context2.sent;
            _context2.next = 5;
            return fetch('/menuWithout');

          case 5:
            responseMenuWithout = _context2.sent;
            _context2.next = 8;
            return responseMenuWithout.json();

          case 8:
            productsWithout = _context2.sent;
            _context2.next = 11;
            return responseMenu.json();

          case 11:
            products = _context2.sent;

            console.log(products);
            console.log(productsWithout);
            //  await   new Promise((resolve, reject) => setTimeout(resolve, 0));
            _context2.next = 16;
            return createMenuPretty(products);

          case 16:
            _context2.next = 18;
            return createMenuPrettyWithout(productsWithout);

          case 18:
            items = products.concat(productsWithout);
            //    let rezult = searchMenu(products);
            //  console.log(rezult);

            _context2.next = 21;
            return items;

          case 21:
            return _context2.abrupt('return', _context2.sent);

          case 22:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getMenuWith() {
    return _ref2.apply(this, arguments);
  };
}();

var searchMenu = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var discriptionForSearch, responseMenu, items, i;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            discriptionForSearch = [];
            _context3.next = 3;
            return fetch('/menuWith');

          case 3:
            responseMenu = _context3.sent;
            _context3.next = 6;
            return responseMenu.json();

          case 6:
            items = _context3.sent;

            for (i = 0; i < items.length; i++) {
              if (items[i].discription !== undefined && items[i].discription.includes(document.getElementById('searchTextMenu').value)) {
                discriptionForSearch.push(items[i]);
              }
            }
            //console.log(discriptionForSearch);
            filterOne(discriptionForSearch);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function searchMenu() {
    return _ref3.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function filter(name, kind) {
  //console.log(name, kind);
  for (var i = 0; i < document.getElementsByClassName('ItemsCenter').length; i++) {
    document.getElementsByClassName('ItemsCenter')[i].style.display = 'none';
  }
  for (var _i2 = 0; _i2 < document.getElementsByClassName('menuItemWith').length; _i2++) {
    document.getElementsByClassName('menuItemWith')[_i2].style.display = 'none';
  }
  if (kind !== undefined) {
    var _loop2 = function _loop2(_i3) {
      document.getElementById('centerMain').style.transform = 'scale(0.1)';
      setTimeout(function () {
        document.getElementsByClassName(name)[_i3].style.display = 'block';
        document.getElementById('centerMain').style.transform = 'scale(1)';
      }, 300);
    };

    for (var _i3 = 0; _i3 < document.getElementsByClassName(name).length; _i3++) {
      _loop2(_i3);
    }
  } else {
    var _loop3 = function _loop3(_i4) {

      document.getElementById('centerMain').style.opacity = 0;
      setTimeout(function () {
        document.getElementsByClassName(name)[_i4].style.display = 'flex';
        document.getElementById('centerMain').style.opacity = 1;
      }, 500);
    };

    for (var _i4 = 0; _i4 < document.getElementsByClassName(name).length; _i4++) {
      _loop3(_i4);
    }
  }
}


function filterOne(item) {
  console.log(item);
  for (var i = 0; i < document.getElementsByClassName('ItemsCenter').length; i++) {
    document.getElementsByClassName('ItemsCenter')[i].style.display = 'none';
  }
  for (var _i5 = 0; _i5 < document.getElementsByClassName('menuItemWith').length; _i5++) {
    document.getElementsByClassName('menuItemWith')[_i5].style.display = 'none';
  }
  for (var _i6 = 0; _i6 < item.length; _i6++) {
    document.getElementById('00' + item[_i6]._id).style.display = 'block';
  }
}
getElementMenu();
getMenuWith();

function create(items) {
  console.log(items);
  for (var i = 0; i < items.length; i++) {
    var div = document.createElement("div");
    div.className = 'headerItemMenu';
    div.id = items[i]._id;
    document.getElementById('centerMainHeader').appendChild(div);

    var img = document.createElement("img");
    img.className = 'headerItemMenuImage';
    img.src = "../public/image/allMenu/" + items[i]._id + '.jpg';
    document.getElementById(div.id).appendChild(img);

    var text = document.createElement("div");
    text.className = 'headerItemMenuDiscription';
    text.innerHTML = items[i].name;
    document.getElementById(div.id).appendChild(text);
  }
  //  console.log('createheader')
}
function arrayUnique(massivKind) {
  return massivKind.filter(function (e, i, a) {
    return a.indexOf(e) == i;
  });
};

function createMenuPrettyWithout(items) {
  //  console.log(items);

  var massivKind = [];
  for (var _i7 = 0; _i7 < items.length; _i7++) {
    massivKind[_i7] = items[_i7].kind;
  }

  //console.log(massivKind);
  massivKind = arrayUnique(massivKind);
  //console.log(massivKind);

  for (var _i8 = 0; _i8 < massivKind.length; _i8++) {
    var div = document.createElement("div");
    div.className = 'menuItemWith ' + massivKind[_i8];
    div.id = '00' + massivKind[_i8];
    div.style.display = 'none';
    document.getElementById('centerMain').appendChild(div);

    var img = document.createElement("div");
    img.className = 'menuItemWithPhoto ';
    //img.src  = "public/image/"+massivKind[i]+".jpg";
    img.style.backgroundImage = "url(public/image/menuPhoto/" + massivKind[_i8] + ".jpg)";
    document.getElementById(div.id).appendChild(img);

    var discription = document.createElement("div");
    discription.className = 'menuItemWithDiscription ';
    discription.id = 'discription' + massivKind[_i8];
    document.getElementById(div.id).appendChild(discription);
  }
  for (var i = 0; i < items.length; i++) {
    var text = document.createElement("div");
    text.className = 'menuItemWithDiscriptionText';
    text.id = 'discriptionText' + items[i].name.split(' ').join('');
    document.getElementById('discription' + items[i].kind).appendChild(text);

    var name = document.createElement("div");
    name.className = 'menuItemWithDiscriptionTextName';
    name.innerHTML = items[i].name;
    document.getElementById('discriptionText' + items[i].name.split(' ').join('')).appendChild(name);

    var gram = document.createElement("div");
    gram.className = 'menuItemWithDiscriptionTextGram';
    gram.innerHTML = items[i].gram;
    document.getElementById('discriptionText' + items[i].name.split(' ').join('')).appendChild(gram);
    if (items[i].other != undefined) {
      var other = document.createElement("div");
      other.className = 'menuItemWithDiscriptionTextOther';
      other.innerHTML = items[i].other;
      document.getElementById('discriptionText' + items[i].name.split(' ').join('')).appendChild(other);
    }

    var price = document.createElement("div");
    price.className = 'menuItemWithDiscriptionTextPrice';
    price.innerHTML = items[i].price;
    document.getElementById('discriptionText' + items[i].name.split(' ').join('')).appendChild(price);
  }
}

function createMenuPretty(items) {

  for (var i = 0; i < items.length; i++) {
    var div = document.createElement("div");
    div.className = 'ItemsCenter ' + items[i].kind;
    div.id = '00' + items[i]._id;
    div.discription = items[i].discription;
    document.getElementById('centerMain').appendChild(div);

    //ТУТ БУДЕТ ТРЕШАК!!!!

    var img = document.createElement("div");
    img.className = 'imageMenu';
    img.id = i + items[i]._id;
    document.getElementById(div.id).appendChild(img);

    var conteiner = document.createElement("div");
    conteiner.className = 'container';
    conteiner.id = items[i]._id + i;
    document.getElementById(img.id).appendChild(conteiner);

    var front = document.createElement("div");
    front.className = 'front';
    front.id = '123' + items[i]._id;
    front.style.backgroundImage = "url(public/image/menuPhoto/" + items[i]._id + ".jpg)";
    document.getElementById(conteiner.id).appendChild(front);

    var back = document.createElement("div");
    back.className = 'back';
    back.id = i + items[i]._id + i;
    document.getElementById(conteiner.id).appendChild(back);

    var pDisc = document.createElement("p");
    pDisc.className = 'inner';
    pDisc.innerHTML = items[i].discription;
    document.getElementById(back.id).appendChild(pDisc);

    ///////////////////////////
    var pName = document.createElement("p");
    pName.className = 'pName';
    pName.innerHTML = items[i].name;
    document.getElementById(div.id).appendChild(pName);

    var addCart = document.createElement("div");
    addCart.className = 'addCart';
    addCart.id = items[i]._id;
    document.getElementById(div.id).appendChild(addCart);

    var weight = document.createElement("div");
    weight.className = 'weight';
    weight.innerHTML = items[i].gram;
    document.getElementById(addCart.id).appendChild(weight);

    var pPrice = document.createElement("div");
    pPrice.className = 'pPrice';
    pPrice.innerHTML = items[i].price;
    document.getElementById(addCart.id).appendChild(pPrice);
    //console.log(items[i]);
    if (items[i].gram1 !== undefined) {

      var _addCart = document.createElement("div");
      _addCart.className = 'addCart';
      _addCart.id = items[i]._id + items[i].gram1;
      document.getElementById(div.id).appendChild(_addCart);

      var _weight = document.createElement("div");
      _weight.className = 'weight';
      _weight.innerHTML = items[i].gram1;
      document.getElementById(_addCart.id).appendChild(_weight);

      var _pPrice = document.createElement("div");
      _pPrice.className = 'pPrice';
      _pPrice.innerHTML = items[i].price1;
      document.getElementById(_addCart.id).appendChild(_pPrice);
    }
  }
}
