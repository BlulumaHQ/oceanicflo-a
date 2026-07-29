export type Lang = "en" | "zh";

export const SITE = {
  domain: "https://www.oceanicflo.com",
  email: "cary@oceanicflo.com",
  telDisplay: "604-818-2088",
  telLink: "tel:+16048182088",
  address: {
    line1: "203-2680 Shell Road",
    line2: "Richmond, BC V6X 4C9",
    line3: "Canada",
  },
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Oceanicflo Construction, 203-2680 Shell Road, Richmond, BC V6X 4C9"),
};

export const IMAGES = {
  hero: "/images/oceanicflo/home-hero-construction.webp",
  og: "/images/oceanicflo/oceanicflo-og.webp",
  gallery: [
    "/images/oceanicflo/project-selected-01.webp",
    "/images/oceanicflo/project-selected-02.webp",
    "/images/oceanicflo/project-selected-03.webp",
    "/images/oceanicflo/project-selected-04.webp",
    "/images/oceanicflo/project-selected-05.webp",
    "/images/oceanicflo/project-selected-06.webp",
  ],
} as const;

export const NAV = {
  en: [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ],
  zh: [
    { to: "/zh", label: "首頁" },
    { to: "/zh/services", label: "服務" },
    { to: "/zh/projects", label: "專案" },
    { to: "/zh/about", label: "關於我們" },
    { to: "/zh/contact", label: "聯絡我們" },
  ],
} as const;

export const CTA = {
  en: {
    discuss: "Discuss Your Project",
    viewWork: "View Selected Work",
    exploreServices: "Explore Our Services",
    viewAll: "View All Selected Work",
    learnAbout: "Learn About Oceanicflo",
    callUs: "Call 604-818-2088",
    langOther: "繁中",
    langOtherHref: "/zh",
  },
  zh: {
    discuss: "洽談您的專案",
    viewWork: "瀏覽精選專案",
    exploreServices: "了解我們的服務",
    viewAll: "查看所有精選專案",
    learnAbout: "認識 Oceanicflo",
    callUs: "致電 604-818-2088",
    langOther: "EN",
    langOtherHref: "/",
  },
} as const;

export const SERVICES = {
  en: [
    {
      num: "01",
      title: "Integrated Project Delivery (IPD)",
      short:
        "Coordination between owners, consultants, contractors, and operators across the principal phases of design, fabrication, and construction.",
      body: [
        "Integrated Project Delivery supports the involvement of owners, consultants, contractors, and operators through the principal phases of design, fabrication, and construction.",
        "The approach is intended to improve coordination, increase productivity, reduce waste, limit avoidable schedule overruns, improve final product quality, and reduce conflicts between project participants during construction.",
      ],
    },
    {
      num: "02",
      title: "Design + Build",
      short:
        "A unified delivery structure that brings design and construction responsibilities into a more direct project process.",
      body: [
        "Design + Build delivers design and construction responsibilities through a single coordinated project structure.",
        "Depending on the project arrangement, the structure may be architect-led or contractor-led. The objective is to create a more direct connection between design decisions and construction execution.",
      ],
    },
    {
      num: "03",
      title: "General Contracting",
      short:
        "Coordination of labour, materials, equipment, services, subcontractors, and the quality of work performed during construction.",
      body: [
        "General contracting includes the coordination of materials, labour, equipment, services, workers, and subcontractors required for construction.",
        "Oceanicflo also oversees the quality of work performed by workers and subcontractors during the construction process.",
      ],
    },
    {
      num: "04",
      title: "Construction Management",
      short:
        "Organized construction planning, coordination, communication, and oversight throughout project delivery.",
      body: [
        "Oceanicflo provides construction management as part of its broader project-delivery capabilities.",
        "The service supports organized planning, communication, coordination, oversight, and the practical execution of construction work.",
      ],
    },
    {
      num: "05",
      title: "Project Management",
      short:
        "Structured support for project requirements, decision-making, coordination, and execution from planning through completion.",
      body: [
        "Project management supports the organization of project requirements, participants, communication, decisions, and execution.",
        "The objective is to maintain clearer coordination as work progresses from planning through completion.",
      ],
    },
  ],
  zh: [
    {
      num: "01",
      title: "整合式專案交付（IPD）",
      short:
        "協調業主、顧問、承包商及營運人員，使各方在設計、製作及施工主要階段保持參與及溝通。",
      body: [
        "整合式專案交付讓業主、顧問、承包商及營運人員在設計、製作及施工主要階段保持參與。",
        "此方式的目標是改善協調、提高生產力、減少浪費、降低可避免的工期超支、提升最終品質，並減少施工期間各參與方之間的衝突。",
      ],
    },
    {
      num: "02",
      title: "設計與施工整合",
      short: "在較為直接的專案架構下，整合設計及施工責任，使專案由概念推進至完成。",
      body: [
        "設計與施工整合透過單一且協調一致的專案架構，交付設計及施工工作。",
        "依照專案安排，此架構可由建築師或承包商主導，目的在於讓設計決策與施工執行之間保持更直接的連結。",
      ],
    },
    {
      num: "03",
      title: "總承包",
      short: "統籌施工所需的人工、材料、設備、服務及分包商，並監督施工期間的工作品質。",
      body: [
        "總承包包括統籌施工所需要的材料、人工、設備、服務、工作人員及分包商。",
        "Oceanicflo 同時監督施工過程中工作人員及分包商所完成的工作品質。",
      ],
    },
    {
      num: "04",
      title: "施工管理",
      short: "在專案交付過程中，提供有組織的施工規劃、協調、溝通及監督。",
      body: [
        "Oceanicflo 將施工管理納入整體專案交付能力之中。",
        "此服務支援有組織的規劃、溝通、協調、監督及施工執行。",
      ],
    },
    {
      num: "05",
      title: "專案管理",
      short: "從規劃至完成，協助整理專案需求、決策、協調及執行工作。",
      body: [
        "專案管理協助整理專案需求、參與人員、溝通、決策及執行工作。",
        "目標是在專案由規劃推進至完成的過程中，維持更清晰的協調。",
      ],
    },
  ],
} as const;

