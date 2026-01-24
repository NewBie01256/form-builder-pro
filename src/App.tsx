import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { 
  FluentThemeProvider, 
  useSystemDarkMode,
  Toaster,
  useToastController,
} from "@/components/fluent";
import Index from "./pages/Index";
import Documentation from "./pages/Documentation";
import Execute from "./pages/Execute";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => (
  <BrowserRouter>
    <Toaster toasterId="global-toaster" />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/docs" element={<Documentation />} />
      <Route path="/execute" element={<Execute />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

const App = () => {
  const isDarkMode = useSystemDarkMode();
  
  return (
    <QueryClientProvider client={queryClient}>
      <FluentThemeProvider dark={isDarkMode}>
        <AppContent />
      </FluentThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
