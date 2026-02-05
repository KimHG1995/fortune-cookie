import type { Locale } from "@/models/types/app/locale";

type LocaleMessages = {
  readonly [key in Locale]: {
    readonly header: {
      readonly brand: string;
      readonly tagline: string;
      readonly nav: {
        readonly about: string;
        readonly insight: string;
        readonly privacy: string;
        readonly contact: string;
      };
      readonly localeToggle: {
        readonly korean: string;
        readonly english: string;
      };
    };
    readonly footer: {
      readonly brand: string;
      readonly description: string;
      readonly statement: string;
      readonly nav: {
        readonly about: string;
        readonly privacy: string;
        readonly contact: string;
      };
    };
    readonly home: {
      readonly eyebrow: string;
      readonly titleLine1: string;
      readonly titleLine2: string;
      readonly description: string;
      readonly categoryLabel: string;
      readonly toneLabel: string;
      readonly buttonLabel: string;
      readonly loading: string;
    };
    readonly fortune: {
      readonly error: string;
    };
    readonly card: {
      readonly eyebrow: string;
      readonly actionLabel: string;
      readonly keywordLabel: string;
      readonly colorLabel: string;
      readonly numberLabel: string;
      readonly timeLabel: string;
      readonly empty: string;
      readonly defaultKeyword: string;
    };
    readonly about: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly principles: readonly {
        readonly title: string;
        readonly description: string;
      }[];
      readonly usageTitle: string;
      readonly usageItems: readonly string[];
    };
    readonly insight: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly items: readonly {
        readonly title: string;
        readonly description: string;
      }[];
      readonly checklistTitle: string;
      readonly checklistItems: readonly string[];
    };
    readonly contact: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly fields: {
        readonly name: string;
        readonly email: string;
        readonly topic: string;
        readonly message: string;
      };
      readonly placeholders: {
        readonly name: string;
        readonly email: string;
        readonly topic: string;
        readonly message: string;
      };
      readonly submit: string;
      readonly submitting: string;
      readonly successTitle: string;
      readonly submittedAt: string;
      readonly validation: {
        readonly nameRequired: string;
        readonly nameMin: string;
        readonly nameMax: string;
        readonly emailRequired: string;
        readonly emailInvalid: string;
        readonly topicRequired: string;
        readonly topicMin: string;
        readonly topicMax: string;
        readonly messageRequired: string;
        readonly messageMin: string;
        readonly messageMax: string;
      };
    };
    readonly privacy: {
      readonly eyebrow: string;
      readonly title: string;
      readonly description: string;
      readonly sections: readonly {
        readonly title: string;
        readonly items: readonly string[];
      }[];
      readonly closing: string;
    };
    readonly emojiAlt: {
      readonly intactPrefix: string;
      readonly crackedPrefix: string;
    };
  };
};