export const PROJECT_TYPES = {
  en: [
    "Specialized Industrial",
    "Commercial",
    "Residential",
    "Industrial",
    "Institutional",
    "Selected Other Work",
  ],
  zh: ["專業工業設施", "商業空間", "住宅", "工業設施", "機構設施", "其他精選專案"],
} as const;

export const METRICS = {
  en: [
    { value: "2009", label: "Year Established" },
    { value: "47", label: "Completed and Current Projects" },
    { value: "23 M", label: "Construction Cost" },
    { value: "99 M", label: "Construction Consultation" },
  ],
  zh: [
    { value: "2009", label: "創立年份" },
    { value: "47", label: "已完成及進行中的專案" },
    { value: "23 M", label: "工程造價" },
    { value: "99 M", label: "工程顧問" },
  ],
  note: {
    en: "Figures presented from Oceanicflo's existing company information.",
    zh: "數據取自 Oceanicflo 現有公司資料。",
  },
} as const;

export const STAGES = {
  en: [
    { num: "01", title: "Understand the Project", body: "Establish the objectives, requirements, participants, and practical constraints." },
    { num: "02", title: "Coordinate the Team", body: "Bring the relevant owners, consultants, contractors, and operators into a clearer working structure." },
    { num: "03", title: "Plan the Work", body: "Align design information, construction requirements, communication, and execution planning." },
    { num: "04", title: "Deliver Construction", body: "Coordinate labour, materials, equipment, subcontractors, and on-site quality." },
    { num: "05", title: "Complete and Handover", body: "Bring the work to an organized conclusion with clear communication and closeout." },
  ],
  zh: [
    { num: "01", title: "了解專案", body: "確認專案目標、需求、參與人員及實際限制。" },
    { num: "02", title: "協調團隊", body: "讓業主、顧問、承包商及營運人員進入更清晰的合作架構。" },
    { num: "03", title: "規劃工作", body: "整合設計資料、施工需求、溝通及執行規劃。" },
    { num: "04", title: "執行施工", body: "統籌人工、材料、設備、分包商及現場工作品質。" },
    { num: "05", title: "完成及交付", body: "透過清楚的溝通及收尾程序，有組織地完成專案。" },
  ],
} as const;

export const FORM_OPTIONS = {
  en: {
    service: [
      "Integrated Project Delivery",
      "Design + Build",
      "General Contracting",
      "Construction Management",
      "Project Management",
      "Not Yet Determined",
    ],
    type: ["Specialized Industrial", "Commercial", "Residential", "Industrial", "Institutional", "Other"],
    timeline: [
      "As Soon as Possible",
      "Within 3 Months",
      "Within 6 Months",
      "Within 12 Months",
      "More Than 12 Months",
      "Not Yet Determined",
    ],
  },
  zh: {
    service: ["整合式專案交付", "設計與施工整合", "總承包", "施工管理", "專案管理", "尚未確定"],
    type: ["專業工業設施", "商業空間", "住宅", "工業設施", "機構設施", "其他"],
    timeline: ["儘快開始", "三個月內", "六個月內", "十二個月內", "超過十二個月", "尚未確定"],
  },
} as const;

export const FORM_LABELS = {
  en: {
    heading: "Project Enquiry",
    support: "Provide the information currently available. Oceanicflo can follow up regarding the project requirements and next steps.",
    first: "First Name",
    last: "Last Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    service: "Required Service",
    type: "Project Type",
    location: "Project Location",
    timeline: "Estimated Timeline",
    subject: "Subject",
    message: "Message",
    submit: "Send Enquiry",
    sending: "Sending…",
    optional: "Optional",
    privacy: "The information submitted through this form will be used only to respond to your enquiry.",
    success: "Thanks for submitting! Have a great day!",
    error: "The form is temporarily unavailable. Please email cary@oceanicflo.com or call 604-818-2088.",
    select: "Select…",
  },
  zh: {
    heading: "專案查詢",
    support: "請提供目前已有的資料，Oceanicflo 將就專案需求及下一步與您聯絡。",
    first: "名字",
    last: "姓氏",
    email: "電郵",
    phone: "電話",
    company: "公司",
    service: "所需服務",
    type: "專案類型",
    location: "專案位置",
    timeline: "預計時程",
    subject: "主旨",
    message: "訊息",
    submit: "送出查詢",
    sending: "傳送中…",
    optional: "選填",
    privacy: "透過本表格提交的資料，只會用於回覆您的查詢。",
    success: "感謝您的來信，我們會儘快與您聯絡。",
    error: "表格目前暫時無法送出，請寄送電郵至 cary@oceanicflo.com，或致電 604-818-2088。",
    select: "請選擇…",
  },
} as const;

// Route path pairings — used for language switch and hreflang alternates.
export const ALT_ROUTES: Record<string, { en: string; zh: string }> = {
  home: { en: "/", zh: "/zh" },
  services: { en: "/services", zh: "/zh/services" },
  projects: { en: "/projects", zh: "/zh/projects" },
  about: { en: "/about", zh: "/zh/about" },
  contact: { en: "/contact", zh: "/zh/contact" },
};