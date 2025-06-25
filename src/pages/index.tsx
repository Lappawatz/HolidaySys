import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Kanit } from "next/font/google";
import  Link  from "next/link";
import logo from "../images/calendar.png"; // แก้ไขให้ตรงกับ path ของโลโก้

const kanit = Kanit({
  subsets: ["latin", "thai"], // เพิ่ม thai เพื่อรองรับภาษาไทย
  variable: "--font-kanit",   // ตั้งชื่อ variable
  weight: ["400", "500", "700"], // เลือกน้ำหนักที่ใช้
});

export default function Home() {
  return (
    
    <main className= {`${kanit.variable} font-sans`}>
    {/* <main className={`${geistSans.variable} ${geistMono.variable} font-sans`}> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 ">
        <div className=" w-auto p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center text-black">
          <h2 className="text-3xl font-bold mb-6">ยินดีต้อนรับสู่ระบบขออนุญาตลาหยุด</h2>
          
          <Image
            src={logo}
            alt="Leave Request"
            width={200}
            height={200}
            className="mb-6  transition-transform transform hover:scale-110 hover:rotate-3 duration-300 ease-in-out "
          />
          <p className="text-lg mb-4">กรุณาเลือกเมนูด้านล่างเพื่อดำเนินการ</p>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center mt-2 mb-4">
            <Link
              href="/leaveStart"
              className="w-full md:w-auto bg-green-500 text-white font-medium px-6 py-3 rounded-xl shadow-xl shadow-green-800 hover:bg-green-600 transition duration-300 text-center hover:rotate-3"
             >
              ขออนุญาตลาหยุด
            </Link>
            <Link
              href="/leaveStatus"
              className="w-full md:w-auto bg-yellow-500 text-white font-medium px-6 py-3 rounded-xl shadow-xl shadow-amber-800 hover:bg-yellow-600 transition duration-300 text-center hover:rotate-3"
              >
              ตรวจสอบสถานะการลา
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
