import type { FortuneRequest } from "@/models/types/fortune/fortune-request";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

const fallbackMessages = {
  ko: {
    actionOptions: [
      "오늘은 30분만 집중해 핵심 업무를 끝내고, 남은 시간은 내일 준비로 마무리해 보세요.",
      "결정은 빠르게, 실행은 작게 시작하세요. 작은 성공이 리듬을 만듭니다.",
      "대화로 막힌 흐름을 푸는 날입니다. 점심 전 짧은 피드백 요청이 열쇠가 됩니다.",
      "에너지가 가장 높은 시간을 캘린더에 고정하고, 그 시간에만 중요한 일을 배치하세요.",
      "시작 전에 목표를 10분만 다시 정리하면 불필요한 수정을 줄일 수 있습니다.",
      "작은 개선을 즉시 반영하세요. 오늘의 빠른 리팩터링이 다음 주의 시간을 벌어줍니다.",
      "한 가지 지표를 정해 추적해 보세요. 숫자가 방향을 선명하게 만들어줍니다.",
      "오늘의 핵심은 '완료'입니다. 진행 중인 일을 하나라도 끝내 보세요.",
      "의견을 구할 사람을 한 명만 정하고 집중적으로 대화해 보세요.",
      "문서 한 장으로 정리해 공유하면 협업 속도가 확실히 올라갑니다.",
    ],
    cautionOptions: [
      "완벽하게 정리된 계획보다, 우선순위 한 가지만 분명히 하는 편이 효과적입니다.",
      "동시에 여러 프로젝트를 건드리면 성과가 분산됩니다. 한 가지에 집중해 주세요.",
      "피로가 결정의 질을 낮춥니다. 휴식 신호를 무시하지 마세요.",
      "반복되는 회의는 결과를 남기지 못하면 의미가 줄어듭니다. 액션 아이템을 확정하세요.",
      "속도를 내기 위해 기준을 낮추는 순간 품질 이슈가 생길 수 있습니다.",
      "새로운 시도는 좋지만, 기존 흐름을 완전히 끊지는 마세요.",
      "감정적인 피드백은 반발을 부릅니다. 사실과 관찰을 중심으로 말하세요.",
      "무리한 일정 확장은 리스크를 키웁니다. 범위를 줄이는 선택도 전략입니다.",
      "집중 시간이 깨지면 효율이 떨어집니다. 알림을 잠시 끄는 것도 좋습니다.",
      "과한 멀티태스킹은 피로를 키웁니다. 흐름을 지키는 쪽이 유리합니다.",
    ],
    keywordOptions: [
      "우선순위",
      "정리",
      "속도",
      "협업",
      "집중",
      "전환점",
      "균형",
      "명확성",
      "몰입",
      "기준",
    ],
    colorOptions: [
      "살구색",
      "버터 옐로",
      "코랄",
      "연두",
      "모카",
      "오프화이트",
      "스카이블루",
      "샌드 베이지",
      "라이트 그레이",
      "피치",
    ],
    timeOptions: ["오전 9시", "오전 11시", "오후 1시", "오후 3시", "오후 5시", "오후 7시"],
    buildTitle: (jobCategory: string): string => {
      return `${jobCategory}의 흐름이 정돈되는 날`;
    },
    buildSummary: (jobCategory: string, tone: FortuneRequest["tone"]): string => {
      return `${jobCategory} 분야에서 방향이 선명해집니다. 오늘은 ${tone} 톤으로 리듬을 맞추면 안정적으로 흘러갑니다.`;
    },
  },
  en: {
    actionOptions: [
      "Focus for 30 minutes, finish one core task, then wrap by preparing tomorrow.",
      "Decide quickly and start small. Small wins create rhythm.",
      "Unblock the flow with a short feedback request before lunch.",
      "Block your highest-energy time on the calendar and place only important work there.",
      "Spend 10 minutes clarifying the goal before you start to reduce rework.",
      "Apply a small improvement immediately. A quick refactor today saves time next week.",
      "Pick one metric to track. Numbers make direction clear.",
      "Today's key is completion. Finish at least one in-progress task.",
      "Choose one person and have a focused conversation.",
      "Share a one-page summary; collaboration will speed up.",
    ],
    cautionOptions: [
      "A clear priority beats a perfect plan.",
      "Touching multiple projects at once spreads results thin. Focus on one.",
      "Fatigue lowers decision quality. Don't ignore rest signals.",
      "Recurring meetings lose value without outcomes. Confirm action items.",
      "Lowering standards for speed can cause quality issues.",
      "New attempts are good, but don't cut off the existing flow.",
      "Emotional feedback invites pushback. Lead with facts and observations.",
      "Stretching scope increases risk. Reducing scope can be strategic.",
      "Interrupted focus hurts efficiency. Consider muting notifications.",
      "Excessive multitasking increases fatigue. Protect your flow.",
    ],
    keywordOptions: [
      "Priority",
      "Order",
      "Speed",
      "Collaboration",
      "Focus",
      "Turning point",
      "Balance",
      "Clarity",
      "Immersion",
      "Standard",
    ],
    colorOptions: [
      "Apricot",
      "Butter yellow",
      "Coral",
      "Light green",
      "Mocha",
      "Off-white",
      "Sky blue",
      "Sand beige",
      "Light gray",
      "Peach",
    ],
    timeOptions: ["9 AM", "11 AM", "1 PM", "3 PM", "5 PM", "7 PM"],
    buildTitle: (jobCategory: string): string => {
      return `A day to clarify your ${jobCategory} flow`;
    },
    buildSummary: (jobCategory: string, tone: FortuneRequest["tone"]): string => {
      return `Your ${jobCategory} direction becomes clearer. Keep a ${tone.toLowerCase()} tone and move steadily.`;
    },
  },
};

const createRandomIndex = (max: number): number => {
  return Math.floor(Math.random() * max);
};

const pickRandomItem = <T>(items: readonly T[]): T => {
  return items[createRandomIndex(items.length)];
};

export default function createFallbackFortune(
  request: FortuneRequest,
): FortuneResult {
  const messageSet = fallbackMessages[request.locale];
  const actionIndex = createRandomIndex(messageSet.actionOptions.length);
  return {
    title: messageSet.buildTitle(request.jobCategory),
    summary: messageSet.buildSummary(request.jobCategory, request.tone),
    action: messageSet.actionOptions[actionIndex],
    caution: pickRandomItem(messageSet.cautionOptions),
    luckyKeyword: pickRandomItem(messageSet.keywordOptions),
    luckyColor: pickRandomItem(messageSet.colorOptions),
    luckyNumber: 4 + actionIndex,
    luckyTime: pickRandomItem(messageSet.timeOptions),
  };
}
