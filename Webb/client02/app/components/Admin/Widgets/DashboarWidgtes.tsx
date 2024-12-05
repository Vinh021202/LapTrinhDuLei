import React, { FC } from 'react'
import UseAnalytics from '../Analytics/UseAnalytics';
import { BiBorderLeft } from 'react-icons/bi';
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from '@mui/material';
import OrdersAnalytics from '../Analytics/OerdersAnalytics';
import AllInvoices from "../Order/AllInvoices"

type Props = {
    open?: boolean;
    value?:number;
}
const CircularProgressWithLabel:FC<Props> = ({open ,value}) => {
    return (
        <Box 
            sx={{position: "relative", display: "inline-flex" }}>
            <CircularProgress
                variant='determinate'
                value={value}
                size={45}
                color={value && value > 90 ? "info" : 'error'}
                thickness={4}
                style={{zIndex:open ? -1 : 1}}
            />
            <Box 
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >

            </Box>
        
        </Box>
    )
}

const DashboarWidgtes:FC<Props> = ({open}) => {

    return ( 
        <div className='mt-[30px] min-h-screen'>
            <div className='grid grid-cols-[75%,25%]'>
                <div className='p-8'>
                    <UseAnalytics />
                </div>
                <div className='pt-[80%] pr-8'>
                    {/* Widget 1 */}
                    <div className='dark:bg-[#111C43] bg-white rounded-sm shadow p-5'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <BiBorderLeft className='dark:text-[#45CBA0] text-[#000] text-[30px]' />
                                <div className='ml-4'>
                                    <h5 className='font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                        120
                                    </h5>
                                    <h5 className='font-Poppins dark:text-[#45CBA0] text-black text-[400]'>
                                        Doanh số đạt được
                                    </h5>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <CircularProgressWithLabel value={100} open={open} />
                                <h5 className='text-center pt-4 text-[16px]'>+120</h5>
                            </div>
                        </div>
                    </div>

                    {/* Widget 2 */}
                    <div className='dark:bg-[#111C43] bg-white rounded-sm shadow p-5'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[20px]" />
                                <div className='ml-4'>
                                    <h5 className='font-Poppins dark:text-[#fff] text-black text-[20px]'>
                                        450
                                    </h5>
                                    <h5 className='font-Poppins dark:text-[#45CBA0] text-black text-[20px]'>
                                        Người Mới
                                    </h5>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <CircularProgressWithLabel value={100} open={open} />
                                <h5 className='text-center pt-4 text-[16px]'>+150</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-[65%, 35%] mt-[-20px]">
  <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto">
    <OrdersAnalytics isDashboard={true} />
  </div>
  <div className="p-5">
    <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
    Giao dịch gần đây
    </h5>
    <AllInvoices isDashboard={true} />
  </div>
</div>

        </div>
    )
}

export default DashboarWidgtes