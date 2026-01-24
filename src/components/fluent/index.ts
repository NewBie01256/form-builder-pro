/**
 * Fluent UI Component Exports
 * 
 * Re-exports Fluent UI components with any customizations applied.
 * This serves as the central import point for Fluent components.
 */

// Provider
export { FluentThemeProvider, useSystemDarkMode, customLightTheme, customDarkTheme } from './FluentThemeProvider';

// Re-export commonly used Fluent components
export {
  // Buttons
  Button,
  CompoundButton,
  ToggleButton,
  SplitButton,
  MenuButton,
  
  // Inputs
  Input,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
  Switch,
  Slider,
  SpinButton,
  
  // Selection
  Dropdown,
  Option,
  Combobox,
  Listbox,
  
  // Layout
  Card,
  CardHeader,
  CardFooter,
  CardPreview,
  Divider,
  
  // Feedback
  Badge,
  CounterBadge,
  PresenceBadge,
  Spinner,
  ProgressBar,
  Toast,
  Toaster,
  useToastController,
  
  // Overlay
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Tooltip,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  MenuDivider,
  MenuGroup,
  MenuGroupHeader,
  
  // Data Display
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TableCellLayout,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  Avatar,
  AvatarGroup,
  Tag,
  TagGroup,
  InteractionTag,
  
  // Navigation
  TabList,
  Tab,
  Link,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  
  // Typography
  Title1,
  Title2,
  Title3,
  Subtitle1,
  Subtitle2,
  Body1,
  Body2,
  Caption1,
  Caption2,
  LargeTitle,
  Display,
  
  // Form
  Field,
  Label,
  InfoLabel,
  
  // Utility
  Skeleton,
  SkeletonItem,
  Text,
  Image,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  Tree,
  TreeItem,
  TreeItemLayout,
  
} from '@fluentui/react-components';

// Re-export types
export type {
  ButtonProps,
  InputProps,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  DropdownProps,
  ComboboxProps,
  DialogProps,
  PopoverProps,
  TooltipProps,
  MenuProps,
  TableProps,
  TabListProps,
  FieldProps,
} from '@fluentui/react-components';
