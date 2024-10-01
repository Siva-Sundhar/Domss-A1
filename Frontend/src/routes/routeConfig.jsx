// src/routes/routeConfig.js
import Home from '../components/Home';
import Voucher from '../components/Voucher';
import Contra from '../pages/vouchers/Contra';
import Purchase from '../pages/vouchers/Purchase';
import PurchaseOrder from '../pages/vouchers/PurchaseOrder';
import Receipt from '../pages/vouchers/Receipt';
import Journal from '../pages/vouchers/Journal';
import Payment from '../pages/vouchers/Payment';
import Sales from '../pages/vouchers/Sales';
import SalesOrder from '../pages/vouchers/SalesOrder';

const routeConfig = [
    { path: "/", element: <Home /> }, // Use JSX syntax here
    { path: '/vouchers', element: <Voucher />,
        children: [
            { path: '/vouchers/purchaseOrder', element: <PurchaseOrder /> },
            { path: '/vouchers/purchase', element: <Purchase />},
            { path: '/vouchers/receipt', element: <Receipt />},
            { path: '/vouchers/contra', element: <Contra />},
            { path: '/vouchers/journal', element: <Journal />},
            { path: '/vouchers/payment', element: <Payment />},
            { path: '/vouchers/sales', element: <Sales />},
            { path: '/vouchers/salesOrder', element: <SalesOrder />},

        ]
    },
    { path: "/purchase", element: <PurchaseOrder /> },
];

export default routeConfig;
