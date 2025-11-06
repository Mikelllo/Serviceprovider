import { useState } from "react";
import imgFrame12 from "figma:asset/2e95e94bca83863203e6dd51327d99b7dfa9f571.png";
import { Upload, ChevronDown, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

interface ProfileSetupProps {
  onComplete: () => void;
}

interface FormData {
  organizationName: string;
  contactPerson: string;
  serviceType: string[];
  county: string;
  town: string;
  clientele: string[];
  capacity: string;
  hoursOfOperation: string;
  verificationDocument: File | null;
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
  "Survivors of Domestic Violence",
  "Survivors of Sexual Assault",
  "Human Trafficking Survivors",
];

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const [formData, setFormData] = useState<FormData>({
    organizationName: "",
    contactPerson: "",
    serviceType: [],
    county: "",
    town: "",
    clientele: [],
    capacity: "",
    hoursOfOperation: "",
    verificationDocument: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [fileName, setFileName] = useState<string>("");
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, verificationDocument: file }));
    setFileName(file?.name || "");
  };

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.organizationName.trim()) {
      newErrors.organizationName = "Organization name is required";
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "Contact person is required";
    }
    if (formData.serviceType.length === 0) {
      newErrors.serviceType = "Please select at least one service type";
    }
    if (!formData.county.trim()) {
      newErrors.county = "County is required";
    }
    if (!formData.town.trim()) {
      newErrors.town = "Town is required";
    }
    if (formData.clientele.length === 0) {
      newErrors.clientele = "Please select at least one clientele category";
    }
    if (!formData.capacity.trim()) {
      newErrors.capacity = "Capacity is required";
    }
    if (!formData.hoursOfOperation.trim()) {
      newErrors.hoursOfOperation = "Hours of operation is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete();
    }
  };

  return (
    <div className="bg-white relative size-full min-h-screen flex justify-center py-[80px]">
      {/* Background decorative element */}
      <div className="absolute box-border content-stretch flex flex-col gap-[10px] h-[300px] items-center justify-center right-[50px] top-[50px] rounded-[25px] w-[400px] opacity-20"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-[800px] px-[50px] mx-auto"
      >
        <div className="content-stretch flex flex-col gap-[33px] flex items-center justify-center w-full">
          {/* Header */}
          <div className="content-stretch flex flex-col gap-[18px] items-center not-italic relative shrink-0 w-full text-center">
            <p className="font-['Poppins:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[30px] text-black">
              Profile Setup
            </p>
            <p className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] relative shrink-0 text-[#b0b0b0] text-[14px]">
              Please complete your profile to help us connect GBV survivors with
              the right services
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] w-full">
            {/* Organization Name */}
            <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
              <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
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
                  className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                />
              </div>
              {errors.organizationName && (
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                  {errors.organizationName}
                </p>
              )}
            </div>

            {/* Contact Person */}
            <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
              <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                <div
                  aria-hidden="true"
                  className={`absolute border ${
                    errors.contactPerson ? "border-red-500" : "border-[#dadada]"
                  } border-solid inset-0 pointer-events-none rounded-[10px]`}
                />
                <input
                  type="text"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  placeholder="Enter contact person name"
                  className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                />
              </div>
              {errors.contactPerson && (
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                  {errors.contactPerson}
                </p>
              )}
            </div>

            {/* County */}
            <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
              <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
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
                  className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                />
              </div>
              {errors.county && (
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                  {errors.county}
                </p>
              )}
            </div>

            {/* Town */}
            <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
              <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
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
                  className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                />
              </div>
              {errors.town && (
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                  {errors.town}
                </p>
              )}
            </div>

            {/* Capacity */}
            <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
              <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                Capacity <span className="text-red-500">*</span>
              </label>
              <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                <div
                  aria-hidden="true"
                  className={`absolute border ${
                    errors.capacity ? "border-red-500" : "border-[#dadada]"
                  } border-solid inset-0 pointer-events-none rounded-[10px]`}
                />
                <input
                  type="text"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  placeholder="e.g., 20 clients per month"
                  className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                />
              </div>
              {errors.capacity && (
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                  {errors.capacity}
                </p>
              )}
            </div>

            {/* Hours of Operation */}
            <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
              <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                Hours of Operation <span className="text-red-500">*</span>
              </label>
              <div className="h-[42px] relative rounded-[10px] shrink-0 w-full">
                <div
                  aria-hidden="true"
                  className={`absolute border ${
                    errors.hoursOfOperation
                      ? "border-red-500"
                      : "border-[#dadada]"
                  } border-solid inset-0 pointer-events-none rounded-[10px]`}
                />
                <input
                  type="text"
                  value={formData.hoursOfOperation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hoursOfOperation: e.target.value,
                    })
                  }
                  placeholder="e.g., Mon-Fri 9AM-5PM"
                  className="box-border h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent border-none outline-none placeholder:text-[#b0b0b0] rounded-[10px]"
                />
              </div>
              {errors.hoursOfOperation && (
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                  {errors.hoursOfOperation}
                </p>
              )}
            </div>
          </div>

          {/* Service Type - Dropdown */}
          <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
            <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
              Type of Services Offered <span className="text-red-500">*</span>
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
                      errors.serviceType ? "border-red-500" : "border-[#dadada]"
                    } border-solid inset-0 pointer-events-none rounded-[10px]`}
                  />
                  <div className="box-border min-h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent rounded-[10px] flex items-center justify-between gap-[10px]">
                    <div className="flex flex-wrap gap-[6px] flex-1">
                      {formData.serviceType.length === 0 ? (
                        <span className="text-[#b0b0b0]">Select services</span>
                      ) : (
                        formData.serviceType.map((service) => (
                          <span
                            key={service}
                            className="bg-[#9dc183] text-white px-[10px] py-[4px] rounded-[6px] flex items-center gap-[6px] text-[12px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange("serviceType", service);
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
                        <span className="font-['Poppins:Regular',sans-serif] font-normal text-[#1e1e1e] text-[14px]">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {errors.serviceType && (
              <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                {errors.serviceType}
              </p>
            )}
          </div>

          {/* Clientele Served - Dropdown */}
          <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
            <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
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
                      errors.clientele ? "border-red-500" : "border-[#dadada]"
                    } border-solid inset-0 pointer-events-none rounded-[10px]`}
                  />
                  <div className="box-border min-h-[42px] px-[20px] py-[8px] w-full font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic text-[#1e1e1e] text-[14px] bg-transparent rounded-[10px] flex items-center justify-between gap-[10px]">
                    <div className="flex flex-wrap gap-[6px] flex-1">
                      {formData.clientele.length === 0 ? (
                        <span className="text-[#b0b0b0]">Select clientele</span>
                      ) : (
                        formData.clientele.map((clientele) => (
                          <span
                            key={clientele}
                            className="bg-[#9dc183] text-white px-[10px] py-[4px] rounded-[6px] flex items-center gap-[6px] text-[12px]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCheckboxChange("clientele", clientele);
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
                        <span className="font-['Poppins:Regular',sans-serif] font-normal text-[#1e1e1e] text-[14px]">
                          {clientele}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {errors.clientele && (
              <p className="font-['Poppins:Regular',sans-serif] font-normal text-[12px] text-red-500">
                {errors.clientele}
              </p>
            )}
          </div>

          {/* Verification Documents */}
          <div className="content-stretch flex flex-col gap-[11px] items-start relative shrink-0 w-full">
            <label className="font-['Poppins:Regular',sans-serif] font-normal leading-[25px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
              Verification Documents (Optional)
            </label>
            <div className="relative rounded-[10px] w-full">
              <div
                aria-hidden="true"
                className="absolute border border-[#dadada] border-dashed inset-0 pointer-events-none rounded-[10px]"
              />
              <label className="box-border flex flex-col gap-[8px] items-center justify-center px-[20px] py-[20px] w-full cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="hidden"
                />
                <Upload className="w-[24px] h-[24px] text-[#9dc183]" />
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[#1e1e1e] text-[14px] text-center">
                  {fileName || "Click to upload or drag and drop"}
                </p>
                <p className="font-['Poppins:Regular',sans-serif] font-normal text-[#b0b0b0] text-[12px] text-center">
                  PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                </p>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#9dc183] box-border content-stretch flex gap-[10px] h-[48px] items-center justify-center px-[120px] py-[6px] relative rounded-[25px] shrink-0 w-full border-none cursor-pointer"
          >
            <p className="font-['Poppins:Semi_Bold',sans-serif] font-semibold leading-[30px] not-italic relative shrink-0 text-[18px] text-center text-nowrap text-white whitespace-pre">
              Complete Profile
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
