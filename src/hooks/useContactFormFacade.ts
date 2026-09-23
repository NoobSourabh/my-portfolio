import { useCallback, useMemo, useState } from 'react';

type ContactFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  message: string;
};

type ContactFormStatus = 'idle' | 'submitted';

export function useContactFormFacade() {
  const [values, setValues] = useState<ContactFormValues>({
    firstName: '',
    lastName: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState<ContactFormStatus>('idle');

  const setField = useCallback(<K extends keyof ContactFormValues>(key: K, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => {
    setValues({ firstName: '', lastName: '', company: '', message: '' });
    setStatus('idle');
  }, []);

  const submit = useCallback(() => {
    // Placeholder for a real API call.
    setStatus('submitted');
  }, []);

  return useMemo(
    () => ({
      values,
      status,
      setField,
      submit,
      reset,
    }),
    [reset, setField, status, submit, values],
  );
}

