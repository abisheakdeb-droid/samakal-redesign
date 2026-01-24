import { useState } from 'react';
import { toast } from 'sonner';

/**
 * Hook to manage AI operations and states
 */
export function useAI() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentOperation, setCurrentOperation] = useState<string | null>(null);

  /**
   * Wrapper for AI operations to handle loading state and errors
   * @param operationName Name of the operation for UI feedback
   * @param operation Async function to execute
   */
  const generate = async <T>(
    operationName: string,
    operation: () => Promise<T>,
    onSuccess?: (result: T) => void
  ) => {
    try {
      setIsGenerating(true);
      setCurrentOperation(operationName);
      
      const result = await operation();
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error: any) {
      console.error(`AI Operation failed: ${operationName}`, error);
      toast.error(error.message || 'AI request failed');
      return null;
    } finally {
      setIsGenerating(false);
      setCurrentOperation(null);
    }
  };

  return {
    isGenerating,
    currentOperation,
    generate
  };
}
