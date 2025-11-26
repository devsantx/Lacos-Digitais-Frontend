import { useCallback, useState } from "react";

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback(
    (field, value) => {
      setValues((prevValues) => {
        return {
          ...prevValues,
          [field]: value,
        };
      });

      if (errors[field]) {
        setErrors((prevErrors) => {
          return {
            ...prevErrors,
            [field]: null,
          };
        });
      }
    },
    [errors]
  );

  const setFieldError = useCallback((field, error) => {
    setErrors((prevErrors) => {
      return {
        ...prevErrors,
        [field]: error,
      };
    });
  }, []);

  const setFormErrors = useCallback((newErrors) => {
    setErrors(newErrors);
  }, []);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  const handleSubmit = useCallback(
    async (callback) => {
      setLoading(true);
      try {
        if (onSubmit) {
          await onSubmit(values, { setFieldError, setFormErrors });
        }
        if (callback) {
          callback();
        }
      } catch (error) {
        console.error("Erro ao submeter formulário:", error);
      } finally {
        setLoading(false);
      }
    },
    [values, onSubmit]
  );

  return {
    values,
    errors,
    loading,
    handleChange,
    setFieldError,
    setFormErrors,
    resetForm,
    handleSubmit,
  };
};
