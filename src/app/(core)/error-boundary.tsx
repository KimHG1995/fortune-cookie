"use client";

import React from "react";

type ErrorBoundaryProps = {
  readonly children: React.ReactNode;
};

type ErrorBoundaryState = {
  readonly hasError: boolean;
  readonly message: string;
};

/**
 * 전역 UI 오류를 포착하고 사용자에게 안내하는 에러 바운더리입니다.
 */
export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * 에러 상태를 초기화합니다.
   */
  public constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  /**
   * 렌더링 중 발생한 오류를 상태로 반영합니다.
   */
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, message: error.message };
  }

  /**
   * 오류 정보를 로깅합니다.
   */
  public componentDidCatch(error: Error): void {
    console.error("[에러 바운더리]", error);
  }

  /**
   * 오류 UI 또는 정상 UI를 렌더링합니다.
   */
  public render(): React.ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg font-semibold text-ink">문제가 발생했어요.</p>
        <p className="max-w-md text-sm text-muted">
          화면을 새로고침해 보시고, 문제가 지속되면 문의 페이지로 알려 주세요.
        </p>
        <p className="text-xs text-muted">{this.state.message}</p>
      </div>
    );
  }
}
