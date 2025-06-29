import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <Result
            status="error"
            title="Payment Failed"
            subTitle="Your payment was not completed. Please try again."
            extra={[
                <Button type="primary" key="retry" onClick={() => navigate('/')}>
                    Try Again
                </Button>
            ]}
        />
    );
}

export default PaymentFailed;
