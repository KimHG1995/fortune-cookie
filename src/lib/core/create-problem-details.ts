import type { ProblemDetails } from "@/models/types/problem-details";

const createProblemDetails = (input: {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}): ProblemDetails => {
  return {
    type: input.type,
    title: input.title,
    status: input.status,
    detail: input.detail,
    instance: input.instance,
  };
};

export default createProblemDetails;
