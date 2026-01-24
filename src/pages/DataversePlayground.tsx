/**
 * Dataverse Operations Playground Page
 * 
 * Interactive testing environment for all Dataverse wrapper operations.
 * Works in real-time when deployed to Dataverse, uses mock data in development.
 */

import { 
  makeStyles, 
  tokens, 
  Text,
  Button,
  Link,
} from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { ArrowLeft24Regular } from "@fluentui/react-icons";
import { DataverseOperationsPlayground } from "@/components/dataverse";

const useStyles = makeStyles({
  page: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  content: {
    flex: 1,
    padding: tokens.spacingHorizontalL,
    display: "flex",
    flexDirection: "column",
  },
});

export default function DataversePlaygroundPage() {
  const styles = useStyles();
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Button
          appearance="subtle"
          icon={<ArrowLeft24Regular />}
          onClick={() => navigate('/docs/pcf')}
        >
          Back to PCF Docs
        </Button>
        <Text size={400} weight="semibold">
          Dataverse Operations Playground
        </Text>
      </div>
      <div className={styles.content}>
        <DataverseOperationsPlayground />
      </div>
    </div>
  );
}
