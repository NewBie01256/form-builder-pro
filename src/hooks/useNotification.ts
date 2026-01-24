/**
 * useNotification Hook
 * 
 * Wrapper around toast notifications for consistent messaging.
 */

import { useCallback } from 'react';
import { toast } from 'sonner';

export interface NotificationOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Notification service for consistent toast messaging
 */
export const useNotification = () => {
  const success = useCallback((message: string, options?: NotificationOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }, []);

  const error = useCallback((message: string, options?: NotificationOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 5000,
      action: options?.action,
    });
  }, []);

  const warning = useCallback((message: string, options?: NotificationOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }, []);

  const info = useCallback((message: string, options?: NotificationOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  }, []);

  const loading = useCallback((message: string) => {
    return toast.loading(message);
  }, []);

  const dismiss = useCallback((toastId?: string | number) => {
    toast.dismiss(toastId);
  }, []);

  const promise = useCallback(<T,>(
    promiseFn: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ): void => {
    toast.promise(promiseFn, messages);
  }, []);

  return {
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    promise,
  };
};

/**
 * Standalone notification functions (for use outside React components)
 */
export const notify = {
  success: (message: string, options?: NotificationOptions) => {
    toast.success(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  },
  error: (message: string, options?: NotificationOptions) => {
    toast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 5000,
      action: options?.action,
    });
  },
  warning: (message: string, options?: NotificationOptions) => {
    toast.warning(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  },
  info: (message: string, options?: NotificationOptions) => {
    toast.info(message, {
      description: options?.description,
      duration: options?.duration,
      action: options?.action,
    });
  },
};
