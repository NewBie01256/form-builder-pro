import * as React from 'react';
import {
  Spinner,
  makeStyles,
  tokens,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  inline: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: tokens.spacingVerticalXXL,
  },
});

interface PageLoaderProps {
  label?: string;
  inline?: boolean;
}

/**
 * Full-page or inline loading spinner using Fluent UI
 */
export const PageLoader: React.FC<PageLoaderProps> = ({ 
  label = "Loading...", 
  inline = false 
}) => {
  const styles = useStyles();

  return (
    <div className={inline ? styles.inline : styles.container}>
      <Spinner size="large" label={label} />
    </div>
  );
};

export default PageLoader;
