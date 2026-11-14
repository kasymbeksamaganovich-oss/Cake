let selectedCakeName = "Балдуу (Медовик)";
let selectedCakePrice = 800;
let isFreeDeliveryCake = false;

function selectCake(element, name, price, freeDelivery) {
    document.querySelectorAll('.cake-option').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    selectedCakeName = name;
    selectedCakePrice = price;
    isFreeDeliveryCake = freeDelivery;
    calculate();
}

function calculate() {
    let shapePrice = Number(document.getElementById('shape').value);
    let weight = Number(document.getElementById('weight').value);
    let qty = Number(document.getElementById('qty').value);
    let deliveryPrice = Number(document.getElementById('delivery').value);

    let extras = 0;
    if (document.getElementById('textSign').checked) extras += 150;
    if (document.getElementById('berries').checked) extras += 300;
    if (document.getElementById('candles').checked) extras += 100;

    // 1. Акция: 2 торт алса 1 белек
    let giftAlert = document.getElementById('giftAlert');
    if (qty >= 2) {
        giftAlert.style.display = 'block';
    } else {
        giftAlert.style.display = 'none';
    }

    // 2. Акция: Трюфель тортун алса доставка бекер
    let freeDelAlert = document.getElementById('freeDeliveryAlert');
    if (isFreeDeliveryCake && deliveryPrice > 0) {
        deliveryPrice = 0;
        freeDelAlert.style.display = 'block';
    } else {
        freeDelAlert.style.display = 'none';
    }

    let total = ((selectedCakePrice * weight + shapePrice + extras) * qty) + deliveryPrice;
    document.getElementById('totalPrice').innerText = total;
}

function submitOrder() {
    let client = document.getElementById('client').value;
    if (!client) {
        alert("Сураныч, атыңызды жазыңыз!");
        return;
    }

    let shapeSelect = document.getElementById('shape');
    let shapeText = shapeSelect.options[shapeSelect.selectedIndex].text.split('(')[0].trim();
    let weight = document.getElementById('weight').value;
    let qty = Number(document.getElementById('qty').value);
    let total = document.getElementById('totalPrice').innerText;

    let bonusText = qty >= 2 ? "<br>🎁 <b>Белек:</b> 1 даана мини-торт акысыз кошулду!" : "";
    let delText = isFreeDeliveryCake ? "Бекер (Акция боюнча)" : document.getElementById('delivery').options[document.getElementById('delivery').selectedIndex].text;

    let receipt = document.getElementById('receipt');
    receipt.style.display = 'block';
    receipt.innerHTML = `
        <strong>✅ Буйрутма ийгиликтүү моделденди!</strong><br><br>
        <b>Кардар:</b> ${client}<br>
        <b>Торт:</b> ${selectedCakeName} (${shapeText})<br>
        <b>Салмагы жана саны:</b> ${weight} кг × ${qty} даана<br>
        <b>Жеткирүү:</b> ${delText}
        ${bonusText}<br><br>
        <b>Жалпы төлөм:</b> <span style="font-size:16px; color:#d81b60;">${total} сом</span>
    `;
}

// Сайт ачылганда баштапкы бааны эсептөө
calculate();