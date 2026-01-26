import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  FluentThemeProvider, 
  Toaster,
} from "@/components/fluent";
import { DataverseProvider } from "@/lib/dataverse/pcf";
import { NavigationProvider, useNavigation, ViewState } from "@/lib/navigation";
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import PCFDocumentation from "./pages/PCFDocumentation";
import DataversePlayground from "./pages/DataversePlayground";
import Execute from "./pages/Execute";

const queryClient = new QueryClient();

const ViewRouter = () => {
  const { currentView } = useNavigation();
  
  switch (currentView) {
    case 'home':
      return <Index />;
    case 'docs':
      return <Documentation />;
    case 'docs-pcf':
      return <PCFDocumentation />;
    case 'docs-playground':
      return <DataversePlayground />;
    case 'execute':
      return <Execute />;
    default:
      return <Index />;
  }
};

const AppContent = () => (
  <>
    <Toaster toasterId="global-toaster" />
    <ViewRouter />
  </>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FluentThemeProvider>
        <DataverseProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </DataverseProvider>
      </FluentThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
