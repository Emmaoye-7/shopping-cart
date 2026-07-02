// =============================================
// SHOPPING CART - JavaScript DOM Events
// =============================================

// Select all product card bodies
var cardBodies = document.querySelectorAll('.list-products .card-body');

// Select the total price display element
var totalEl = document.querySelector('.total');

// Select empty cart message
var emptyMsg = document.querySelector('.empty-cart-msg');

// =============================================
// FUNCTION: Update Total Price
// Loops through all visible cards and calculates
// total based on unit price × quantity
// =============================================
function updateTotal() {
  var total = 0;
  var visibleCount = 0;

  cardBodies.forEach(function (card) {
    // Only count cards that are still visible (not deleted)
    if (card.style.display !== 'none') {
      var quantityEl = card.querySelector('.quantity');
      var unitPriceEl = card.querySelector('.unit-price');

      // Parse the number from text like "100 $"
      var quantity = parseInt(quantityEl.textContent);
      var price = parseInt(unitPriceEl.textContent);

      total += quantity * price;
      visibleCount++;
    }
  });

  // Update total display
  totalEl.textContent = total + ' $';

  // Show empty cart message if no items left
  if (visibleCount === 0 && emptyMsg) {
    emptyMsg.style.display = 'flex';
  } else if (emptyMsg) {
    emptyMsg.style.display = 'none';
  }
}

// =============================================
// LOOP: Attach Events to Each Product Card
// =============================================
cardBodies.forEach(function (card) {
  // Select elements within this specific card
  var plusBtn    = card.querySelector('.fa-plus-circle');
  var minusBtn   = card.querySelector('.fa-minus-circle');
  var quantityEl = card.querySelector('.quantity');
  var trashBtn   = card.querySelector('.fa-trash-alt');
  var heartBtn   = card.querySelector('.fa-heart');

  // ------------------------------------------
  // PLUS BUTTON: Increase quantity by 1
  // ------------------------------------------
  plusBtn.addEventListener('click', function () {
    var quantity = parseInt(quantityEl.textContent);
    quantityEl.textContent = quantity + 1;
    updateTotal();
  });

  // ------------------------------------------
  // MINUS BUTTON: Decrease quantity by 1
  // (won't go below 0)
  // ------------------------------------------
  minusBtn.addEventListener('click', function () {
    var quantity = parseInt(quantityEl.textContent);
    if (quantity > 0) {
      quantityEl.textContent = quantity - 1;
      updateTotal();
    }
  });

  // ------------------------------------------
  // TRASH BUTTON: Remove item from cart
  // Hides the card and recalculates total
  // ------------------------------------------
  trashBtn.addEventListener('click', function () {
    // Animate out before hiding
    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';

    setTimeout(function () {
      card.style.display = 'none';
      updateTotal();
    }, 300);
  });

  // ------------------------------------------
  // HEART BUTTON: Toggle like / unlike
  // Toggles 'liked' CSS class for red color
  // ------------------------------------------
  heartBtn.addEventListener('click', function () {
    heartBtn.classList.toggle('liked');
  });
});

// =============================================
// CHECKOUT BUTTON: Show alert with total
// =============================================
var checkoutBtn = document.querySelector('.checkout-btn');
if (checkoutBtn) {
  checkoutBtn.addEventListener('click', function () {
    var total = totalEl.textContent;
    alert('✅ Order placed successfully!\nTotal: ' + total);
  });
}
