import { Component, type ReactNode, type ErrorInfo } from "react";
import { ErrorOccurred } from "./Erorr";

interface ErrorBoundaryState {
    hasError: boolean,
}

interface Props {
    children: ReactNode,
}

class ErrorBoundary extends Component<Props, ErrorBoundaryState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
    
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('Unexpected error occurred.',
      {
        level: 'ERROR',
        customAttributes: {
          reactErrorName: error.name,
          reactErrorMessage: error.message,
          reactComponentStack: info.componentStack,
        }
      }
    )
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorOccurred />
      )
    }
    return this.props.children;
  }
}

export { ErrorBoundary }