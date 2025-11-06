import svgPaths from "./svg-6p7k8dpe2s";
import imgFrame12 from "figma:asset/2e95e94bca83863203e6dd51327d99b7dfa9f571.png";
import imgRectangle7 from "figma:asset/db51935950235edc04164e226b66c0aaae854a7e.png";

function Frame5() {
  return (
    <div className="content-stretch flex flex-col gap-[41px] items-end leading-[30px] not-italic relative shrink-0 text-[#e0e0e0] w-[445px]">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[25px] text-center w-full">Your courage inspires us—Every step forward is a step toward healing and hope.</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[18px] text-right w-full">~ Safe AI Team</p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-[265px] items-center justify-center px-[31px] py-[37px] relative rounded-[25px] shrink-0 w-[508px]">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[25px]">
        <img alt="" className="absolute max-w-none object-50%-50% object-cover rounded-[25px] size-full" src={imgFrame12} />
        <div className="absolute bg-[rgba(0,0,0,0.21)] inset-0 rounded-[25px]" />
      </div>
      <Frame5 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[10px] h-[711px] items-start justify-end left-[calc(50%+10px)] px-[33px] py-[27px] rounded-[25px] top-[73px] w-[575px]">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[25px] size-full" src={imgFrame12} />
      <Frame6 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[13px] items-center justify-center relative shrink-0">
      <div className="relative rounded-[10px] shrink-0 size-[30px]">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[10px] size-full" src={imgRectangle7} />
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start not-italic relative shrink-0 w-full">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] min-w-full relative shrink-0 text-[25px] text-black w-[min-content]">Welcome Back</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#b0b0b0] text-[14px] w-[419px]">Please fill in the information below to log back into your account</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#dadada] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[42px] items-center px-[20px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#b0b0b0] text-[14px] text-nowrap whitespace-pre">Enter your email or phone number</p>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] w-full">Email / Phone Number</p>
      <Frame />
    </div>
  );
}

function Eye() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="eye">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_1_51)" id="eye">
          <path d={svgPaths.p3d74ed00} id="Vector" stroke="var(--stroke-0, #B0B0B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #B0B0B0)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_1_51">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#dadada] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[10px] h-[42px] items-center px-[20px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#b0b0b0] text-[14px] w-[303px]">Enter your password</p>
          <Eye />
        </div>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] w-full">Password</p>
      <Frame2 />
    </div>
  );
}

function InputFields() {
  return (
    <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-[380px]" data-name="Input fields">
      <Frame1 />
      <Frame3 />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#9dc183] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[120px] py-[6px] relative rounded-[25px] shrink-0 w-[377px]" data-name="Button">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white whitespace-pre">Log in</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[33px] items-start left-[50px] top-[151px] w-[483px]">
      <Frame8 />
      <Frame4 />
      <InputFields />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] min-w-full not-italic relative shrink-0 text-[#9dc183] text-[14px] w-[min-content]">Forgot password?</p>
      <Button />
    </div>
  );
}

export default function LogIn() {
  return (
    <div className="bg-white relative size-full" data-name="Log in">
      <Frame7 />
      <Frame9 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[50px] not-italic text-[#9dc183] text-[14px] text-nowrap top-[705px] whitespace-pre">
        <span className="text-[#b0b0b0]">Don’t have an account?</span> <span className="font-['Inter:Bold',sans-serif] font-bold">Create one</span>
      </p>
    </div>
  );
}