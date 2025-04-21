import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="error-boundary p-4 bg-red-50 text-red-700 rounded-md m-4">
                    <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                    <p className="mb-4">There was an error rendering this component.</p>
                    <details className="bg-red-100 p-2 rounded-md">
                        <summary className="cursor-pointer">Error details</summary>
                        <pre className="mt-2 whitespace-pre-wrap text-sm">
                            {this.state.error?.toString()}
                        </pre>
                    </details>
                    <button
                        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 