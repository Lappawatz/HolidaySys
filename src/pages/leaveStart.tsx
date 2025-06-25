import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Kanit } from "next/font/google";
import LeaveRequestForm from "../components/LeaveReqForm";

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
    <div className={`${kanit.variable} font-sans`}>
      <div className="py-20 min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 ">
          <LeaveRequestForm />
      </div>
    </div>
  );
}