const localeMessages: LocaleMessages = {
  ko: {
    header: {
      brand: "포춘 브리프",
      tagline: "직무를 정리하고 오늘의 행동을 선명하게 만드는 포춘쿠키 실험실",
      nav: {
        about: "소개",
        insight: "인사이트",
        privacy: "개인정보 처리방침",
        contact: "문의",
      },
      localeToggle: {
        korean: "한국어",
        english: "English",
      },
    },
    footer: {
      brand: "포춘 브리프",
      description: "무료 LLM 기반의 포춘쿠키 서비스",
      statement: "광고 수익보다 경험을 우선합니다.",
      nav: {
        about: "소개",
        privacy: "개인정보 처리방침",
        contact: "문의",
      },
    },
    home: {
      eyebrow: "일과 운세의 교차점",
      titleLine1: "포춘쿠키를 열고,",
      titleLine2: "오늘의 일을 정돈하세요.",
      description:
        "무료 LLM으로 오늘의 업무 흐름을 요약하고, 바로 실행할 행동을 한 줄로 제안합니다. 쿠키를 여는 순간, 오늘의 가이드를 확인하세요.",
      categoryLabel: "직무 분야 선택",
      toneLabel: "톤 선택",
      buttonLabel: "포춘쿠키 열기",
      loading: "포춘을 준비 중입니다...",
    },
    fortune: {
      error: "요청에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    },
    card: {
      eyebrow: "오늘의 포춘 리포트",
      actionLabel: "오늘의 실행 한 줄",
      keywordLabel: "행운 키워드",
      colorLabel: "행운 색",
      numberLabel: "행운 숫자",
      timeLabel: "행운 시간",
      empty: "쿠키를 열면 오늘의 포춘이 표시됩니다.",
      defaultKeyword: "행운",
    },
    about: {
      eyebrow: "서비스 소개",
      title: "포춘 브리프란?",
      description:
        "포춘 브리프는 직무를 나누고 실행을 정돈하는 포춘쿠키 서비스입니다. 무료 LLM 기반으로 오늘의 흐름을 요약하고, 한 문장 이상의 실질적인 행동 제안을 제공합니다.",
      principles: [
        {
          title: "빈 문장 반복 금지",
          description:
            "광고를 위해 의미 없는 문장을 반복하지 않습니다. 하루의 업무를 재정렬하는 데 도움이 되는 밀도 있는 문장을 제공합니다.",
        },
        {
          title: "행동으로 이어지는 포춘",
          description:
            "포춘은 기분을 맞추는 말이 아니라, 오늘의 행동을 정리하는 도구입니다. 실행으로 연결되는 문장만 남깁니다.",
        },
        {
          title: "투명한 데이터",
          description:
            "개인정보는 최소한으로만 수집하고, 서비스 제공 목적 외에는 사용하지 않습니다.",
        },
      ],
      usageTitle: "어떻게 활용하면 좋을까요?",
      usageItems: [
        "하루를 시작하기 전 포춘을 확인하고 우선순위를 정하세요.",
        "팀 회의 전에 요약 문장을 공유해 대화의 방향을 빠르게 맞추세요.",
        "퇴근 전에 행동 문장을 체크리스트로 삼아 마감 감각을 유지하세요.",
      ],
    },
    insight: {
      eyebrow: "오늘의 인사이트",
      title: "일의 방향을 정리하는 인사이트",
      description:
        "포춘 브리프는 단순한 재미를 위한 운세가 아닙니다. 매일의 작업을 조정하고 실행의 질을 높이는 도구가 되길 바랍니다.",
      items: [
        {
          title: "직무를 더 작은 행동으로 쪼개기",
          description:
            "일을 직무가 아니라 행동 단위로 쪼개면 다음 행동이 더 선명해집니다. 오늘은 가장 작은 단위 하나만 고르는 것부터 시작하세요.",
        },
        {
          title: "운세를 검증 가능한 약속으로",
          description:
            "포춘은 운이 아니라 약속이어야 합니다. 행동 문장에 시간과 조건을 붙이면, 실제 성과로 이어질 확률이 커집니다.",
        },
        {
          title: "감정과 실행의 균형",
          description:
            "감정은 방향을, 실행은 속도를 만듭니다. 둘 중 하나가 과하면 흔들립니다. 오늘은 속도를 살짝 낮추는 선택이 유리합니다.",
        },
      ],
      checklistTitle: "오늘의 체크리스트",
      checklistItems: [
        "1) 오늘 끝낼 수 있는 가장 작은 행동을 적어두었습니다.",
        "2) 그 행동을 실행할 시간을 정했습니다.",
        "3) 마감 후 스스로 피드백을 남겼습니다.",
      ],
    },
    contact: {
      eyebrow: "문의",
      title: "문의 내용을 남겨 주세요.",
      description:
        "기능 제안, 제휴, 오류 제보 모두 환영합니다. 메시지는 팀 내부에서만 확인하며 외부로 공유하지 않습니다.",
      fields: {
        name: "이름",
        email: "이메일",
        topic: "문의 주제",
        message: "메시지",
      },
      placeholders: {
        name: "홍길동",
        email: "hello@fortune.com",
        topic: "제휴, 기능 제안, 오류 제보 등",
        message: "상황과 요청을 구체적으로 적어 주세요.",
      },
      submit: "문의 전송하기",
      submitting: "전송 중...",
      successTitle: "문의가 접수되었습니다. 가능한 빠르게 답변드리겠습니다.",
      submittedAt: "접수 시각",
      validation: {
        nameRequired: "이름을 입력해 주세요.",
        nameMin: "이름은 2글자 이상이어야 합니다.",
        nameMax: "이름은 20글자 이하이어야 합니다.",
        emailRequired: "이메일을 입력해 주세요.",
        emailInvalid: "이메일 형식이 올바르지 않습니다.",
        topicRequired: "문의 주제를 선택해 주세요.",
        topicMin: "문의 주제는 2글자 이상이어야 합니다.",
        topicMax: "문의 주제는 30글자 이하이어야 합니다.",
        messageRequired: "메시지를 입력해 주세요.",
        messageMin: "메시지는 20글자 이상이어야 합니다.",
        messageMax: "메시지는 500글자 이하이어야 합니다.",
      },
    },
    privacy: {
      eyebrow: "개인정보 처리방침",
      title: "우리는 정보를 절제합니다.",
      description:
        "포춘 브리프는 서비스 운영에 꼭 필요한 범위 내에서만 정보를 수집하며, 목적 외 사용을 하지 않습니다.",
      sections: [
        {
          title: "수집하는 정보",
          items: [
            "문의 페이지에서 입력하는 이름, 이메일, 메시지",
            "서비스 안정성을 위한 기본적인 접속 로그",
          ],
        },
        {
          title: "이용 목적",
          items: [
            "문의 응대 및 서비스 개선",
            "오류 분석과 품질 향상",
            "부정 사용 방지",
          ],
        },
        {
          title: "분석 도구",
          items: [
            "서비스 개선을 위해 Microsoft Clarity 분석 도구를 사용합니다.",
            "사용자 입력값 등 민감 정보는 기본적으로 마스킹되어 기록됩니다.",
            "분석 데이터는 사용자 경험 개선과 오류 파악 목적으로만 사용합니다.",
          ],
        },
        {
          title: "보관 기간",
          items: [
            "문의 응대 완료 후 3개월 이내 파기",
            "법령에 따른 보관 의무가 있는 경우 해당 기간 보관",
          ],
        },
        {
          title: "이용자 권리",
          items: [
            "개인정보 열람, 정정, 삭제 요청",
            "처리 정지 요청",
          ],
        },
      ],
      closing:
        "개인정보 보호와 관련한 문의는 문의 페이지를 통해 접수해 주세요. 최대한 빠르게 응답하겠습니다.",
    },
    emojiAlt: {
      intactPrefix: "포춘쿠키 캐릭터",
      crackedPrefix: "깨진 포춘쿠키",
    },
  },
  en: {
    header: {
      brand: "Fortune Brief",
      tagline: "A fortune-cookie studio that clarifies today's work.",
      nav: {
        about: "About",
        insight: "Insights",
        privacy: "Privacy",
        contact: "Contact",
      },
      localeToggle: {
        korean: "한국어",
        english: "English",
      },
    },
    footer: {
      brand: "Fortune Brief",
      description: "A free LLM-based fortune cookie service.",
      statement: "Experience comes before ad revenue.",
      nav: {
        about: "About",
        privacy: "Privacy",
        contact: "Contact",
      },
    },
    home: {
      eyebrow: "Work meets fortune",
      titleLine1: "Open the fortune cookie,",
      titleLine2: "clarify today's work.",
      description:
        "We summarize today's workflow with a free LLM and suggest one actionable step. Open the cookie and get your guide for the day.",
      categoryLabel: "Role",
      toneLabel: "Tone",
      buttonLabel: "Open the cookie",
      loading: "Preparing your fortune...",
    },
    fortune: {
      error: "We couldn't load your fortune. Please try again.",
    },
    card: {
      eyebrow: "Today's fortune report",
      actionLabel: "One action for today",
      keywordLabel: "Lucky keyword",
      colorLabel: "Lucky color",
      numberLabel: "Lucky number",
      timeLabel: "Lucky time",
      empty: "Open the cookie to see today's fortune.",
      defaultKeyword: "Luck",
    },
    about: {
      eyebrow: "About",
      title: "What is Fortune Brief?",
      description:
        "Fortune Brief is a fortune-cookie service that clarifies work and execution. We use free LLM capacity to summarize today's flow and deliver actionable guidance.",
      principles: [
        {
          title: "No filler sentences",
          description:
            "We don't repeat empty lines for ad revenue. We deliver dense, useful sentences that reorder your day.",
        },
        {
          title: "Action-first fortune",
          description:
            "Fortune is not flattery. It's a tool to organize today's actions with concrete guidance.",
        },
        {
          title: "Transparent data",
          description:
            "We collect only what we need and never use it beyond service purposes.",
        },
      ],
      usageTitle: "How to use it",
      usageItems: [
        "Check your fortune before the day starts and set priorities.",
        "Share the summary before a meeting to align direction quickly.",
        "Use the action line as a quick checklist before you wrap up.",
      ],
    },
    insight: {
      eyebrow: "Insights",
      title: "Insights to refine your direction",
      description:
        "Fortune Brief isn't just for fun. It helps adjust daily work and improve execution quality.",
      items: [
        {
          title: "Break work into smaller actions",
          description:
            "When you break work into actions, the next step becomes clearer. Start by picking the smallest unit you can finish today.",
        },
        {
          title: "Turn fortune into a testable promise",
          description:
            "Fortune should be a promise, not luck. Add time and conditions to the action line to make results more likely.",
        },
        {
          title: "Balance emotion and execution",
          description:
            "Emotion sets direction and execution sets speed. When one dominates, you wobble. Today, a slightly slower pace works better.",
        },
      ],
      checklistTitle: "Today's checklist",
      checklistItems: [
        "1) I wrote down the smallest action I can finish today.",
        "2) I scheduled a time to execute it.",
        "3) I left myself a quick review after finishing.",
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Leave us a message.",
      description:
        "Suggestions, partnerships, and bug reports are all welcome. Messages are reviewed internally only.",
      fields: {
        name: "Name",
        email: "Email",
        topic: "Topic",
        message: "Message",
      },
      placeholders: {
        name: "Alex Kim",
        email: "hello@fortune.com",
        topic: "Partnerships, feature ideas, bug reports",
        message: "Please describe the context and your request.",
      },
      submit: "Send message",
      submitting: "Sending...",
      successTitle: "Your message has been received. We'll reply as soon as we can.",
      submittedAt: "Submitted at",
      validation: {
        nameRequired: "Please enter your name.",
        nameMin: "Name must be at least 2 characters.",
        nameMax: "Name must be 20 characters or fewer.",
        emailRequired: "Please enter your email.",
        emailInvalid: "Please enter a valid email address.",
        topicRequired: "Please select a topic.",
        topicMin: "Topic must be at least 2 characters.",
        topicMax: "Topic must be 30 characters or fewer.",
        messageRequired: "Please enter a message.",
        messageMin: "Message must be at least 20 characters.",
        messageMax: "Message must be 500 characters or fewer.",
      },
    },
    privacy: {
      eyebrow: "Privacy Policy",
      title: "We keep data minimal.",
      description:
        "Fortune Brief collects only what is necessary to operate the service and never uses it beyond that purpose.",
      sections: [
        {
          title: "Information we collect",
          items: [
            "Name, email, and message submitted on the contact page",
            "Basic access logs for service stability",
          ],
        },
        {
          title: "Purpose of use",
          items: [
            "Responding to inquiries and improving the service",
            "Analyzing errors and improving quality",
            "Preventing abuse",
          ],
        },
        {
          title: "Analytics",
          items: [
            "We use Microsoft Clarity analytics to improve the experience.",
            "Sensitive inputs are masked by default in recordings.",
            "Analytics data is used only for UX improvement and issue analysis.",
          ],
        },
        {
          title: "Retention period",
          items: [
            "Deleted within 3 months after inquiry is resolved",
            "Retained longer if required by law",
          ],
        },
        {
          title: "User rights",
          items: [
            "Request access, correction, or deletion of personal data",
            "Request processing suspension",
          ],
        },
      ],
      closing:
        "For privacy-related requests, please use the contact page. We'll respond as quickly as possible.",
    },
    emojiAlt: {
      intactPrefix: "Fortune cookie character:",
      crackedPrefix: "Cracked fortune cookie:",
    },
  },
};

export default localeMessages;
