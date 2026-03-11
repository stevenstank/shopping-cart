import './PaymentSection.css';

function PaymentSection() {
  return (
    <div className="payment-section">
      <p className="payment-warning">
        IF YOU PAY YOU WONT GET THE ITEM BUT I WILL GET THE MONEY
      </p>
      <img src="public/QR.jpeg" alt="Payment QR code" className="payment-qr" />
    </div>
  );
}

export default PaymentSection;
