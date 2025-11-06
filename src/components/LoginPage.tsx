import { useState } from "react";
import svgPaths from "../imports/svg-6p7k8dpe2s";
import imgFrame12 from "figma:asset/2e95e94bca83863203e6dd51327d99b7dfa9f571.png";
import imgRectangle7 from "figma:asset/db51935950235edc04164e226b66c0aaae854a7e.png";

interface LoginPageProps {
  onLogin: () => void;
}

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

function Eye({ showPassword, onClick }: { showPassword: boolean; onClick: () => void }) {
  return (
    <div className="relative shrink-0 size-[20px] cursor-pointer" data-name="eye" onClick={onClick}>
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

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email or phone number is required";
    } else if (email.includes("@") && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onLogin();
    }
  };

  return (
    <div className="bg-white relative size-full min-h-screen" data-name="Log in">
      <Frame7 />
      <form onSubmit={handleSubmit} className="absolute content-stretch flex flex-col gap-[33px] items-start left-[50px] top-[151px] w-[483px]">
        <Frame8 />
        <Frame4 />
        
        <div className="content-stretch flex flex-col gap-[18px] items-start relative shrink-0 w-[380px]">
          {/* Email/Phone Field */}
          <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] w-full">Email / Phone Number</p>
            <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
              <div aria-hidden="true" className={`absolute border ${errors.email ? 'border-red-500' : 'border-[#dadada]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
              <div className="flex flex-row items-center size-full">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or phone number"
                  className="box-border content-stretch flex gap-[10px] h-[42px] items-center px-[20px] py-[8px] relative w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0]"
                />
              </div>
            </div>
            {errors.email && <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] w-full">Password</p>
            <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
              <div aria-hidden="true" className={`absolute border ${errors.password ? 'border-red-500' : 'border-[#dadada]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
              <div className="flex flex-row items-center size-full">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="box-border content-stretch flex gap-[10px] h-[42px] items-center px-[20px] py-[8px] relative w-[calc(100%-40px)] font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0]"
                />
                <div className="pr-[20px]">
                  <Eye showPassword={showPassword} onClick={() => setShowPassword(!showPassword)} />
                </div>
              </div>
            </div>
            {errors.password && <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">{errors.password}</p>}
          </div>
        </div>

        <button type="button" className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] min-w-full not-italic relative shrink-0 text-[#9dc183] text-[14px] w-[min-content] text-left cursor-pointer bg-transparent border-none">
          Forgot password?
        </button>

        <button type="submit" className="bg-[#9dc183] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[120px] py-[6px] relative rounded-[25px] shrink-0 w-[377px] border-none cursor-pointer">
          <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white whitespace-pre">Log in</p>
        </button>
      </form>
      
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[normal] left-[50px] not-italic text-[#9dc183] text-[14px] text-nowrap top-[705px] whitespace-pre">
        <span className="text-[#b0b0b0]">Don't have an account?</span> <span className="font-['Inter:Bold',sans-serif] font-bold cursor-pointer">Create one</span>
      </p>
    </div>
  );
}
