const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation here
    if (isValid(formData)) {
        try {
            const res = await FuzzyApi.getAllOrders(formData.phone, formData.delivery_address);
            for (let order of res) {
                if (JSON.stringify(order.items) === JSON.stringify(cart)) {
                    // Found a matching order
                    setShowDuplicatePopup(true);
                    break; // Exit the loop since we found a match
                }
            }
        } catch (e) {
            console.error(e);
            setShowSuccessPopup(true);
            setPopupMessage('Something went wrong back there! Please try again later.');
        }

        // Add confirmation prompt
        if (!showDuplicatePopup) {
            const isConfirmed = window.confirm('Are you sure you want to submit this order?');

            if (isConfirmed) {
                try {
                    console.log('Form is valid, proceed with submission.');
                    const res = await FuzzyApi.createOrder({ ...formData });
                    setShowSuccessPopup(true);
                    alert('Your order was submitted successfully!');
                    setCart([]);
                    navigate('/insects'); // Navigate to /insects
                } catch (e) {
                    console.error(e);
                    setShowSuccessPopup(true);
                    setPopupMessage('An error occurred while submitting your order. Please try again.');
                }
            } else {
                // Cancel the submission if user doesn't confirm
                console.log('Submission cancelled by user');
            }
        }
    } else {
        console.error('Form validation failed.');
    }
};
