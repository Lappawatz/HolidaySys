import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import LeaveRequestForm from "../components/LeaveReqForm";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">ระบบขออนุญาตลาหยุด</h1>
          <LeaveRequestForm />
        </div>
      </div>
    </div>
  );
}
