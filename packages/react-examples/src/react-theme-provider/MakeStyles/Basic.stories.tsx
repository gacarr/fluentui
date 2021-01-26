import { makeStyles, ThemeProvider } from '@fluentui/react-theme-provider';
import { WindowProvider } from '@fluentui/react-window-provider';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const useBasicStyles = makeStyles<{ primary?: boolean }>([
  [
    null,
    tokens => ({
      background: tokens.color.body.background,
      color: tokens.color.body.contentColor,
      border: `5px solid ${tokens.color.body.borderColor}`,

      padding: '5px',
    }),
  ],
  [
    s => s.primary,
    tokens => ({
      background: tokens.color.brand.background,
      color: tokens.color.brand.contentColor,
      borderColor: tokens.color.brand.borderColor,
    }),
  ],
]);

export const Container: React.FC<{ primary?: boolean }> = props => {
  const className = useBasicStyles({ primary: props.primary });

  return <div className={className}>Hello world!</div>;
};

const PortalFrame: React.FunctionComponent<{
  children: (externalDocument: Window) => React.ReactElement;
}> = ({ children }) => {
  const [frameRef, setFrameRef] = React.useState<HTMLIFrameElement | null>(null);

  return (
    <>
      <iframe
        ref={setFrameRef}
        style={{ height: 300, width: 600, border: 0, padding: 20 }}
        title="An example of nested Provider in iframe"
      />
      {frameRef &&
        ReactDOM.createPortal(
          children(frameRef.contentDocument?.defaultView as Window),
          (frameRef.contentDocument as Document).body,
        )}
    </>
  );
};

export const Basic = () => (
  <ThemeProvider>
    <Container />
    <Container primary />
  </ThemeProvider>
);

export const Frame = () => (
  <PortalFrame>
    {externalDocument => (
      <WindowProvider window={externalDocument}>
        <ThemeProvider>
          <Container />
          <Container primary />
        </ThemeProvider>
      </WindowProvider>
    )}
  </PortalFrame>
);
