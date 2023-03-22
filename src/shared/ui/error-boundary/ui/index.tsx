import { Component, ErrorInfo, ReactNode } from "react";

import { Oops } from "@shared/ui/oops";

type ErrorState = { isError: boolean };

interface IProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<IProps> {
  state: ErrorState = {
    isError: false,
  };

  static getDerivedStateFromError(): ErrorState {
    return { isError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`Pay attention to the error. ${error}: ${errorInfo}`);
  }

  clearState = (): void => {
    this.setState({
      isError: false,
    });
  };

  render(): ReactNode {
    return this.state.isError ? (
      <Oops clearState={this.clearState} />
    ) : (
      this.props.children
    );
  }
}

export { ErrorBoundary };
