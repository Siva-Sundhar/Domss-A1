
import { useEffect } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { Link, Outlet, useLocation, useNavigate} from "react-router-dom";

const Voucher = () => {
    const history = useNavigate()
	const location = useLocation();
	
    useEffect(() => {
			const handleKey = (event) => {
				if (event.key === "Escape") {
					history("/");
				}
			};
			window.addEventListener("keydown", handleKey);
			return () => {
				window.removeEventListener("keydown", handleKey);
			};
		}, [history]);
    
    const child = [
		{ path: '/vouchers/contra', element: 'Contra', key:'F3'},
		{ path: '/vouchers/journal', element: 'Journal', key:'F4'},
		{ path: '/vouchers/receipt', element: 'Receipt', key:'F5'},
		{ path: '/vouchers/payment', element: 'Payment', key:'F6'},
		{ path: '/vouchers/sales', element: 'Sales', key:'F7'},
		{ path: '/vouchers/salesOrder', element: 'Sales Order', key:'F8'},
		{ path: '/vouchers/purchase', element: 'Purchase', key:'F9'},
		{ path: '/vouchers/purchaseOrder', element: 'Purchase Order', key:'F10'},
    ]
    const isActive = (path) =>
		location.pathname === path ||
		(path === "/vouchers/purchase" && location.pathname === "/vouchers");

	return (
		<>
			<div className="flex justify-evenly" >
				<div className=" w-[95%] flex h-screen">
					<Outlet />
				</div>
				<div className="h-screen w-[11%] bg-[#def1fc] border border-blue-300">
					<nav>
						<ul className="">
							<li className="text-[12px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center">
								<Link>
									<strong className="mr-0.5 text-[#55a7d8]">F2:</strong>Date
								</Link>
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
							</li>
							{
                child.map((item, index) => (
                  <li className="text-[12px] h-6 pl-0.5 bg-white shadow w-[93%] mx-auto my-1 flex justify-between items-center" key={index}>
								<Link
									to={item.path}
									className={`
										${isActive(item.path)
											? "text-gray-400 pointer-events-none"
											: ""
									} w-full`}
								>
									<strong
										className={`mr-0.5 ${
											isActive(item.path)
												? "text-gray-400"
												: "text-[#55a7d8]"
										}`}
									>
										{item.key}:
									</strong>
									{item.element}
								</Link> 
								<div className="border-l border-black h-full my-auto">
									<HiChevronLeft className=" h-full my-auto" />
								</div>
								
							</li>))
              }
						</ul>
					</nav>
				</div>
			</div>
		</>
	);
};

export default Voucher;
