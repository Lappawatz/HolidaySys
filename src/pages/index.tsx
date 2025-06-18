import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Kanit } from "next/font/google";
import  Link  from "next/link";
import logo from "../images/calendar.png"; // แก้ไขให้ตรงกับ path ของโลโก้
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  subsets: ["latin", "thai"], // เพิ่ม thai เพื่อรองรับภาษาไทย
  variable: "--font-kanit",   // ตั้งชื่อ variable
  weight: ["400", "500", "700"], // เลือกน้ำหนักที่ใช้
});

export default function Home() {
  return (
    <main className={`${kanit.variable} font-sans`}>
    {/* <main className={`${geistSans.variable} ${geistMono.variable} font-sans`}> */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-950">
        <div className=" w-[600px] p-6 bg-white rounded-xl shadow-md flex flex-col items-center justify-center text-black">
          <h2 className="text-3xl font-bold mb-6">ยินดีต้อนรับสู่ระบบขออนุญาตลาหยุด</h2>
          
          <Image
            src={logo}
            alt="Leave Request"
            width={200}
            height={200}
            className="mb-6 "
          />
          <p className="text-lg mb-4">กรุณาเลือกเมนูด้านล่างเพื่อดำเนินการ</p>
          <div className="flex flex-row space-x-4 ">
            <Link href="/leaveStart" className="bg-green-500 w-auto text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
              ขออนุญาตลาหยุด
            </Link>
            <Link href="/leaveStatus" className="bg-yellow-500 w-auto text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
              ตรวจสอบสถานะการลา
            </Link>
        </div>
      </div>
      </div>
    </main>
  );
}
