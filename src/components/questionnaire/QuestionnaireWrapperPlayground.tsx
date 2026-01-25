/**
 * QuestionnaireWrapper Playground Component
 * 
 * Interactive demo for testing the QuestionnaireWrapper class methods.
 */

import { useState, useMemo } from 'react';
import {
  makeStyles,
  tokens,
  shorthands,
  Card,
  CardHeader,
  Button,
  Badge,
  Text,
  Title3,
  Body1,
  Dropdown,
  Option,
  Textarea,
} from '@fluentui/react-components';
import {
  Play24Regular,
  Copy24Regular,
  Checkmark24Regular,
  DocumentText24Regular,
  ArrowDownload24Regular,
  Info24Regular,
} from '@fluentui/react-icons';
import { QuestionnaireWrapper } from '@/lib/QuestionnaireWrapper';
import { QuestionnaireFactory } from '@/lib/questionnaire';
import { CodeBlock } from '@/features/pcf-docs';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    ...shorthands.gap(tokens.spacingVerticalL),
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    ...shorthands.gap(tokens.spacingHorizontalL),
    flex: 1,
    minHeight: 0,
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap(tokens.spacingVerticalM),
    height: '100%',
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    overflow: 'auto',
    ...shorthands.padding(tokens.spacingVerticalM),
  },
  methodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    ...shorthands.gap(tokens.spacingHorizontalS),
    marginBottom: tokens.spacingVerticalM,
  },
  methodButton: {
    justifyContent: 'flex-start',
    textAlign: 'left',
  },
  output: {
    fontFamily: 'monospace',
    fontSize: tokens.fontSizeBase200,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.padding(tokens.spacingVerticalM),
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    overflow: 'auto',
    flex: 1,
    minHeight: '200px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.gap(tokens.spacingHorizontalM),
  },
  badges: {
    display: 'flex',
    ...shorthands.gap(tokens.spacingHorizontalS),
  },
  inputSection: {
    marginBottom: tokens.spacingVerticalM,
  },
  codePreview: {
    marginTop: tokens.spacingVerticalM,
  },
  infoBox: {
    display: 'flex',
    alignItems: 'flex-start',
    ...shorthands.gap(tokens.spacingHorizontalS),
    ...shorthands.padding(tokens.spacingVerticalS, tokens.spacingHorizontalM),
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    marginBottom: tokens.spacingVerticalM,
  },
});

type WrapperMethod = 
  | 'toJSON'
  | 'toJSONString'
  | 'getRawQuestionnaire'
  | 'getMetadata'
  | 'toBlob';

const METHODS: { id: WrapperMethod; label: string; description: string }[] = [
  { id: 'toJSON', label: 'toJSON()', description: 'Returns full export format' },
  { id: 'toJSONString', label: 'toJSONString()', description: 'Returns formatted JSON string' },
  { id: 'getRawQuestionnaire', label: 'getRawQuestionnaire()', description: 'Returns raw questionnaire object' },
  { id: 'getMetadata', label: 'getMetadata()', description: 'Returns questionnaire metadata' },
  { id: 'toBlob', label: 'toBlob()', description: 'Creates a Blob for download' },
];

