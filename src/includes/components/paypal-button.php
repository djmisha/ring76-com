<?php
/**
 * Payment Instructions Button Component
 * 
 * A reusable component for displaying payment instructions in a modal.
 * 
 * @param string $button_text - Text to display on the button
 * @param string $button_class - Additional CSS classes for styling
 */

// Default values
$button_text = $button_text ?? 'Payment Instructions';
$button_class = $button_class ?? 'content-btn';
$modal_id = 'payment-modal-' . mt_rand(100, 999); // Generate a unique modal ID
?>

<a class="<?php echo htmlspecialchars($button_class); ?>" 
        onclick="document.getElementById('<?php echo $modal_id; ?>').style.display='block'">
  <?php echo htmlspecialchars($button_text); ?>
</a>

<!-- Modal for Payment Instructions -->
<div id="<?php echo $modal_id; ?>" class="modal">
  <div class="modal-content">
    <span class="close" onclick="document.getElementById('<?php echo $modal_id; ?>').style.display='none'">&times;</span>
    <h3>Payment Methods</h3>
    <div class="modal-body">
      <p>The amount for Ring 76 annual dues is $30 ($15 for junior members and $15 for non-resident members).</p>
      
      <h4>We have three ways to pay:</h4>
      
      <div class="payment-option">
        <span class="payment-icon">💻</span>
        <div class="payment-details">
          <strong>Via PayPal:</strong>
          <p>Send your dues via PayPal to <strong>payments@ring76.com</strong><br>
          Please put "Dues for (Your Name)" in the comments section.</p>
        </div>
      </div>
      
      <div class="payment-option">
        <span class="payment-icon">💵</span>
        <div class="payment-details">
          <strong>In Person:</strong>
          <p>Pay James Thayer directly when you see him at a Ring Meeting. He accepts cash and checks.</p>
        </div>
      </div>

      <div class="payment-option">
        <span class="payment-icon">✉️</span>
        <div class="payment-details">
          <strong>By Mail:</strong>
          <p>Make a check out to "IBM Ring 76" and send it to:<br>
          Ring 76 c/o James Thayer<br>
          9556 Babauta Road<br>
          San Diego, CA 92129</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
/* Modal Styles */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: auto;
}

.modal-content {
  background-color: #292929;
  margin: 10% auto;
  padding: 25px;
  border: 1px solid #444;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  position: relative;
  animation: modalFadeIn 0.4s ease-out;
}

@keyframes modalFadeIn {
  from {opacity: 0; transform: translateY(-30px);}
  to {opacity: 1; transform: translateY(0);}
}

.modal-content h3 {
  color: #d4ac0d;
  font-family: 'Lobster Two', cursive;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.modal-content h4 {
  color: #d4ac0d;
  font-family: 'Lobster Two', cursive;
  font-size: 1.3rem;
  margin: 20px 0 15px;
}

.modal-body {
  color: #d4d4d4;
}

.modal-body p {
  margin-bottom: 15px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.payment-option {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  border-left: 3px solid #8b0000;
  transition: transform 0.3s ease;
}

.payment-icon {
  font-size: 2rem;
  margin-right: 15px;
  flex-shrink: 0;
}

.payment-details {
  flex-grow: 1;
}

.payment-details strong {
  color: #f0f0f0;
  display: block;
  margin-bottom: 5px;
  font-size: 1.15rem;
}

.payment-details p {
  margin: 0;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: bold;
  color: #d4ac0d;
  cursor: pointer;
  transition: color 0.3s;
}

.close:hover {
  color: #8b0000;
}

/* Responsive styles */
@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    margin: 20% auto;
    padding: 20px;
  }
  
  .modal-content h3 {
    font-size: 1.5rem;
  }

  .modal-content h4 {
    font-size: 1.2rem;
  }
  
  .payment-option {
    padding: 12px;
  }
  
  .payment-icon {
    font-size: 1.7rem;
    margin-right: 12px;
  }
  
  .payment-details strong {
    font-size: 1.1rem;
  }
  
  .payment-details p {
    font-size: 0.95rem;
  }
}
</style>