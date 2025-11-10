import { useState } from "react";
import imgFrame12 from "figma:asset/2e95e94bca83863203e6dd51327d99b7dfa9f571.png";
import { Upload, ChevronDown, X, Camera, ChevronLeft } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";

interface ProfileSetupProps {
  onComplete: () => void;
}

interface FormData {
  profilePicture: File | null;
  title: string;
  firstName: string;
  lastName: string;
  organizationName: string;
  gender: string;
  idPassportNumber: string;
  country: string;
  serviceType: string[];
  county: string;
  town: string;
  educationRank: string;
  clientele: string[];
  clientcapacity: string;
  hoursOfOperation: string;
  yearsOfExperience: string;
  credentials: File | null;
}

const serviceOptions = [
  "Therapy",
  "Legal Aid",
  "Shelter",
  "Medical Services",
  "Counseling",
  "Financial Support",
  "Child Care",
  "Educational Support",
];

const clienteleOptions = [
  "Adults",
  "Minors",
  "Women",
  "Men",
  "LGBTQ+",
  "PWDs",
  "Survivors of Domestic Violence",
  "Survivors of Sexual Assault",
  "Human Trafficking Survivors",
];

const titleOptions = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."];

const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];

const clientcapacityOptions = [
  "5 clients per month",
  "10 clients per month",
  "20 clients per month",
  "50 clients per month",
  "100+ clients per month",
];

const hoursOfOperationOptions = [
  "Mon-Fri 9AM-5PM",
  "Mon-Sat 9AM-6PM",
  "24/7",
  "By Appointment Only",
];

const countryOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "Kenya",
  "Nigeria",
  "South Africa",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "South Sudan",
  "Ethiopia",
  "Somalia",
];

const educationOptions = [
  "PhD",
  "Master's Degree",
  "Bachelor's Degree",
  "Diploma",
  "Certificate",
  "Other",
];

