import LeaveRequestsTable from "../components/LeaveReqTable";
import { Kanit } from "next/font/google";
const kanit = Kanit({
  subsets: ["latin", "thai"], // เพิ่ม thai เพื่อรองรับภาษาไทย
  variable: "--font-kanit",   // ตั้งชื่อ variable
  weight: ["400", "500", "700"], // เลือกน้ำหนักที่ใช้
});
export default function Home() {
  return (
    <div className={`${kanit.variable} font-sans`}>
        {/* <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}> */}
          <div className="flex flex-col items-center justify-center min-h-screen bg-blue-950 w-auto ">
              <LeaveRequestsTable />
          </div>
        </div>
  );
}
