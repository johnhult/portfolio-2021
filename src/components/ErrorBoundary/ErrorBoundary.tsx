import { Card, Container, Heading, Link, Paragraph } from "theme-ui";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export interface ErrorBoundaryProps {
  invisibleOnCrash?: boolean;
  onComponentDidCatch?: (
    error: Error | null,
    errorInfo: React.ErrorInfo
  ) => void;
}

export interface ErrorBoundaryState {
  error?: Error;
  // eventId: string;
}

/**
 * ErrorBoundary: safeguard your application from unexpected errors
 * @see https://reactjs.org/docs/error-boundaries.html
 *
 * This React feature integrates nicely with error-reporting tools such as sentry.io.
 * If you wish to set something up, this is the place!
 * Example with sentry.io: https://docs.sentry.io/platforms/javascript/react/
 */
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public static defaultProps: ErrorBoundaryProps = {
    invisibleOnCrash: false,
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      error: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return {
      error,
    };
  }

  // Enable this if you use an error reporting tool such as Sentry
  componentDidCatch(error: Error | null, errorInfo: React.ErrorInfo) {
    /* eslint-disable-next-line no-console */
    console.error("Error catched by ErrorBoundary", error, errorInfo);
    const { onComponentDidCatch } = this.props;

    if (typeof onComponentDidCatch === "function") {
      onComponentDidCatch(error, errorInfo);
    }

    // Example with Sentry
    // Sentry.withScope(scope => {
    //   scope.setExtras(errorInfo);
    //   const eventId = Sentry.captureException(error);
    //   this.setState({
    //     eventId
    //   });
    // });
  }

  render() {
    const { children, invisibleOnCrash } = this.props;
    const { error } = this.state;

    if (error) {
      console.error(error);

      if (invisibleOnCrash) {
        return null;
      }

      return (
        <Container>
          <Card>
            <Heading as="h2">Oops...</Heading>
            <Paragraph sx={{ my: "s", color: "systemWarning" }}>
              An internal error has occured. We are deeply sorry about that.
            </Paragraph>
            {/*
            <Alert variant="accent" size="medium">
              <button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report error</button>
            </Alert>
            */}
            <Link as={(props) => <RouterLink {...props} to="/" />}>
              Back to home page
            </Link>
          </Card>
        </Container>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
