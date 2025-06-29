import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate();

    return (
        <Result
            status="success"
            title="Payment Successful!"
            subTitle="Your booking is confirmed."
            extra={[
                <Button type="primary" key="home" onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            ]}
        />
    );
}

export default PaymentSuccess;
