"use client";

import { Component, type ReactNode } from "react";
import { client } from "@/config/client";

interface Props {
  children: ReactNode;
  onFallback?: () => void;
}

interface State {
  hasError: boolean;
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onFallback?.();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            background: `url(${client.cinematic?.heroStillImage || "/images/hero-still.jpg"}) center/cover no-repeat`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
