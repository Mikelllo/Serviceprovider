import imgFrame12 from "figma:asset/2e95e94bca83863203e6dd51327d99b7dfa9f571.png";
import { CheckCircle2 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="bg-white relative size-full min-h-screen flex items-center justify-center">
      {/* Background decorative element */}
      <div className="absolute box-border content-stretch flex flex-col gap-[10px] h-[400px] items-start justify-end right-[50px] top-[100px] rounded-[25px] w-[500px] opacity-50">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[25px] size-full"
          src={imgFrame12}
        />
      </div>

      <div className="absolute box-border content-stretch flex flex-col gap-[10px] h-[350px] items-start justify-end left-[50px] bottom-[100px] rounded-[25px] w-[450px] opacity-50">
        <img
          alt=""
          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[25px] size-full"
          src={imgFrame12}
        />
      </div>

      {/* Success message */}
      <div className="relative z-10 content-stretch flex flex-col gap-[33px] items-center justify-center w-full max-w-[600px] px-[50px]">
        <div className="bg-[#9dc183] rounded-full p-[20px]">
          <CheckCircle2 className="w-[60px] h-[60px] text-white" />
        </div>

        <div className="content-stretch flex flex-col gap-[18px] items-center not-italic text-center w-full">
          <p className="font-['Poppins:Bold',sans-serif] font-bold leading-[normal] text-[30px] text-black">
            Profile Setup Complete!
          </p>
          <p className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] text-[#b0b0b0] text-[16px] max-w-[500px]">
            Thank you for completing your profile. Your information has been
            submitted for verification. You will receive a notification once
            your account is activated.
          </p>
        </div>

        <div className="box-border content-stretch flex flex-col gap-[20px] items-center px-[31px] py-[37px] relative rounded-[25px] w-full max-w-[500px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[25px]"
          >
            <div className="absolute bg-[#f5f5f5] inset-0 rounded-[25px]" />
          </div>
          <div className="relative z-10 content-stretch flex flex-col gap-[16px] items-start w-full">
            <p className="font-['Poppins:Semi_Bold',sans-serif] font-semibold text-[18px] text-[#1e1e1e]">
              What's Next?
            </p>
            <ul className="font-['Poppins:Regular',sans-serif] font-normal text-[14px] text-[#1e1e1e] leading-[25px] space-y-[8px] list-disc pl-[20px]">
              <li>
                Our team will review your profile and verification documents
              </li>
              <li>You will receive an email within 30 minutes</li>
              <li>
                Once approved, you can start connecting with GBV survivors
              </li>
              <li>You'll gain access to the full SAFE AI platform dashboard</li>
            </ul>
          </div>
        </div>

        <div className="content-stretch flex flex-col gap-[15px] items-center text-center w-full">
          <p className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] text-[#b0b0b0] text-[14px] italic">
            "Your courage inspires us—Every step forward is a step toward
            healing and hope."
          </p>
          <p className="font-['Poppins:Regular',sans-serif] font-normal text-[#9dc183] text-[14px]">
            ~ Safe AI Team
          </p>
        </div>
      </div>
    </div>
  );
}
