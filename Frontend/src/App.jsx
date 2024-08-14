import { BrowserRouter, Route, Routes } from "react-router-dom"
import CompanyCreation from "./Pages/CompanyCreation"
// import CountryStateCity from "./Pages/CountryStateCity"
import PurchaseOrder from "./Pages/vouchers/PurchaseOrder"
import Sales from "./Pages/vouchers/Sales"
import SalesOrder from "./Pages/vouchers/SalesOrder"
import Purchase from "./Pages/vouchers/Purchase"
import SubForm from "./utils/SubForm"
import Table from "./utils/Table"




function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CompanyCreation />} />
          {/* <Route path="state" element={<CountryStateCity />} /> */}
          <Route path="sub" element={<SubForm />} />
          <Route path="purchase" element={<Purchase />} />
          <Route path="purchaseOrder" element={<PurchaseOrder />} />
          <Route path="salesOrder" element={<SalesOrder />} />
          <Route path="sales" element={<Sales />} />
          <Route path="table" element={<Table />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
