const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeIcon = document.getElementById('close-icon');
const selectedSeat = document.getElementById('selected-seat');
const totalBooked = document.getElementById('total-booked');
const availableSeat = document.getElementById('available-seat');
const totalPrice = document.getElementById('total-price');
const grandTotal = document.getElementById('grand-total');
const couponField = document.getElementById('coupon-field');
const couponBtn = document.getElementById('coupon-btn');
const defaultText = document.getElementById('default-text');
const showCouponPrice = document.getElementById('show-coupon-price');
const nextButton = document.getElementById('next-button');
const phoneNumber = document.getElementById('phone-number');
const btnContinue = document.getElementById('btn-continue');

menuBtn.addEventListener('click', () =>{
    menuBtn.children[0].classList.toggle('hidden');

    closeIcon.classList.toggle('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');

});

let selectedArray = [];
let totalPriceValue = 0;

function handleSelectSeat(event){
    // console.log(event.innerText);
    const value = event.innerText;

    if(selectedArray.includes(value))
    {
        alert("Seat Already Added");
        return;
    }
    if(selectedArray.length > 3)
    {
        alert("Maximum Seat Selected");
        return;
    }

    event.style.backgroundColor = "#1dd100";
    event.style.color = "#030712";

    // count selected seat
    selectedArray.push(event.innerText);
    totalBooked.innerText = selectedArray.length;

    // decrease available seat
    let seat = parseFloat(availableSeat.innerText); 
    seat -= 1;
    availableSeat.innerText = seat;

    // remove default seat
    defaultText.classList.add('hidden');

    // list add
    selectedSeat.innerHTML += `<li class="text-base font-normal flex justify-between">
    <span>${event.innerText}</span>
    <span class="ml-8">Economy</span>
    <span>1550.00</span>
    </li>`

    // price update
    totalPriceValue += 1550;
    totalPrice.innerText = totalPriceValue.toFixed(2);

    // active button
    if(selectedArray.length >= 2)
    {
        couponField.removeAttribute('disabled');
        couponBtn.removeAttribute('disabled');
    }

    // active next but by adding phone number
    phoneNumber.addEventListener('input', (e) => {

    const inputValue = e.target.value;
    if (inputValue.length === 11) 
    {
        nextButton.removeAttribute("disabled");
    } 
    else 
    {
        nextButton.setAttribute("disabled", true);
    }
    })
};

couponBtn.addEventListener('click', () => {
    const couponInputValue = couponField.value;

    let couponSave = 0; 

    console.log(couponInputValue);
    if (couponInputValue !== 'NEW15' && couponInputValue != 'Couple 20')
    {
        alert("Invalid Coupon");
        return;
    }
    if (couponInputValue === "NEW15")
    {
        couponSave = totalPriceValue * .15;
    }
    else if (couponInputValue === "Couple 20")
    {
        couponSave = totalPriceValue * .20;
    }

    // hide coupon input field and apply button
    // couponField.classList.add("hidden")
    // couponBtn.classList.add("hidden")

    // Discount
    const showCouponPrice = document.getElementById("show-coupon-price");
    showCouponPrice.innerHTML = `<p>Discount</p>
    <p><span>- BDT: </span> <span id="total-price">${ couponSave.toFixed(2) }</span></p>`

    // Grand Total
    const grandTotalValue = totalPriceValue - couponSave;
    grandTotal.innerText = grandTotalValue.toFixed(2);
});

    // Reload the window
    btnContinue.addEventListener('click',() =>{
    window.location.reload();
    });