const SAMPLE_QUESTIONNAIRES = [
  { 
    id: 'default', 
    name: 'Default (Empty)',
    factory: () => QuestionnaireFactory.questionnaire({
      name: 'Default Questionnaire',
      description: 'A default empty questionnaire',
    }),
  },
  { 
    id: 'simple', 
    name: 'Simple Form',
    factory: () => QuestionnaireFactory.questionnaire({
      name: 'Customer Feedback Form',
      description: 'A simple customer feedback questionnaire',
      status: 'Draft',
      version: '1.0.0',
      serviceCatalog: 'Customer Service',
      pages: [
        QuestionnaireFactory.page({
          name: 'Basic Information',
          description: 'Collect basic customer details',
          sections: [
            QuestionnaireFactory.section({
              name: 'Contact Details',
              questions: [
                QuestionnaireFactory.question({
                  text: 'What is your name?',
                  type: 'Text',
                  required: true,
                }),
                QuestionnaireFactory.question({
                  text: 'What is your email?',
                  type: 'Text',
                  required: true,
                }),
              ],
            }),
          ],
        }),
        QuestionnaireFactory.page({
          name: 'Feedback',
          description: 'Your feedback matters',
          sections: [
            QuestionnaireFactory.section({
              name: 'Rating',
              questions: [
                QuestionnaireFactory.question({
                  text: 'How would you rate our service?',
                  type: 'Rating',
                }),
                QuestionnaireFactory.question({
                  text: 'Would you recommend us?',
                  type: 'Boolean',
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  },
  { 
    id: 'complex', 
    name: 'IT Support Request',
    factory: () => QuestionnaireFactory.questionnaire({
      name: 'IT Support Request',
      description: 'IT incident and request logging form',
      status: 'Published',
      version: '2.1.0',
      serviceCatalog: 'IT Services',
      pages: [
        QuestionnaireFactory.page({
          name: 'Issue Details',
          sections: [
            QuestionnaireFactory.section({
              name: 'Problem Description',
              questions: [
                QuestionnaireFactory.question({
                  text: 'Describe your issue',
                  type: 'TextArea',
                  required: true,
                }),
                QuestionnaireFactory.question({
                  text: 'Select the category',
                  type: 'Choice',
                  answerSets: [
                    QuestionnaireFactory.answerSet({
                      name: 'Categories',
                      isDefault: true,
                      answers: [
                        QuestionnaireFactory.answer({ label: 'Hardware', value: 'hardware' }),
                        QuestionnaireFactory.answer({ label: 'Software', value: 'software' }),
                        QuestionnaireFactory.answer({ label: 'Network', value: 'network' }),
                        QuestionnaireFactory.answer({ label: 'Access', value: 'access' }),
                      ],
                    }),
                  ],
                }),
                QuestionnaireFactory.question({
                  text: 'Priority',
                  type: 'Choice',
                  answerSets: [
                    QuestionnaireFactory.answerSet({
                      name: 'Priority Levels',
                      isDefault: true,
                      answers: [
                        QuestionnaireFactory.answer({ label: 'Low', value: '4' }),
                        QuestionnaireFactory.answer({ label: 'Medium', value: '3' }),
                        QuestionnaireFactory.answer({ label: 'High', value: '2' }),
                        QuestionnaireFactory.answer({ label: 'Critical', value: '1' }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  },
];

export function QuestionnaireWrapperPlayground() {
  const styles = useStyles();
  const [selectedMethod, setSelectedMethod] = useState<WrapperMethod>('toJSON');
  const [selectedSample, setSelectedSample] = useState('simple');
  const [output, setOutput] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const questionnaire = useMemo(() => {
    const sample = SAMPLE_QUESTIONNAIRES.find(s => s.id === selectedSample);
    return sample?.factory() ?? SAMPLE_QUESTIONNAIRES[0].factory();
  }, [selectedSample]);

  const wrapper = useMemo(() => {
    return new QuestionnaireWrapper(questionnaire);
  }, [questionnaire]);

  const executeMethod = () => {
    let result: unknown;
    
    switch (selectedMethod) {
      case 'toJSON':
        result = wrapper.toJSON();
        break;
      case 'toJSONString':
        result = wrapper.toJSONString();
        break;
      case 'getRawQuestionnaire':
        result = wrapper.getRawQuestionnaire();
        break;
      case 'getMetadata':
        result = wrapper.getMetadata();
        break;
      case 'toBlob':
        const blob = wrapper.toBlob();
        result = {
          type: blob.type,
          size: `${blob.size} bytes`,
          preview: 'Blob created successfully! Click "Download Blob" to save.',
        };
        break;
    }

    if (typeof result === 'string') {
      setOutput(result);
    } else {
      setOutput(JSON.stringify(result, null, 2));
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadBlob = () => {
    const blob = wrapper.toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${questionnaire.name || 'questionnaire'}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const codePreview = useMemo(() => {
    const lines = [
      `import { QuestionnaireWrapper } from '@/lib/QuestionnaireWrapper';`,
      ``,
      `// Create wrapper from questionnaire`,
      `const wrapper = new QuestionnaireWrapper(questionnaire);`,
      ``,
    ];

    switch (selectedMethod) {
      case 'toJSON':
        lines.push(`// Get full export format (ExportedQuestionnaire)`);
        lines.push(`const exportData = wrapper.toJSON();`);
        lines.push(`console.log(exportData.version);       // "1.0"`);
        lines.push(`console.log(exportData.exportedAt);    // ISO timestamp`);
        lines.push(`console.log(exportData.questionnaire); // Full questionnaire`);
        break;
      case 'toJSONString':
        lines.push(`// Get formatted JSON string`);
        lines.push(`const jsonString = wrapper.toJSONString();`);
        lines.push(`const compactJson = wrapper.toJSONString(0); // No indentation`);
        break;
      case 'getRawQuestionnaire':
        lines.push(`// Get raw questionnaire object`);
        lines.push(`const raw = wrapper.getRawQuestionnaire();`);
        lines.push(`console.log(raw.name);`);
        lines.push(`console.log(raw.pages.length);`);
        break;
      case 'getMetadata':
        lines.push(`// Get questionnaire metadata`);
        lines.push(`const metadata = wrapper.getMetadata();`);
        lines.push(`console.log(metadata.name);`);
        lines.push(`console.log(metadata.version);`);
        lines.push(`console.log(metadata.status);`);
        break;
      case 'toBlob':
        lines.push(`// Create Blob for download or API transmission`);
        lines.push(`const blob = wrapper.toBlob();`);
        lines.push(``);
        lines.push(`// Download as file`);
        lines.push(`const url = URL.createObjectURL(blob);`);
        lines.push(`const link = document.createElement('a');`);
        lines.push(`link.href = url;`);
        lines.push(`link.download = 'questionnaire.json';`);
        lines.push(`link.click();`);
        break;
    }

    return lines.join('\n');
  }, [selectedMethod]);

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <Info24Regular />
        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalS }}>
          <Text>
            The <strong>QuestionnaireWrapper</strong> class provides programmatic access to questionnaire data 
            in the standard export format. Select a sample questionnaire and method to test.
          </Text>
          <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
            <strong>Questionnaire Parameter Structure:</strong> The constructor accepts a <code>Questionnaire</code> object 
            containing <code>name</code>, <code>description</code>, <code>status</code>, <code>version</code>, <code>serviceCatalog</code>, 
            and <code>pages[]</code>. Each <code>Page</code> contains <code>Section[]</code>, 
            which holds <code>Question[]</code> and <code>ConditionalBranch[]</code>. Questions include <code>AnswerSet[]</code>, 
            <code>conditionGroup</code>, and optional <code>actionRecord</code> for ITSM integration.
          </Text>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Left Panel - Configuration */}
        <div className={styles.panel}>
          <Card className={styles.card}>
            <CardHeader
              header={<Title3>Configuration</Title3>}
              description="Select a sample questionnaire and method to execute"
            />
            <div className={styles.cardContent}>
              <div className={styles.inputSection}>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                  Sample Questionnaire
                </Text>
                <Dropdown
                  value={SAMPLE_QUESTIONNAIRES.find(s => s.id === selectedSample)?.name}
                  onOptionSelect={(_, data) => {
                    if (data.optionValue) {
                      setSelectedSample(data.optionValue);
                      setOutput('');
                    }
                  }}
                  style={{ width: '100%' }}
                >
                  {SAMPLE_QUESTIONNAIRES.map(sample => (
                    <Option key={sample.id} value={sample.id}>
                      {sample.name}
                    </Option>
                  ))}
                </Dropdown>
              </div>

              <div className={styles.inputSection}>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                  Wrapper Methods
                </Text>
                <div className={styles.methodGrid}>
                  {METHODS.map(method => (
                    <Button
                      key={method.id}
                      appearance={selectedMethod === method.id ? 'primary' : 'secondary'}
                      className={styles.methodButton}
                      onClick={() => {
                        setSelectedMethod(method.id);
                        setOutput('');
                      }}
                      icon={<DocumentText24Regular />}
                    >
                      {method.label}
                    </Button>
                  ))}
                </div>
                <Text size={200} style={{ color: tokens.colorNeutralForeground3 }}>
                  {METHODS.find(m => m.id === selectedMethod)?.description}
                </Text>
              </div>

              <div className={styles.codePreview}>
                <Text weight="semibold" block style={{ marginBottom: tokens.spacingVerticalS }}>
                  Code Example
                </Text>
                <CodeBlock code={codePreview} language="typescript" />
              </div>
            </div>
          </Card>
        </div>

        {/* Right Panel - Output */}
        <div className={styles.panel}>
          <Card className={styles.card}>
            <CardHeader
              header={
                <div className={styles.header}>
                  <Title3>Output</Title3>
                  <div className={styles.badges}>
                    <Badge appearance="outline" color="informative">
                      {selectedMethod}
                    </Badge>
                  </div>
                </div>
              }
              action={
                <div style={{ display: 'flex', gap: tokens.spacingHorizontalS }}>
                  <Button
                    appearance="primary"
                    icon={<Play24Regular />}
                    onClick={executeMethod}
                  >
                    Execute
                  </Button>
                  {selectedMethod === 'toBlob' && output && (
                    <Button
                      appearance="secondary"
                      icon={<ArrowDownload24Regular />}
                      onClick={handleDownloadBlob}
                    >
                      Download Blob
                    </Button>
                  )}
                  {output && (
                    <Button
                      appearance="subtle"
                      icon={copied ? <Checkmark24Regular /> : <Copy24Regular />}
                      onClick={handleCopy}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </Button>
                  )}
                </div>
              }
            />
            <div className={styles.cardContent}>
              {output ? (
                <pre className={styles.output}>{output}</pre>
              ) : (
                <div 
                  className={styles.output} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: tokens.colorNeutralForeground3,
                  }}
                >
                  Click "Execute" to see the output
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default QuestionnaireWrapperPlayground;