const TOTAL_STEPS = 5;

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    profilePicture: null,
    title: "",
    firstName: "",
    lastName: "",
    organizationName: "",
    gender: "",
    idPassportNumber: "",
    country: "",
    serviceType: [],
    county: "",
    town: "",
    educationRank: "",
    clientele: [],
    clientcapacity: "",
    hoursOfOperation: "",
    yearsOfExperience: "",
    credentials: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [credentialsFileName, setCredentialsFileName] = useState<string>("");
  const [profilePreview, setProfilePreview] = useState<string>("");
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [clientcapacityDropdownOpen, setCLientcapacityDropdownOpen] =
    useState(false);
  const [clienteleDropdownOpen, setClienteleDropdownOpen] = useState(false);

  const handleCheckboxChange = (
    field: "serviceType" | "clientele",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleCredentialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, credentials: file }));
    setCredentialsFileName(file?.name || "");
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, profilePicture: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePreview("");
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      // Personal Details
      if (!formData.title) {
        newErrors.title = "Title is required";
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required";
      }
      if (!formData.gender) {
        newErrors.gender = "Gender is required";
      }
      if (!formData.idPassportNumber.trim()) {
        newErrors.idPassportNumber = "ID/Passport number is required";
      }
      if (!formData.educationRank) {
        newErrors.educationRank = "Education rank is required";
      }
    } else if (step === 2) {
      // Organization Details
      if (!formData.organizationName.trim()) {
        newErrors.organizationName = "Organization name is required";
      }
      if (!formData.yearsOfExperience.trim()) {
        newErrors.yearsOfExperience = "Years of experience is required";
      }
      if (!formData.clientcapacity.trim()) {
        newErrors.clientcapacity = "Clientcapacity is required";
      }
      if (!formData.hoursOfOperation.trim()) {
        newErrors.hoursOfOperation = "Hours of operation is required";
      }
    } else if (step === 3) {
      // Location Details
      if (!formData.country) {
        newErrors.country = "Country is required";
      }
      if (!formData.county.trim()) {
        newErrors.county = "County is required";
      }
      if (!formData.town.trim()) {
        newErrors.town = "Town is required";
      }
    } else if (step === 4) {
      // Services
      if (formData.serviceType.length === 0) {
        newErrors.serviceType = "Please select at least one service type";
      }
      if (formData.clientele.length === 0) {
        newErrors.clientele = "Please select at least one clientele category";
      }
    } else if (step === 5) {
      // Credentials
      if (!formData.credentials) {
        newErrors.credentials = "Credentials document is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < TOTAL_STEPS) {
        setCurrentStep(currentStep + 1);
        setErrors({});
      } else {
        onComplete();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const progressPercentage = (currentStep / TOTAL_STEPS) * 100;

  return (
    <div className="bg-white relative size-full min-h-screen py-[40px]  flex flex-col gap-[10px] h-[300px] items-center justify-center">
      {/* Background decorative element */}
      <div className="absolute box-border content-stretch flex flex-col gap-[10px] h-[300px] items-center justify-center right-[50px] top-[50px] rounded-[25px] w-[400px] opacity-20"></div>

      <div className="relative z-10 w-full max-w-[800px] px-[50px] mx-auto">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[24px] items-center not-italic relative shrink-0 w-full text-center mb-[40px]">
          <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[30px] text-black">
            Profile Setup
          </p>

          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex items-center justify-between mb-[12px]">
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#1e1e1e]">
                Step {currentStep} of {TOTAL_STEPS}
              </p>
              <p className="font-['Inter:Regular',sans-serif] font-normal text-[14px] text-[#9dc183]">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
            <div className="w-full h-[8px] bg-[#e0e0e0] rounded-full overflow-hidden border radius-px">
              <div
                className="h-full bg-[#9dc183] transition-all duration-300 ease-in-out rounded-full border radius-8px "
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between w-full max-w-[500px] rounded-full">
            {[1, 2, 3, 4, 5].map((step) => (
              <div
                key={step}
                className="flex flex-col items-center gap-[8px] rounded-full "
              >
                <div
                  className={`w-[40px] h-[40px] rounded-full flex items-center justify-center transition-all ${
                    step < currentStep
                      ? "bg-[#9dc183] text-white"
                      : step === currentStep
                      ? "bg-[#9dc183] text-white"
                      : "bg-[#e0e0e0] text-[#b0b0b0]"
                  }`}
                >
                  <span className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[14px] p-4 rounded-full">
                    {step}
                  </span>
                </div>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[10px] text-[#b0b0b0] text-center max-w-[60px]">
                  {step === 1 && "Personal"}
                  {step === 2 && "Organization"}
                  {step === 3 && "Location"}
                  {step === 4 && "Services"}
                  {step === 5 && "Credentials"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          className="w-full"
        >
          <div className="content-stretch flex flex-col gap-[40px] items-start w-full">
            {/* Step 1: Personal Details */}
            {currentStep === 1 && (
              <>
                {/* Profile Picture */}
                <div className="flex flex-col items-center gap-[20px] w-full">
                  <div className="relative">
                    <div className="w-[120px] h-[120px] rounded-full bg-[#f5f5f5] border-2  border-[#dadada] flex items-center justify-center overflow-hidden">
                      {profilePreview ? (
                        <img
                          src={profilePreview}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-[40px] h-[40px] text-[#b0b0b0]" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-[#9dc183] rounded-full p-[8px] cursor-pointer hover:bg-[#8bb172] transition-colors">
                      <input
                        type="file"
                        onChange={handleProfilePictureChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Upload className="w-[16px] h-[16px] text-white" />
                    </label>
                  </div>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-[#b0b0b0] text-center">
                    Upload Profile Picture (Optional)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
                  {/* Title */}
                  <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                    <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.title}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, title: value })
                      }
                    >
                      <SelectTrigger
                        className={`h-[42px] rounded-[10px] ${
                          errors.title ? "border-red-500" : "border-[#dadada]"
                        }`}
                      >
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        {titleOptions.map((title) => (
                          <SelectItem key={title} value={title}>
                            {title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.title && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* First Name */}
                  <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                    <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                      <div
                        aria-hidden="true"
                        className={`absolute border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-[#dadada]"
                        } border-solid inset-0 pointer-events-none rounded-[10px]`}
                      />
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="Enter first name"
                        className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                    <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                      <div
                        aria-hidden="true"
                        className={`absolute border ${
                          errors.lastName
                            ? "border-red-500"
                            : "border-[#dadada]"
                        } border-solid inset-0 pointer-events-none rounded-[10px]`}
                      />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        placeholder="Enter last name"
                        className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                    <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, gender: value })
                      }
                    >
                      <SelectTrigger
                        className={`h-[42px] rounded-[10px] ${
                          errors.gender ? "border-red-500" : "border-[#dadada]"
                        }`}
                      >
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {genderOptions.map((gender) => (
                          <SelectItem key={gender} value={gender}>
                            {gender}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  {/* ID/Passport Number */}
                  <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                    <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      National ID/Passport Number{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                      <div
                        aria-hidden="true"
                        className={`absolute border ${
                          errors.idPassportNumber
                            ? "border-red-500"
                            : "border-[#dadada]"
                        } border-solid inset-0 pointer-events-none rounded-[10px]`}
                      />
                      <input
                        type="text"
                        value={formData.idPassportNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            idPassportNumber: e.target.value,
                          })
                        }
                        placeholder="Enter ID/Passport number"
                        className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                      />
                    </div>
                    {errors.idPassportNumber && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                        {errors.idPassportNumber}
                      </p>
                    )}
                  </div>

                  {/* Education Rank */}
                  <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                    <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      Education Rank <span className="text-red-500">*</span>
                    </label>
                    <Select
                      value={formData.educationRank}
                      onValueChange={(value: any) =>
                        setFormData({ ...formData, educationRank: value })
                      }
                    >
                      <SelectTrigger
                        className={`h-[42px] rounded-[10px] ${
                          errors.educationRank
                            ? "border-red-500"
                            : "border-[#dadada]"
                        }`}
                      >
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationOptions.map((edu) => (
                          <SelectItem key={edu} value={edu}>
                            {edu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.educationRank && (
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                        {errors.educationRank}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Organization Details */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
                {/* Organization Name */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Organization Name <span className="text-red-500">*</span>
                  </label>
                  <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                    <div
                      aria-hidden="true"
                      className={`absolute border ${
                        errors.organizationName
                          ? "border-red-500"
                          : "border-[#dadada]"
                      } border-solid inset-0 pointer-events-none rounded-[10px]`}
                    />
                    <input
                      type="text"
                      value={formData.organizationName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          organizationName: e.target.value,
                        })
                      }
                      placeholder="Enter organization name"
                      className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                    />
                  </div>
                  {errors.organizationName && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.organizationName}
                    </p>
                  )}
                </div>

                {/* Years of Experience */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                    <div
                      aria-hidden="true"
                      className={`absolute border ${
                        errors.yearsOfExperience
                          ? "border-red-500"
                          : "border-[#dadada]"
                      } border-solid inset-0 pointer-events-none rounded-[10px]`}
                    />
                    <input
                      type="number"
                      value={formData.yearsOfExperience}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          yearsOfExperience: e.target.value,
                        })
                      }
                      placeholder="Enter years of experience"
                      className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                    />
                  </div>
                  {errors.yearsOfExperience && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.yearsOfExperience}
                    </p>
                  )}
                </div>

                {/* Capacity */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Clientcapcity <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.clientcapacity}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, clientcapacity: value })
                    }
                  >
                    <SelectTrigger
                      className={`h-[42px] rounded-[10px] ${
                        errors.clientcapacity
                          ? "border-red-500"
                          : "border-[#dadada]"
                      }`}
                    >
                      <SelectValue placeholder="e.g., 20 clients per month" />
                    </SelectTrigger>
                    <SelectContent>
                      {clientcapacityOptions.map((clientcapacity) => (
                        <SelectItem key={clientcapacity} value={clientcapacity}>
                          {clientcapacity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.clientcapacity && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.clientcapacity}
                    </p>
                  )}
                </div>

                {/* Hours of Operation */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Hours of Operation <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.hoursOfOperation}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, hoursOfOperation: value })
                    }
                  >
                    <SelectTrigger
                      className={`h-[42px] rounded-[10px] ${
                        errors.hoursOfOperation
                          ? "border-red-500"
                          : "border-[#dadada]"
                      }`}
                    >
                      <SelectValue placeholder="e.g., Mon-Fri 9AM-5PM" />
                    </SelectTrigger>
                    <SelectContent>
                      {hoursOfOperationOptions.map((hoursOfOperation) => (
                        <SelectItem
                          key={hoursOfOperationOptions}
                          value={hoursOfOperationOptions}
                        >
                          {hoursOfOperationOptions}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.hoursOfOperation && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.hoursOfOperation}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Location Details */}
            {currentStep === 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
                {/* Country */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.country}
                    onValueChange={(value: any) =>
                      setFormData({ ...formData, country: value })
                    }
                  >
                    <SelectTrigger
                      className={`h-[42px] rounded-[10px] ${
                        errors.country ? "border-red-500" : "border-[#dadada]"
                      }`}
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryOptions.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>

                {/* County */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    County <span className="text-red-500">*</span>
                  </label>
                  <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                    <div
                      aria-hidden="true"
                      className={`absolute border ${
                        errors.county ? "border-red-500" : "border-[#dadada]"
                      } border-solid inset-0 pointer-events-none rounded-[10px]`}
                    />
                    <input
                      type="text"
                      value={formData.county}
                      onChange={(e) =>
                        setFormData({ ...formData, county: e.target.value })
                      }
                      placeholder="Enter county"
                      className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                    />
                  </div>
                  {errors.county && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.county}
                    </p>
                  )}
                </div>

                {/* Town */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Town <span className="text-red-500">*</span>
                  </label>
                  <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                    <div
                      aria-hidden="true"
                      className={`absolute border ${
                        errors.town ? "border-red-500" : "border-[#dadada]"
                      } border-solid inset-0 pointer-events-none rounded-[10px]`}
                    />
                    <input
                      type="text"
                      value={formData.town}
                      onChange={(e) =>
                        setFormData({ ...formData, town: e.target.value })
                      }
                      placeholder="Enter town"
                      className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                    />
                  </div>
                  {errors.town && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.town}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Services */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-[24px] w-full">
                {/* Service Type - Dropdown */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Type of Services Offered{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <Popover
                    open={serviceDropdownOpen}
                    onOpenChange={setServiceDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <div className="min-h-[42px] relative rounded-[10px] shrink-0 w-full cursor-pointer">
                        <div
                          aria-hidden="true"
                          className={`absolute border ${
                            errors.serviceType
                              ? "border-red-500"
                              : "border-[#dadada]"
                          } border-solid inset-0 pointer-events-none rounded-[10px]`}
                        />
                        <div className="box-border min-h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent rounded-[10px] flex items-center justify-between gap-[10px]">
                          <div className="flex flex-wrap gap-[6px] flex-1">
                            {formData.serviceType.length === 0 ? (
                              <span className="text-[#b0b0b0]">
                                Select services
                              </span>
                            ) : (
                              formData.serviceType.map((service) => (
                                <span
                                  key={service}
                                  className="bg-[#9dc183] text-white px-[10px] py-[4px] rounded-[6px] flex items-center gap-[6px] text-[12px]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange(
                                      "serviceType",
                                      service
                                    );
                                  }}
                                >
                                  {service}
                                  <X className="w-[14px] h-[14px] cursor-pointer" />
                                </span>
                              ))
                            )}
                          </div>
                          <ChevronDown className="w-[20px] h-[20px] text-[#b0b0b0] shrink-0" />
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <div className="max-h-[300px] overflow-y-auto p-[16px]">
                        <div className="grid grid-cols-1 gap-[12px]">
                          {serviceOptions.map((service) => (
                            <label
                              key={service}
                              className="flex items-center gap-[8px] cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.serviceType.includes(service)}
                                onChange={() =>
                                  handleCheckboxChange("serviceType", service)
                                }
                                className="w-[18px] h-[18px] accent-[#9dc183] cursor-pointer"
                              />
                              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#1e1e1e] text-[14px]">
                                {service}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {errors.serviceType && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.serviceType}
                    </p>
                  )}
                </div>

                {/* Clientele Served - Dropdown */}
                <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                  <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    Clientele Served <span className="text-red-500">*</span>
                  </label>
                  <Popover
                    open={clienteleDropdownOpen}
                    onOpenChange={setClienteleDropdownOpen}
                  >
                    <PopoverTrigger asChild>
                      <div className="min-h-[42px] relative rounded-[10px] shrink-0 w-full cursor-pointer">
                        <div
                          aria-hidden="true"
                          className={`absolute border ${
                            errors.clientele
                              ? "border-red-500"
                              : "border-[#dadada]"
                          } border-solid inset-0 pointer-events-none rounded-[10px]`}
                        />
                        <div className="box-border min-h-[42px] px-[20px] py-[8px] w-full font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent rounded-[10px] flex items-center justify-between gap-[10px]">
                          <div className="flex flex-wrap gap-[6px] flex-1">
                            {formData.clientele.length === 0 ? (
                              <span className="text-[#b0b0b0]">
                                Select clientele
                              </span>
                            ) : (
                              formData.clientele.map((clientele) => (
                                <span
                                  key={clientele}
                                  className="bg-[#9dc183] text-white px-[10px] py-[4px] rounded-[6px] flex items-center gap-[6px] text-[12px]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange(
                                      "clientele",
                                      clientele
                                    );
                                  }}
                                >
                                  {clientele}
                                  <X className="w-[14px] h-[14px] cursor-pointer" />
                                </span>
                              ))
                            )}
                          </div>
                          <ChevronDown className="w-[20px] h-[20px] text-[#b0b0b0] shrink-0" />
                        </div>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0" align="start">
                      <div className="max-h-[300px] overflow-y-auto p-[16px]">
                        <div className="grid grid-cols-1 gap-[12px]">
                          {clienteleOptions.map((clientele) => (
                            <label
                              key={clientele}
                              className="flex items-center gap-[8px] cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                checked={formData.clientele.includes(clientele)}
                                onChange={() =>
                                  handleCheckboxChange("clientele", clientele)
                                }
                                className="w-[18px] h-[18px] accent-[#9dc183] cursor-pointer"
                              />
                              <span className="font-['Inter:Regular',sans-serif] font-normal text-[#1e1e1e] text-[14px]">
                                {clientele}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                  {errors.clientele && (
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                      {errors.clientele}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Credentials */}
            {currentStep === 5 && (
              <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
                <label className="font-['Inter:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                  Credentials <span className="text-red-500">*</span>
                </label>
                <div className="relative rounded-[10px] w-full">
                  <div
                    aria-hidden="true"
                    className={`absolute border ${
                      errors.credentials ? "border-red-500" : "border-[#dadada]"
                    } border-dashed inset-0 pointer-events-none rounded-[10px]`}
                  />
                  <label className="box-border flex flex-col gap-[8px] items-center justify-center px-[20px] py-[40px] w-full cursor-pointer">
                    <input
                      type="file"
                      onChange={handleCredentialsChange}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <Upload className="w-[40px] h-[40px] text-[#9dc183]" />
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#1e1e1e] text-[14px] text-center">
                      {credentialsFileName ||
                        "Click to upload or drag and drop"}
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#b0b0b0] text-[12px] text-center">
                      PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#b0b0b0] text-[12px] text-center mt-[12px]">
                      Upload your professional credentials, certifications, or
                      licenses
                    </p>
                  </label>
                </div>
                {errors.credentials && (
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[12px] text-red-500">
                    {errors.credentials}
                  </p>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between w-full gap-[16px] mt-[20px]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-white border border-[#dadada] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[40px] py-[6px] relative rounded-[25px] shrink-0 cursor-pointer hover:bg-[#f5f5f5] transition-colors"
                >
                  <ChevronLeft className="w-[20px] h-[20px] text-[#1e1e1e]" />
                  <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-[#1e1e1e] whitespace-pre">
                    Back
                  </p>
                </button>
              ) : (
                <div></div>
              )}

              <button
                type="submit"
                className="bg-[#9dc183] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[60px] py-[6px] relative rounded-[25px] shrink-0 border-none cursor-pointer hover:bg-[#8bb172] transition-colors"
              >
                <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white whitespace-pre">
                  {currentStep === TOTAL_STEPS ? "Complete Profile" : "Next"}
                </p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
